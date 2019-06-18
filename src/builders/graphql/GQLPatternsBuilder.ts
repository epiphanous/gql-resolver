import { Parser } from 'antlr4ts';
import { Option } from 'funfix';
import { List, Map, Set } from 'immutable';
import * as QMP from '../../antlr4/generated/QueryModificationParser';
import {
  FeatureContext,
  IriRefContext,
  LatLonContext,
  NumericLiteralContext,
  PatternContext,
  TextMatchParamContext,
  VarFeatureContext,
  VarRefContext,
} from '../../antlr4/generated/QueryModificationParser';
import {
  DEFAULT_GEO_BINDING,
  INTERNAL_RDFS_LABEL_BINDING,
} from '../../models/Constants';
import { GQLFieldBooster } from '../../models/GQLBooster';
import { GQLObjectQueryModifierBasicExpression } from '../../models/GQLObjectQueryModifierExpression';
import * as GQLP from '../../models/GQLPattern';
import { GQLVariableDefinition } from '../../models/GQLVariableDefinition';
import { GQLObjectQueryModifierBuilder } from './GQLObjectQueryModifierBuilder';

export class GQLPatternsBuilder extends GQLObjectQueryModifierBuilder {
  public validFields!: Map<string, string>;
  public validVariables!: Set<GQLVariableDefinition>;
  public vars!: Map<string, string>;
  public prefixes!: Set<string>;
  public source!: string;
  public referencedFields!: Set<string>;
  public result!: List<GQLP.GQLPattern | undefined>;

  constructor(
    validFields: Map<string, string>,
    validVariables: Set<GQLVariableDefinition>,
    vars: Map<string, any>,
    prefixes: Set<string>,
    source: string = 'filter'
  ) {
    super(validFields, validVariables, vars, prefixes, source);
  }

  public parse(parse: Parser): any {
    return ((parse as unknown) as QMP.QueryModificationParser).patterns();
  }

  public exitPatterns(context: QMP.PatternsContext): void {
    this.result = this.processPatterns(context);
  }

  public processPatterns(context: QMP.PatternsContext) {
    return List(context.pattern()).map((a: PatternContext) =>
      this.processPattern(a)
    );
  }

  // public processRaceCountPattern Guessing we don't need this one..

  public processPattern(context: QMP.PatternContext) {
    if (context instanceof QMP.TextMatchPatternContext) {
      return this.processTextMatchPattern(context);
    }
    if (context instanceof QMP.GeoNearbyPatternContext) {
      return this.processGeoNearbyPattern(context);
    }
    // two other race-based patterns
  }

  public processTextMatchPattern(context: QMP.TextMatchPatternContext) {
    const isGeo = Option.of(context.GEOMATCH()).nonEmpty();
    let field;
    if (Option.of(context.fieldRef()).nonEmpty()) {
      field = this.processFieldRef(
        Option.of(context.fieldRef()).value!
      ).expression.substring(1);
    } else {
      if (isGeo) {
        field = DEFAULT_GEO_BINDING;
      } else {
        field = INTERNAL_RDFS_LABEL_BINDING;
      }
    }
    const text: string = this.processStringLiteralOrVarRef(
      context.stringLiteralOrVarRef()
    );
    this.check(!!text, `text match text is empty for ${field}`, context);
    const params = Map<string, any>(
      List(context.textMatchParam()).map(
        (a: QMP.TextMatchParamContext) => this.processTextMatchParam(a)!
      )
    );
    const booster = new GQLFieldBooster(params.get('boost', '1'), field);
    const minScore = params.get('minScore').map((a: number) => a.toFixed(2));
    this.check(
      minScore.get('1.00') > 0,
      `text match param 'minScore' is non-positive for ${field}`,
      context
    );
    const maxHits = params.get('maxHits').map((a: string) => parseInt(a, 10));
    this.check(
      maxHits.get(1) > 0,
      `text match param 'maxHits' is non-positive for ${field}`,
      context
    );
    return new GQLP.GQLTextMatchPattern(
      field,
      text,
      booster,
      isGeo,
      minScore,
      maxHits
    );
  }

  public asDouble(n: any) {
    switch (typeof n) {
      case 'string':
      case 'number':
        return Number(n).toFixed(2);
      default:
        throw new Error(`Unable to handle ${n}, class: ${n.constructor.name}`);
    }
  }

  public processGeoNearbyPattern(context: QMP.GeoNearbyPatternContext) {
    let field;
    if (Option.of(context.fieldRef()).nonEmpty()) {
      field = this.processFieldRef(context.fieldRef()!).expression.substring(1);
    } else {
      field = DEFAULT_GEO_BINDING;
    }
    const proximityCtx = context.proximitySpec().numericLiteralOrVarRef();
    const proximityOptions: [
      Option<NumericLiteralContext>,
      Option<VarRefContext>
    ] = [
      Option.of(proximityCtx.numericLiteral()),
      Option.of(proximityCtx.varRef()),
    ];
    let distance: number;
    if (proximityOptions[0].isEmpty() && proximityOptions[1].nonEmpty()) {
      const v = this.processVarRef(proximityOptions[1].value);
      distance = v.underlyingValue
        .map(a => Number(this.asDouble(a)))
        .getOrElse(1.0);
    } else if (
      proximityOptions[0].nonEmpty() &&
      proximityOptions[1].isEmpty()
    ) {
      const n = this.processNumericLiteral(proximityOptions[0].value);
      distance = Number(Number(n.expression).toFixed(1));
    } else {
      distance = 1.0;
    }
    this.check(
      distance > 0,
      `geo param distance is non-positive for ${field}`,
      context
    );

    const unitsCtx = context.proximitySpec().iriRefOrVarRef();
    const unitsOptions: [Option<IriRefContext>, Option<VarRefContext>] = [
      Option.of(unitsCtx.iriRef()),
      Option.of(unitsCtx.varRef()),
    ];
    let units;
    if (
      Option.of(unitsOptions[0]).isEmpty() &&
      Option.of(unitsOptions[1]).nonEmpty()
    ) {
      units = this.processVarRef(unitsOptions[1].value!)
        .underlyingValue.map((a: string) => a as string)
        .getOrElse('unit:MileUSStatute');
    } else if (
      Option.of(unitsOptions[1]).isEmpty() &&
      Option.of(unitsOptions[0]).nonEmpty()
    ) {
      units = this.processIriRef(unitsOptions[0].value!).expression;
    } else {
      console.warn('unhandled proximity options');
      units = 'unit:MileUSStatute';
    }
    console.warn('Got units', units);

    if (context.featureOrLatLon() instanceof QMP.VarFeatureContext) {
      return new GQLP.GQLGeoNearFeaturePattern(
        field,
        this.processVarRef(
          (context.featureOrLatLon() as VarFeatureContext).varRef()
        ).expression,
        units,
        distance
      );
    } else if (context.featureOrLatLon() instanceof QMP.FeatureContext) {
      return new GQLP.GQLGeoNearFeaturePattern(
        field,
        this.processFeature(context.featureOrLatLon() as FeatureContext),
        units,
        distance
      );
    } else if (context.featureOrLatLon() instanceof QMP.LatLonContext) {
      const lat = this.processLatLonCoordinate(
        context.featureOrLatLon() as LatLonContext,
        0
      );
      const lon = this.processLatLonCoordinate(
        context.featureOrLatLon() as LatLonContext,
        1
      );
      return new GQLP.GQLGeoNearLatLonPattern(
        field,
        lat.expression,
        lon.expression,
        units,
        distance
      );
    }
  }

  public processLatLonCoordinate(latlon: QMP.LatLonContext, coord: number) {
    if (
      Option.of(latlon.varRef(coord)).nonEmpty() &&
      Option.of(latlon.numericLiteral(coord)).isEmpty()
    ) {
      return this.processVarRef(Option.of(latlon.varRef(coord)).value!);
    } else if (
      Option.of(latlon.varRef(coord)).isEmpty() &&
      Option.of(latlon.numericLiteral(coord)).nonEmpty()
    ) {
      return this.processNumericLiteral(
        Option.of(latlon.numericLiteral(coord)).value!
      );
    } else {
      return new GQLObjectQueryModifierBasicExpression('error', 'error');
    }
  }

  public processFeature(context: QMP.FeatureContext) {
    const expr = this.processIriRef(context.iriRef()).expression;
    return expr.replace('^["\']|[",\']$', '');
  }

  public processTextMatchParam(context: QMP.TextMatchParamContext) {
    if (context instanceof QMP.TextMatchBoostParamContext) {
      return this.processTextMatchBoostParam(context);
    } else if (context instanceof QMP.TextMatchMaxHitsParamContext) {
      return this.processTextMatchMaxHitsParam(context);
    } else if (context instanceof QMP.TextMatchMinScoreParamContext) {
      return this.processTextMatchMinScoreParam(context);
    }
  }

  public processTextMatchBoostParam(
    context: QMP.TextMatchBoostParamContext
  ): [string, any] {
    return [
      'boost',
      this.processNumericLiteral(context.numericLiteral()).expression,
    ];
  }

  public processTextMatchMaxHitsParam(
    context: QMP.TextMatchMaxHitsParamContext
  ): [string, any] {
    return ['maxHits', context.INTEGER()];
  }

  public processTextMatchMinScoreParam(
    context: QMP.TextMatchMinScoreParamContext
  ): [string, any] {
    return ['minScore', context.DECIMAL()];
  }
}
