import { toMap } from 'antlr4ts/misc';
import { None, Option, Some, TNone, TSome } from 'funfix';
import { List, Map, Seq, Set } from 'immutable';
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

interface IGQLSchema {
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

  public fieldsByType: Map<string, Map<string, List<string>>> = Map();
  public typesByInterface: Map<string, Set<string>> = Map();
  public objectTypesForField: Map<string, Set<string>> = Map();
  public types;
  public flatten;
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
    unions: Map<string, GQLUnion>
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
    this.init();
  }

  public init() {
    this.fieldsByType.withMutations(fbt =>
      fbt
        .concat(
          this.interfaces
            .map((d, t) => [
              t,
              d.fields
                .map(f => f.name)
                .map(fn => this.getFieldTypeDefinition(fn))
                .flatten(),
            ])
            .toMap()
        )
        .concat(
          this.objectTypes.map((d, t) => [
            t,
            d.fields
              .map(f => f.name)
              .map(f => {
                const fd = this.getFieldTypeDefinition(f).map(ftd =>
                  this.isScalarLike(ftd) ? 's' : 'o'
                );
              }),
          ])
        )
    );
    this.typesByInterface.withMutations(map => {
      this.objectTypes.forEach((d, t) => {
        d.interfaces.forEach(i => {
          if (!map.has(i)) {
            map.set(i, Set(t));
          } else {
            map.update(i, s => s.add(t));
          }
        });
      });
    });
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
      return u.gqlTypes.filterNot(x => this.isScalarLike(x)).isEmpty();
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
    return this.objectTypesForField.get(f);
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
    switch (this.getTypeDefinition(t).value.constructor.name) {
      case 'GQLUnion':
        types = this.getTypeDefinition(t)
          .value.constructor()
          .gqlTypes.toSet();
        break;
      case 'GQLTypeDefinition':
        types = Set(this.getTypeDefinition(t).value.constructor().name);
        break;
      default:
        types = Set<string>();
    }

    return types
      .map(somePossibleSet => {
        if (this.isScalarObjectType(somePossibleSet)) {
          // This probably won't work..
          return this.objectTypes.get(somePossibleSet).fields.map(f => {
            const key = f.gqlType.xsdType + '_' + f.name;
            const val = f.gqlType.xsdType;
            return [key, val];
          });
        } else {
          let s;
          let o;
          if (this.fieldsByType.get(somePossibleSet).get('s')) {
            s = this.fieldsByType
              .get(somePossibleSet)
              .get('s')
              .map(f => [f, this.getFieldType(f).get()]);
          } else {
            s = List();
          }
          if (this.fieldsByType.get(somePossibleSet).get('o')) {
            o = this.fieldsByType
              .get(somePossibleSet)
              .get('o')
              .map(f => [f, this.getFieldType(f).get()]);
          } else {
            o = List();
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
    console.log(fields);

    fields
      .flatMap<[string, GQLField]>(tf => {
        console.log(tf);
        const [objType, field] = tf;
        if (objType.startsWith('U_')) {
          List<[string, GQLField]>(
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
        const so = this.fieldsByType.get(objType);
        const s = Option.of(so.get('s'));
        const o = Option.of(so.get('o'));
        if (s.nonEmpty && s.get().includes(field.name)) {
          scalars.push(tf);
        } else if (o.nonEmpty && o.get().includes(field.name)) {
          objects.push(tf);
        } else {
          errors.push(
            new Error(`field '${field.name}' not in type '${objType}'`)
          );
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
    const result = selections.reduce((acc, node) => {
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
    const result = selections.reduce((acc, node) => {
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
      return fragmentInfo[0].selections.map(selection => {
        if (selection.constructor.name === 'GQLField') {
          return selection as GQLField;
        } else {
          console.warn(`no idea how to handle ${selection}`);
          return null;
        }
      });
    });
  }

  public inlineFragmentChildFieldMappingsOf(
    selections: List<GQLSelection>,
    field: string
  ): Map<string, Seq<any, any>> {
    const nestedFieldSelections = (fieldStr: string) =>
      this.nestedField(selections, fieldStr);
    const optField = nestedFieldSelections(field);
    const nestedFragmentSelections = (someStr: string) => () =>
      this.nestedFragment(selections, someStr);
    const membersOfParsedType = (str: string) =>
      this.typeMembers(nestedFragmentSelections(str), str); // TODO finish
    const listOfResTuples = List();
    const typeMembersMappings = () => {
      for (const fld of [optField.value]) {
        for (const fieldType of [this.getFieldType(fld.name)]) {
          for (const parsedType of this.parseTypeInfo(
            fieldType.value
          ).toArray()) {
            listOfResTuples.push([parsedType, membersOfParsedType(parsedType)]);
          }
        }
      }
      return listOfResTuples;
    };
    return typeMembersMappings().reduce((acc, item) => {
      return acc + item;
    }, Map<string, List<GQLField>>());
  }
}
