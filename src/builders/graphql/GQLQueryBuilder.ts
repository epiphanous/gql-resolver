import {Try} from 'funfix';
import {Map, Set} from 'immutable';
import {GraphQLParser} from '../../antlr4/generated/GraphQLParser';
import {GQLField} from '../../models/GQLField';
import {GQLFragmentDefinition} from '../../models/GQLFragmentDefinition';
import {GQLOperation} from '../../models/GQLOperation';
import {GQLQueryDocument} from '../../models/GQLQueryDocument';
import {GQLSelection} from '../../models/GQLSelection';
import {GQLVariableDefinition} from '../../models/GQLVariableDefinition';
import ResolverContext from '../../models/ResolverContext';
import GQLDocumentBuilder from './GQLDocumentBuilder';

const ARG_TYPES = {
  ARG_BINDINGS: 'bindings',
  ARG_BOOSTERS: 'boosters',
  ARG_FILTER: 'filter',
  ARG_INCLUDE_DEPRECATED: 'includeDeprecated',
  ARG_LIMIT: 'limit',
  ARG_NAME: 'name',
  ARG_OFFSET: 'offset',
  ARG_ORDER: 'order',
  ARG_PATTERNS: 'patterns',
  ARG_TRANSFORMS: 'transforms',
};

export default class GQLQueryBuilder extends GQLDocumentBuilder<GQLQueryDocument> {
  public context: ResolverContext;
  public vars: Map<string, any>;
  public operations: Set<GQLOperation>;
  public fragmentDefinitions: Set<GQLFragmentDefinition>;
  public variables: Set<GQLVariableDefinition>;

  constructor(context: ResolverContext, vars: Map<string, any>) {
    super();
    this.context = context;
    this.vars = vars;
  }

  public build(parser: GraphQLParser): Try<GQLQueryDocument> {
    try {
      super.build(parser);
      this.resolveDefaults(vars);
      if (this.errorCount > 0) {
          throw this.errorReport;
      } else {
        if (this.warningCount > 0) {
          this.errors.forEach((w) => console.warn(w));
        }
        return Try.success(new GQLQueryDocument([this.operations.values()].map((op) => this.withExecutionPlan(op))));
      }
    } catch (error) {
      return Try.failure(error);
    }
  }

  public withExecutionPlan(operation: GQLOperation): GQLOperation {
    console.debug(`withExecutionPlan: operation = ${operation}`);
    const fop = this.withFlattenedSelections(operation);
    return fop.operationType == 'query' ?
      fop.copy(
        executionPlan =
          getRootExecutionPlan(fop.name, fop.fields, fop.selections))
      : fop;

  }

  public withFlattenedSelections(operation: GQLOperation) {
    operation.copy(fields = flattenSelections(schema.operationTypes(operation.operationType), operation.selections));
  }

  public flattenSelections(parentType: String, selections: GQLSelection[]): Array<[string, GQLField]> {
    return selections.flatMap((s) => flattenSelection(parentType, s));
  }

  public flattenSelection(parentType: String, selection: GQLSelection): Array<[string, GQLField]> {
    selection; match; {
      case field: (GQLField) => schema.getFieldType(field.name); match; {
        case Some(t); => {
          logger.debug(s'flattenSelection ${field.name}');
          List(parentType - > field.copy(fields = flattenSelections(t, field.selections)));
        }
        public case(None) => {
          throwIt(new Exception(s'unable to getFieldType(${field.name})!'));
        }
      }
      case frag: (GQLInlineFragment) => flattenSelections(frag.typeCondition, frag.selections);
      case spread: (GQLFragmentSpread) => fragmentDefinitions.find((d) => d.name.equals(spread.name)); match; {
        case Some(frag); => flattenSelections(frag.typeCondition, frag.selections);
        case (None) => throwIt(new Exception(s'bad fragment spread ${spread.name }'));
      }
    }
  }

throwIt(t: Throwable); {
    logger.error(t.getMessage);
    throw t;
  }

resolveDefaults(vars: mutable.Map[String, Any]); {
    variables.foreach((vd) => {
      val; isRequired = vd.gqlType.isRequired
      (vd.defaultValue, vars.get(vd.name)); match; {
        case (Some(Left(value)), None); => vars.update(vd.name, value.value);
        case (None, None); if (isRequired) { =>
          val;
                          } msg = s; 'missing required value for variable ${vd.name}';
             addIssue(0, 0, msg, new BuildException(msg));
        case (_) => ; // nothing
      }
    });
    vars.toMap;
  }

processArgs(args: List[GQLArgument], allFields: Map[String, String]); : GQLQueryArguments; {
    logger.debug(s'processing ${args}');
    args.foldLeft(GQLQueryArguments()); { case (qa, arg) =>
      arg;                                     match; {
        case GQLAnyArgument(name, Right(GQLVariable(variable))); =>
             qa.copy(
            any = Some(GQLAny(name, vars.get(variable))),
          );
        case GQLAnyArgument(name, _); =>
          // TODO:  Need to handle this case where its a Right but not a GQLVariable.
             qa.copy(
            any = Some(GQLAny(name, None)),
          );
        case filter: (GQLFilterArgument) => qa.copy(
          filter = Some(processFilter(filter.resolve(vars), allFields)),
        );
        case patterns: (GQLPatternsArgument) => qa.copy(
          patterns = processPatterns(patterns.resolve(vars), allFields),
        );
        case boosters: (GQLBoostersArgument) => qa.copy(
          boosters = processBoosters(boosters.resolve(vars), allFields),
        );
        case bindings: (GQLBindingsArgument) => qa.copy(
          bindings = processBindings(bindings.resolve(vars), allFields),
        );
        case order: (GQLOrderArgument) => qa.copy(
          order = processOrder(order.resolve(vars), allFields),
        );
        case transform: (GQLTransformsArgument) => qa.copy(
          transforms = processTransforms(transform.resolve(vars)),
        );
        case limit: (GQLLimitArgument) =>
          if (qa.offset.isDefined) {
            // just update the limit
            qa.copy(limit = Some(limit.resolve(vars).toInt));
          } else {
            // set the limit and a default offset of 0
            qa.copy(limit = Some(limit.resolve(vars).toInt), offset = Some(0L));
          }
        case offset: (GQLOffsetArgument) => qa.copy(
          offset = Some(offset.resolve(vars).toLong),
        );
        // for introspection queries
        case includeDeprecated: (GQLIncludeDeprecatedArgument) => qa.copy(
          includeDeprecated = Some(includeDeprecated.resolve(vars).toBoolean),
        );
        // for introspection queries
        case name: (GQLNameArgument) => qa.copy(
          name = Some(name.resolve(vars)),
        );
        case error: (GQLInvalidArgument) => qa;
      };
    }
  }

    processFilter(filterExpr: String, validFields: Map[String, String]); {
    GQLBuilder.parse[GQLFilter](new GQLFilterBuilder(validFields, variables, vars, prefixes), filterExpr); match; {
      case Success(filter); => filter;
      case Failure(ex); => throw ex;
    }
  }

    processPatterns(patternsExpr: String, validFields: Map[String, String]); {
    GQLBuilder.parse[List[GQLPattern]](new GQLPatternsBuilder(validFields, variables, vars, prefixes), patternsExpr); match; {
      case Success(result); => result;
      case Failure(ex); => throw ex;
    }
  }

    processBindings(bindingsExpr: String, validFields: Map[String, String]); {
    GQLBuilder.parse[List[GQLBinding]](new GQLBindingsBuilder(validFields, variables, vars, prefixes), bindingsExpr); match; {
      case Success(result); => result;
      case Failure(ex); => throw ex;
    }
  }

    processBoosters(boostersExpr: String, validFields: Map[String, String]); {
    GQLBuilder.parse[List[GQLBooster]](new GQLBoostersBuilder(validFields, variables, vars, prefixes), boostersExpr); match; {
      case Success(result); => result;
      case Failure(ex); => throw ex;
    }
  }

    processOrder(orderExpr: String, validFields: Map[String, String]); {
    GQLBuilder.parse[List[GQLOrderBy]](new GQLOrderByBuilder(validFields, variables, vars, prefixes), orderExpr); match; {
      case Success(result); => result;
      case Failure(ex); => throw ex;
    }
  }

    processTransforms(transformsExpr: String); {
    GQLBuilder.parse[List[GQLTransform]](new GQLTransformsBuilder(prefixes), transformsExpr); match; {
      case Success(result); => result;
      case Failure(ex); => throw ex;
    }
  }

    getSearchSubPlans(name: String, selections: List[GQLSelection], objects: List[(String, GQLField)]); : List[GQLSearchExecutionPlan]; {
    logger.debug(s'subPlans name = ${name} objects = ${objects}');
    val; plans: List[GQLSearchExecutionPlan] =
      objects.flatMap((tf) => {
        val (t, f) = tf;
        logger.debug(s'creating subplan ${f.name} from fields ${f.fields}');
        getQueryExecutionPlan(t, f.name, f.alias.getOrElse(f.name), f.fields, selections, f.arguments);
      });

    logger.debug(s'subplans for ${name} = ${plans}');
    plans;
  }

    getRootExecutionPlan(name: String, fields: List[(String, GQLField)], selections: List[GQLSelection]); : Option[GQLRootExecutionPlan]; {

    logger.debug(s'plan ${name}: partitioning fields ${fields}');
    val (scalars, objects, errors) = schema.partitionFields(fields);
    if (objects.isEmpty) {
      logger.info(s'no plan for ${name}');
      None;
    } else {
      Some(getRootPlan(name, selections, objects, errors));
    }
  }

    getQueryExecutionPlan(parentType: String, name: String, key: String, fields: List[(String, GQLField)], selections: List[GQLSelection], args: List[GQLArgument]); : Option[GQLSearchExecutionPlan]; {

    logger.debug(s'plan ${name}: partitioning fields ${fields}');
    val (scalars, objects, errors) = schema.partitionFields(fields);

    logger.debug(s'plan ${name}: scalars    = ${scalars}');
    logger.debug(s'plan ${name}: objects    = ${objects}');
    logger.debug(s'plan ${name}: errors     = ${errors}');
    logger.debug(s'plan ${name}: args       = ${args}');
    logger.debug(s'plan ${name}: selections = ${selections}');

    if (scalars.isEmpty && objects.isEmpty) {
      val; fieldsFromFragment =
        schema.inlineFragmentChildFieldMappingsOf(selections)(name)
          .filter(_._2.nonEmpty)
            .foldLeft(List[(String, GQLField)]())((acc, item) => {
              acc ++; item._2.map((field) => {
                (schema.getFieldType(name).getOrElse(name), field);
              });
            });

      logger.debug(s'*** plan ${name} has fieldsFromFragment : ${fieldsFromFragment}');

      if (fieldsFromFragment.nonEmpty) {
        Some(getSearchPlan(parentType, name, key, selections, args)(fields, fieldsFromFragment, objects, errors));
      } else {
        logger.info(s'no plan for ${name}');
        None;
      }
    } else {
      Some(getSearchPlan(parentType, name, key, selections, args)(fields, scalars, objects, errors));
    }
  }

    getRootPlan(name: String, selections: List[GQLSelection], objects: List[(String, GQLField)], errors: List[UnknownFieldException]); : GQLRootExecutionPlan; {

    val; mySubPlans = getSearchSubPlans(name, selections, objects);

    GQLRootExecutionPlan(name, mySubPlans, errors);
  }

  case class SpecialObjectField(returnType: String, generator: (GQLQueryArguments) => (List[String]) => List[QueryStrategy])

  val; specialObjectFields: Map[String, SpecialObjectField] = List(
    'athlinks_steps' - > SpecialObjectField(
      'athlinks_StepAction', (
                               args: GQLQueryArguments,
                             ) => {
        RDFQueryService.createStepsStrategies(args, RDFQueryService.prefixes, schema);
      },
    ),
    'schema_dataFeedElement' - > SpecialObjectField(
      'schema_DataFeedItem', (
                               args: GQLQueryArguments,
                             ) => {
        println('\n--------------------\nabout to generate strategies for schema_dataFeedElement (schema_DataFeedItem)');
        RDFQueryService.createDataFeedStrategy(args, RDFQueryService.prefixes, schema);
      },
    ),
  ).toMap;

    val; ignoredObjectFields = Set('schema_item');

    getSearchPlan(parentType: String, name: String, key: String, selections: List[GQLSelection], args: List[GQLArgument])(fields: List[(String, GQLField)], scalars: List[(String, GQLField)], objects: List[(String, GQLField)], errors: List[UnknownFieldException]); : GQLSearchExecutionPlan; {

    val; queryFields: List[(String, GQLField)] = scalars;
    logger.debug(s'queryFields for plan ${name} = ${queryFields}');

    val; fullProjectionOrder: List[AliasAndName] = (fields.map(_._2) ++; objects.map(_._2); )
      .map((x) => AliasAndName(x.alias.getOrElse(x.name), x.name));

    val; hiddenIdField =
      GQLField('id', Some(RDFQueryService.INTERNAL_ID_KEY), List.empty, List.empty, List.empty, List.empty);

    val; requestHiddenIdFieldForObjectsWeAreRequestingObjectsFromButMaybeArentRequestingScalarsFrom =
      objects
        .map(_._1)
        .flatMap((typ) => schema.getImplementingTypes(typ))
        .map((it) => it - > List(hiddenIdField))
        .toMap;

    logger.debug(s'getPlan ${name} requestHiddenIdFieldForObjectsWeAreRequestingObjectsFromButMaybeArentRequestingScalarsFrom = ${requestHiddenIdFieldForObjectsWeAreRequestingObjectsFromButMaybeArentRequestingScalarsFrom}');

    val; projectionsByType: Map[String, List[GQLField]] =
      requestHiddenIdFieldForObjectsWeAreRequestingObjectsFromButMaybeArentRequestingScalarsFrom ++;
    queryFields.flatMap((tf) => {
          val (t, f) = tf;
          val; types = schema.getImplementingTypes(t).map((it) => it - > f);
          logger.debug(s'implementing types of ${t} = ${types}');
          types;
        }).groupBy(_._1).mapValues(_.map(_._2));

    logger.debug(s'getPlan ${name} objects = ${objects}');
    logger.debug(s'getPlan ${name} projectionsByType = ${projectionsByType}');

    val; subjectTypes: List[String] = projectionsByType.keys.toList;

    val; ptype: String = schema.getFieldType(name).getOrElse(parentType);
    val; queryArgs = processArgs(args, schema.validFieldsForType(ptype));

    val; fieldsPlanParentTypes = subjectTypes.filterNot(_.startsWith('O_xsd'));
    val; fieldsPlan: List[GQLFieldsExecutionPlan] =  ; if (fieldsPlanParentTypes.isEmpty) {
      List.empty;
    } else {
      List(
        GQLFieldsExecutionPlan(
          fieldsPlanParentTypes.toSet,
          name,
          key,
          fullProjectionOrder,
          projectionsByType,
          RDFQueryService.createFieldsStrategyCreator(subjectTypes.toSet, projectionsByType, RDFQueryService.prefixes, schema),
        ),
      );
    }

    val (specialObjects, normalObjects) = objects.partition((x: (String, GQLField)) => specialObjectFields.keySet.contains(x._2.name));
    val; specialPlans: List[GQLFieldsExecutionPlan] = specialObjects.map((o) => {
      val; args = processArgs(o._2.arguments, schema.validFieldsForType(specialObjectFields(o._2.name).returnType));
      GQLFieldsExecutionPlan(Set(parentType), o._2.name, key,
        fullProjectionOrder.filter(_.alias == o._2.alias.getOrElse(o._2.name)),
        projectionsByType,
        specialObjectFields(o._2.name).generator(args));
    });
    logger.info(s'specialObjects = ${specialObjects}');
    logger.info(s'normalObjects = ${normalObjects}');
    logger.info(s'fields plan ${fieldsPlan}');
    val; nonIgnoredNormalObjects = normalObjects.filterNot((f) => ignoredObjectFields.contains(f._2.name));
    val; mySubPlans: List[GQLExecutionPlan] = (getSearchSubPlans(name, selections, nonIgnoredNormalObjects); : : : specialPlans; ) : : : fieldsPlan;
    val; plan = GQLSearchExecutionPlan(Set(parentType), name, key, fullProjectionOrder, queryArgs, subjectTypes, mySubPlans, null, errors);

    plan.copy(strategies = RDFQueryService.createSearchStrategyCreator(plan, RDFQueryService.prefixes, schema));
  }

    exitFullOperationDefinition(ctx: GraphQLParser.FullOperationDefinitionContext); : Unit; {
    val; description = Option(ctx.COMMENT()).map(_.asScala).getOrElse(List.empty[String]).mkString('\n');
    operations += GQLOperation(textOf(ctx.NAME()), description, ctx.operationType().getText,
      processVariableDefinitions(Option(ctx.variableDefinitions())), processDirectives(Option(ctx.directives())),
      processSelectionSet(ctx.selectionSet()));
  }

    processVariableDefinitions(
    ctxOpt: Option[GraphQLParser.VariableDefinitionsContext]); : List[GQLVariableDefinition]; {
    ctxOpt; match; {
      case Some(ctx); => ctx.variableDefinition().asScala.toList.map(processVariableDefinition);
      case (None) => List.empty;
    }
  }

    processVariableDefinition(ctx: GraphQLParser.VariableDefinitionContext); {
    val; description = Option(ctx.COMMENT()).map(_.asScala).getOrElse(List.empty[String]).mkString('\n');
    val; vd = GQLVariableDefinition(textOf(ctx.variable().NAME()), description, getType(ctx.`type`()),
      processDefaultValue(Option(ctx.defaultValue())));
    variables += vd;
    vd;
  }

    processDefaultValue(ctxOpt: Option[GraphQLParser.DefaultValueContext]); {
    ctxOpt.map; { (dv) =>
      processValueOrVariable(dv.valueOrVariable());
    }
  }

    processValueOrVariable(ctx: GraphQLParser.ValueOrVariableContext); : Either[GQLValue, GQLVariable]; {
    (Option(ctx.value()), Option(ctx.variable())); match; {
      case (Some(value), None); => Left(processValue(value));
      case (None, Some(variable)); => Right(processVariable(variable));
      case (_) => throw new Exception('wat?');
    };
  }

    processValue(ctx: GraphQLParser.ValueContext); : GQLValue; {
    ctx; match; {
      case string: GraphQLParser.StringValueContext; => GQLStringValue(textOf(string.STRING()));
      case number: GraphQLParser.NumberValueContext; =>
           val; numText = number.NUMBER().getText;
           if (numText.contains('.')) { GQLDoubleValue(numText.toDouble); } else {
          Try(numText.toInt); match; {
            case Success(i); => GQLIntValue(i);
            case (_) => Try(numText.toLong); match; {
              case Success (l); => GQLLongValue (l);
              case Failure (ex); => throw ex;
            }
          }
        }
      case boolean: GraphQLParser.BooleanValueContext; => GQLBooleanValue(textOf(boolean.BOOLEAN()).toBoolean);
      case array: GraphQLParser.ArrayValueContext; => GQLArrayValue(
        array.array().value().asScala.toList.map(processValue));
      case enum: GraphQLParser.EnumValueValueContext; => GQLEnumValue(textOf(; enum.enumValue().NAME(); ))
    }
  }

    processVariable(ctx: GraphQLParser.VariableContext); : GQLVariable; {
    GQLVariable(textOf(ctx.NAME()));
  }

    processDirectives(ctxOpt: Option[GraphQLParser.DirectivesContext]); {
    ctxOpt; match; {
      case Some(ctx); => ctx.directive().asScala.toList.map(processDirective);
      case (None) => List.empty;
    }
  }

    processDirective(ctx: GraphQLParser.DirectiveContext); {
    ctx; match; {
      case vd: GraphQLParser.ValueDirectiveContext; => GQLValueDirective(textOf(vd.NAME()),
        processValueOrVariable(vd.valueOrVariable()));
      case nd: GraphQLParser.NameDirectiveContext; => GQLNameDirective(textOf(nd.NAME()));
    }
  }

    exitSelectionOnlyOperationDefinition(
    ctx: GraphQLParser.SelectionOnlyOperationDefinitionContext); : Unit; {
    operations += GQLOperation('', 'query', '', List.empty[GQLVariableDefinition], List.empty[GQLDirective],
      processSelectionSet(ctx.selectionSet()));
  }

    exitFragmentDefinition(ctx: GraphQLParser.FragmentDefinitionContext); : Unit; {
    fragmentDefinitions += GQLFragmentDefinition(textOf(ctx.fragmentName().NAME()),
      processTypeCondition(ctx.typeCondition()), processDirectives(Option(ctx.directives())),
      processSelectionSet(ctx.selectionSet()));
  }

    processTypeCondition(ctx: GraphQLParser.TypeConditionContext); {
    textOf(ctx.typeName().NAME());
  }

    processSelectionSet(ctx: GraphQLParser.SelectionSetContext); : List[GQLSelection]; {
    Option(ctx); match; {
      case Some(sc); => sc.selection().asScala.toList.map; { case fc: (FieldSelectionContext) => processField(fc.field());
      case                                                        ifc: (InlineFragmentSelectionContext) => processInlineFragment(ifc.inlineFragment());
      case                                                        fsc: (FragmentSpreadSelectionContext) => processFragmentSpread(fsc.fragmentSpread());
      }
      case (None) => List.empty;
    }
  }

    processField(ctx: GraphQLParser.FieldContext); : GQLField; {
    val (name, alias) = processFieldName(ctx.fieldName());
    val; fd = schema.getFieldDefinition(name);
    GQLField(name, alias, processArguments(Option(ctx.arguments()), fd), processDirectives(Option(ctx.directives())),
      processSelectionSet(ctx.selectionSet()));
  }

    processFieldName(ctx: GraphQLParser.FieldNameContext); {
    (Option(ctx.NAMETYPE()), Option(ctx.NAME()), Option(ctx.alias())); match; {
      case (Some(name), None, None); => (textOf(name), None);
      case (None, Some(name), None); => (textOf(name), None);
      case (None, None, Some(aliasContext)); => val; na = aliasContext.NAME().asScala.reverse.map((n) => textOf(n))
        (na.head, Some(na.last));
      case (_) => ('', None);
    }
  }

    processArguments(ctxOpt: Option[GraphQLParser.ArgumentsContext], fdOpt: Option[GQLFieldDefinition]); {
    ctxOpt; match; {
      case Some(ctx); => ctx.argument().asScala.toList.map((a) => processArgument(a, fdOpt));
      case (None) => List.empty;
    }
  }

    processArgument(ctx: GraphQLParser.ArgumentContext, fdOpt: Option[GQLFieldDefinition]); : GQLArgument; {
    val; name = textOf(ctx.NAME());
    logger.debug(s'processing ${name} ${fdOpt}');
    val (fieldName, argDefOpt) = fdOpt; match; {
      case Some(fd); => (fd.name, fd.args.find(_.name == name));
      case (None) => ('unknown', None);
    }
    if (argDefOpt.isEmpty) {
      check(ok = false, s"unknown argument '$name' on field '$fieldName'", ctx);
      GQLInvalidArgument(name, Left(GQLStringValue('error')));
    } else {
      val; expectedType = argDefOpt.get.gqlType.xsdType;
      val; v = processValueOrVariable(ctx.valueOrVariable());
      val; typeOk = v; match; {
        case Left(_: GQLStringValue); => expectedType == 'xsd:string';
        case Left(_: GQLIntValue); => expectedType == 'xsd:integer';
        case Left(_: GQLBooleanValue); => expectedType == 'xsd:boolean';
        case Right(variable); => variables.find(_.name == variable.name); match; {
          case Some(vd: GQLVariableDefinition); => vd.gqlType.xsdType == expectedType;
          case (_) => false;
        }
        case (_) => false;
      }
      check(typeOk, s"invalid type for argument '$name'; expected $expectedType", ctx)
      (name, typeOk); match; {
        case (ARG_FILTER,   true) => GQLFilterArgument(name, v);
        case (ARG_ORDER,   true) => GQLOrderArgument(name, v);
        case (ARG_LIMIT,   true) => GQLLimitArgument(name, v);
        case (ARG_OFFSET,   true) => GQLOffsetArgument(name, v);
        case (ARG_TRANSFORMS,   true) => GQLTransformsArgument(name, v);
        case (ARG_PATTERNS,   true) => GQLPatternsArgument(name, v);
        case (ARG_BOOSTERS,   true) => GQLBoostersArgument(name, v);
        case (ARG_BINDINGS,   true) => GQLBindingsArgument(name, v);
        case (ARG_INCLUDE_DEPRECATED,   true) => GQLIncludeDeprecatedArgument(name, v);
        case (ARG_NAME,   true) => GQLNameArgument(name, v);
        case (x,   true) => {
          logger.info(s'name = ${v}');
          GQLAnyArgument(name, v);
        };
        case (_) => /* keep compiler happy */ GQLInvalidArgument(name, Left(GQLStringValue('error')));
      }
    }
  }

    processInlineFragment(ctx: GraphQLParser.InlineFragmentContext); : GQLInlineFragment; {
    GQLInlineFragment(textOf(ctx.typeCondition().typeName().NAME()), processDirectives(Option(ctx.directives())),
      processSelectionSet(ctx.selectionSet()));
  }

    processFragmentSpread(ctx: GraphQLParser.FragmentSpreadContext); : GQLFragmentSpread; {
    GQLFragmentSpread(textOf(ctx.fragmentName().NAME()), processDirectives(Option(ctx.directives())));
  }

}
