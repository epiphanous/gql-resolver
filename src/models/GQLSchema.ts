import { None, Option, Some, TNone, TSome } from 'funfix';
import { List, Map, Seq, Set } from 'immutable';
import { GQLDirective } from './GQLDirective';
import { GQLField, GQLInlineFragment, GQLSelection } from './GQLSelection';
import {
  GQLArgumentDefinition,
  GQLDirectiveDefinition,
  GQLEnum,
  GQLFieldDefinition,
  GQLInputType,
  GQLInterface,
  GQLObjectType,
  GQLScalarType,
  GQLTypeDefinition,
  GQLUnion,
} from './GQLTypeDefinition';

export interface IGQLSchema {
  allFields: Map<string, GQLFieldDefinition>;
  allTypes: Map<string, GQLTypeDefinition>;
  directives: Map<string, GQLDirectiveDefinition>;
  enums: Map<string, GQLEnum>;
  inputTypes: Map<string, GQLInputType>;
  interfaces: Map<string, GQLInterface>;
  objectTypes: Map<string, GQLObjectType>;
  operationTypes: Map<string, string>;
  scalarTypes: Map<string, GQLScalarType>;
  unions: Map<string, GQLUnion>;
  fieldsByType: Map<string, Map<string, List<string>>>;
  typesByInterface: Map<string, Set<string>>;
  objectTypesForField: Map<string, Set<string>>;
}

export class GQLSchema implements IGQLSchema {
  public allFields: Map<string, GQLFieldDefinition>;
  public allTypes: Map<string, GQLTypeDefinition>;
  public directives: Map<string, GQLDirectiveDefinition>;
  public enums: Map<string, GQLEnum>;
  public inputTypes: Map<string, GQLInputType>;
  public interfaces: Map<string, GQLInterface>;
  public objectTypes: Map<string, GQLObjectType>;
  public operationTypes: Map<string, string>;
  public scalarTypes: Map<string, GQLScalarType>;
  public unions: Map<string, GQLUnion>;
  public schemaDirectives: List<GQLDirective>;

  public fieldsByType = Map<string, Map<string, List<string>>>();
  public typesByInterface = Map<string, Set<string>>();
  public objectTypesForField = Map<string, Set<string>>();

  constructor(
    allFields: Map<string, GQLFieldDefinition>,
    allTypes: Map<string, GQLTypeDefinition>,
    directives: Map<string, GQLDirectiveDefinition>,
    enums: Map<string, GQLEnum>,
    inputTypes: Map<string, GQLInputType>,
    interfaces: Map<string, GQLInterface>,
    objectTypes: Map<string, GQLObjectType>,
    operationTypes: Map<string, string>,
    scalarTypes: Map<string, GQLScalarType>,
    unions: Map<string, GQLUnion>,
    schemaDirectives: Set<GQLDirective>
  ) {
    this.allFields = allFields;
    this.allTypes = allTypes;
    this.directives = directives;
    this.enums = enums;
    this.inputTypes = inputTypes;
    this.interfaces = interfaces;
    this.objectTypes = objectTypes;
    this.operationTypes = operationTypes;
    this.scalarTypes = scalarTypes;
    this.unions = unions;
    this.schemaDirectives = schemaDirectives.toList();
    this.init();
  }

  public init() {
    const fbt = Map<string, Map<string, List<string>>>().asMutable();
    const tbi = Map<string, Set<string>>().asMutable();
    const otf = Map<string, Set<string>>().asMutable();

    this.interfaces.forEach((i, t) => {
      fbt.concat({ [t]: this._scalarsObjects(i.fields) });
    });
    this.objectTypes.forEach((o, t) => {
      fbt.concat({ [t]: this._scalarsObjects(o.fields) });
      o.interfaces.forEach(i => {
        tbi.update(i, Set(), s => s.add(t));
      });
      o.fields
        .map(fd => fd.name)
        .forEach(f => {
          otf.update(f, Set(), s => s.add(t));
        });
    });

    this.fieldsByType = fbt.asImmutable();
    this.typesByInterface = tbi.asImmutable();
    this.objectTypesForField = otf.asImmutable();
  }

  public getTypeName(t: string | GQLTypeDefinition): string {
    return typeof t === 'string' ? t : t.name;
  }

  public isScalar(t: string | GQLTypeDefinition): boolean {
    return this.scalarTypes.has(this.getTypeName(t));
  }

  public isScalarLike(t: string | GQLTypeDefinition): boolean {
    return (
      this.isScalar(t) ||
      this.isEnum(t) ||
      this.isUnionScalarLike(t) ||
      this.isScalarObjectType(t)
    );
  }

  public isScalarObjectType(t: string | GQLTypeDefinition): boolean {
    if (typeof t === 'string') {
      return t.startsWith('O_') && this.isScalarLike(t.substring(2));
    } else {
      return this.isObjectType(t) && this.isScalarObjectType(t.name);
    }
  }

  public isInterface(t: string | GQLTypeDefinition): boolean {
    return this.interfaces.has(this.getTypeName(t));
  }

  public isUnion(t: string | GQLTypeDefinition): boolean {
    return this.unions.has(this.getTypeName(t));
  }

  public isUnionScalarLike(t: string | GQLTypeDefinition): boolean {
    const name = this.getTypeName(t);
    if (this.unions.has(name)) {
      const u = this.unions.get(name);
      return u!.gqlTypes.filterNot(x => this.isScalarLike(x)).isEmpty();
    }
    return false;
  }

  public isObjectType(t: string | GQLTypeDefinition): boolean {
    return this.objectTypes.has(this.getTypeName(t));
  }

  public isObjectLike(t: string | GQLTypeDefinition): boolean {
    return !this.isScalarLike(t);
  }

  public isMultiType(t: string | GQLTypeDefinition): boolean {
    return this.isInterface(t) || this.isUnion(t);
  }

  public isEnum(t: string | GQLTypeDefinition): boolean {
    return this.enums.has(this.getTypeName(t));
  }

  public getTypeClass(tdOpt: Option<GQLTypeDefinition>): Option<string> {
    return tdOpt.map(td => td.constructor.name);
  }

  public getKind(t: Option<GQLTypeDefinition>): string {
    return t
      .map(td => {
        if (td instanceof GQLObjectType) {
          return 'OBJECT';
        }
        if (td instanceof GQLInterface) {
          return 'INTERFACE';
        }
        if (td instanceof GQLInputType) {
          return 'INPUT_OBJECT';
        }
        if (td instanceof GQLUnion) {
          return 'UNION';
        }
        if (td instanceof GQLEnum) {
          return 'ENUM';
        }
        if (td instanceof GQLFieldDefinition) {
          return this.getKind(this.getFieldTypeDefinition(td.name));
        }
        if (td instanceof GQLArgumentDefinition) {
          return this.getKind(this.getTypeDefinition(td.gqlType.name));
        }
        if (td instanceof GQLDirectiveDefinition) {
          return 'DIRECTIVE';
        } else {
          return 'GETKIND ERROR';
        }
      })
      .getOrElse('GETKIND ERROR');
  }

  public getType(t: Option<GQLTypeDefinition>): string {
    return t
      .map(td => {
        if (td instanceof GQLObjectType) {
          return td.name;
        }
        if (td instanceof GQLInterface) {
          return td.name;
        }
        if (td instanceof GQLInputType) {
          return td.name;
        }
        if (td instanceof GQLUnion) {
          return td.name;
        }
        if (td instanceof GQLEnum) {
          return td.name;
        }
        if (td instanceof GQLFieldDefinition) {
          return this.getType(this.getFieldTypeDefinition(td.name));
        }
        if (td instanceof GQLArgumentDefinition) {
          return this.getType(this.getTypeDefinition(td.gqlType.name));
        }
        if (td instanceof GQLDirectiveDefinition) {
          return td.name;
        } else {
          return 'GETTYPE ERROR';
        }
      })
      .getOrElse('GETTYPE ERROR');
  }

  public getTypeDefinition(t: string): Option<GQLTypeDefinition> {
    return Option.of(this.allTypes.get(t));
  }

  public getFieldDefinition(f: string): Option<GQLFieldDefinition> {
    return Option.of(this.allFields.get(f));
  }

  public getFieldSubjectObjectTypes(f: string): Set<string> {
    return this.objectTypesForField.get(f)!;
  }

  public getFieldType(f: string): Option<string> {
    return this.getFieldDefinition(f).map(fd => fd.gqlType.name);
  }

  public getFieldTypeDefinition(f: string): Option<GQLTypeDefinition> {
    return this.getFieldType(f).flatMap(t => this.getTypeDefinition(t));
  }

  public containsFields(t: string, fields: List<string>) {
    const td = this.allTypes.get(t);
    if (td instanceof GQLInterface || td instanceof GQLObjectType) {
      return fields.isSubset(td.fields.map(f => f.name));
    }
    return false;
  }

  public validFieldsForType(t: string): Map<string, string> {
    let types: Set<string>;
    switch (this.getTypeDefinition(t).value!.constructor.name) {
      case 'GQLUnion':
        types = this.getTypeDefinition(t)
          .value!.constructor()
          .gqlTypes.toSet();
        break;
      case 'GQLTypeDefinition':
        types = Set(this.getTypeDefinition(t).value!.constructor().name);
        break;
      default:
        types = Set<string>();
    }

    return types
      .map(p => {
        if (this.isScalarObjectType(t)) {
          // This probably won't work..
          return this.objectTypes.get(p)!.fields.map(f => {
            const key = f.gqlType.xsdType + '_' + f.name;
            const val = f.gqlType.xsdType;
            return [key, val];
          });
        } else {
          let s = List<[string, string]>();
          let o = List<[string, string]>();
          const fbt = this.fieldsByType.get(p);
          if (fbt) {
            if (fbt.has('s')) {
              s = fbt
                .get('s')!
                .map<[string, string]>(f => [f, this.getFieldType(f).get()]);
            }
            if (fbt.has('o')) {
              o = fbt
                .get('o')!
                .map<[string, string]>(f => [f, this.getFieldType(f).get()]);
            }
          }
          return s.concat(o);
        }
      })
      .flatten()
      .toMap();
  }

  public parseTypeInfo(objType: string): List<string> {
    if (objType.startsWith('U_')) {
      return List(objType.substr(2).split('_OR_'));
    } else {
      return List(objType);
    }
  }

  public partitionFields(
    fields: List<[string, GQLField]>
  ): [List<[string, GQLField]>, List<[string, GQLField]>, List<Error>] {
    const scalars = List<[string, GQLField]>().asMutable();
    const objects = List<[string, GQLField]>().asMutable();
    const errors = List<Error>().asMutable();
    // console.log(fields);

    fields
      .flatMap<[string, GQLField]>((tf: [string, GQLField]) => {
        console.log(tf);
        const [objType, field] = tf;
        if (objType.startsWith('U_')) {
          return List<[string, GQLField]>(
            objType
              .slice(2)
              .split('_OR_')
              .map<[string, GQLField]>(t => [t, field])
          );
        } else {
          return List<[string, GQLField]>([tf]);
        }
      })
      .map<[string, GQLField]>(tf => {
        const [objType, field] = tf;
        if (objType.startsWith('xsd')) {
          return [`O_${objType}`, field];
        } else {
          return tf;
        }
      })
      .map(tf => {
        const [objType, field] = tf;
        const so: Map<string, List<string>> = this.fieldsByType.get(objType, Map<string, List<string>>());
        if (so && !so.isEmpty()) {
          // const toValues = fieldStrArrPair.get(1)
          //   .map((opt: Option<List<string>>) => opt.value)
          //   .filter((optval: string) => optval);
          // const grouped = toValues.reduce((acc: any, current: any) => {
          //   if (acc[current[0]]) {
          //     acc[current[0]].push(current[1]);
          //   } else {
          //     acc[current[0]] = [current[1]];
          //   }
          //   return acc;
          // }, {});
          // const so = Map(grouped);
          const s = Option.of(so.get('s'));
          const o = Option.of(so.get('o'));
          if (s.nonEmpty() && (s.value as List<string>).includes(field.name)) {
            scalars.push(tf);
          } else if (
            o.nonEmpty() &&
            (o.value as List<string>).includes(field.name)
          ) {
            objects.push(tf);
          } else {
            errors.push(
              new Error(`field '${field.name}' not in type '${objType}'`)
            );
          }
        }
      });
    return [List(scalars), List(objects), List(errors)];
  }

  public getFieldsOf(t: string) {
    return this.getTypeDefinition(t)
      .map(td => {
        if (td instanceof GQLInterface || td instanceof GQLObjectType) {
          return td.fields;
        } else {
          List<GQLFieldDefinition>();
        }
      })
      .getOrElse(List<GQLFieldDefinition>());
  }

  public getImplementingTypes(t: string) {
    return Option.of(this.typesByInterface.get(t)).getOrElse(Set(t));
  }

  public getDirectiveDefinition(name: string) {
    return Option.of(this.directives.get(name));
  }

  // public resolveIntrospectionQuery() {}

  // isNested(selections:List<GQLSelection>)(fieldName:string):boolean {
  //   const result = selections.foldLeft(false)((acc, node) => {
  //     node match {
  //       case f:GQLField =>
  //         logger.debug(s"checking ${f.name} == ${fieldName}")
  //         if(f.name.equals(fieldName)) {
  //           acc || true
  //         } else {
  //           acc || isNested(f.selections)(fieldName)
  //         }
  //       case f:GQLInlineFragment =>
  //         acc || isNested(f.selections)(fieldName)
  //       case x =>
  //         throw new Exception(s"no idea how to handle ${x}")
  //     }
  //   })
  //   logger.debug(s"isNested(${fieldName}) = ${result}")
  //   result
  // }

  public nestedField(
    selections: List<GQLSelection | GQLField | GQLInlineFragment>,
    fieldName: string
  ): Option<GQLField> {
    const result = selections.reduce((acc: Set<GQLField | undefined>, node: GQLSelection | GQLField | GQLInlineFragment) => {
      if (node.constructor.name === 'GQLField') {
        if (node.name === fieldName) {
          return acc.add(node as GQLField);
        } else {
          return acc.union(
            Set([
              this.nestedField(
                (node as GQLField).selections as List<GQLField>,
                fieldName
              ).value,
            ])
          );
        }
      } else if (node.constructor.name === 'GQLInlineFragment') {
        return acc.union(
          Set([
            this.nestedField(
              (node as GQLInlineFragment).selections as List<GQLField>,
              fieldName
            ).value,
          ])
        );
      } else {
        throw new Error(`No idea how to handle ${node}`);
      }
    }, Set<GQLField>());
    return Option.of(result.first());
  }

  public nestedFragment(
    selections: List<GQLSelection | GQLField | GQLInlineFragment>,
    fieldType: string
  ): Option<[GQLInlineFragment, Option<GQLField>]> {
    let fragmentOwner: TSome<GQLField> | TNone = None;
    const result = selections.reduce((acc: Set<[GQLInlineFragment, Option<GQLField>] | undefined>, node: GQLSelection | GQLField | GQLInlineFragment) => {
      if (node.constructor.name === 'GQLInlineFragment') {
        if ((node as GQLInlineFragment).typeCondition === fieldType) {
          return acc.add([node as GQLInlineFragment, fragmentOwner]);
        } else {
          return acc.union(
            Set([
              this.nestedFragment(
                (node as GQLInlineFragment).selections,
                fieldType
              ).value,
            ])
          );
        }
      } else if (node.constructor.name === 'GQLField') {
        fragmentOwner = Some(node as GQLField);
        return acc.union(
          Set([
            this.nestedFragment(
              (node as GQLInlineFragment).selections,
              fieldType
            ).value,
          ])
        );
      } else {
        throw new Error(`No idea how to handle ${node}`);
      }
    }, Set<[GQLInlineFragment, Option<GQLField>]>());
    return Option.of(result.first());
  }

  public typeMembers(
    fieldsOfType: (a: string) => Option<[GQLInlineFragment, Option<GQLField>]>,
    typeInfo: string
  ): List<GQLField> {
    return List([fieldsOfType(typeInfo).value]).flatMap(fragmentInfo => {
      return fragmentInfo && fragmentInfo[0].selections
        .filter(selection => selection.constructor.name === 'GQLField')
        .map(selection => selection as GQLField) || List();
    });
  }

  public inlineFragmentChildFieldMappingsOf(
    selections: List<GQLSelection>,
    field: string
  ): Map<string, List<GQLField>> {
    const nestedFieldSelections = (fieldStr: string) =>
      this.nestedField(selections, fieldStr);
    const optField = nestedFieldSelections(field);
    const nestedFragmentSelections = (someStr: string) => () =>
      this.nestedFragment(selections, someStr);
    const membersOfParsedType = (str: string) =>
      this.typeMembers(nestedFragmentSelections(str), str); // TODO finish
    const listOfResTuples: Array<[string, List<GQLField>]> = [];
    for (const fld of [optField.value]) {
      for (const fieldType of [this.getFieldType(fld!.name)]) {
        for (const parsedType of this.parseTypeInfo(
          fieldType.value!
        ).toArray()) {
          listOfResTuples.push([parsedType, membersOfParsedType(parsedType)]);
        }
      }
    }
    return Map(listOfResTuples);
  }

  private _scalarsObjects(
    fields: List<GQLFieldDefinition>
  ): Map<string, List<string>> {
    return fields
      .map(fd => fd.name)
      .map<[string, string]>(f => {
        const ft = this.getFieldTypeDefinition(f);
        if (ft.isEmpty()) {
          throw new Error(`field type definition not found for ${f}`);
        }
        return [this.isScalarLike(ft.get()) ? 's' : 'o', f];
      })
      .groupBy(([so]) => so)
      .map(v => v.map(w => w[1]).toList())
      .toMap();
  }
}
