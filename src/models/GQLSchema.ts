import Record from 'dataclass';
import {Option} from 'funfix';
import {List, Map} from 'immutable';
import {GQLArgumentDefinition} from './GQLArgumentDefinition';
import {GQLDirectiveDefinition} from './GQLDirectiveDefinition';
import {GQLEnum} from './GQLEnum';
import {GQLFieldDefinition} from './GQLFieldDefinition';
import {GQLInputType} from './GQLInputType';
import {GQLInterface} from './GQLInterface';
import {GQLObjectType} from './GQLObjectType';
import {GQLScalarType,} from './GQLScalarType';
import {GQLTypeDefinition} from './GQLTypeDefinition';
import {GQLUnion} from './GQLUnion';

export class GQLSchema extends Record<GQLSchema> {
  public operationTypes: Map<string, string>;
  public scalarTypes: Map<string, GQLScalarType>;
  public interfaces: Map<string, GQLInterface>;
  public objectTypes: Map<string, GQLObjectType>;
  public unions: Map<string, GQLUnion>;
  public enums: Map<string, GQLEnum>;
  public inputTypes: Map<string, GQLInputType>;
  public directives: Map<string, GQLDirectiveDefinition>;
  public allTypes: Map<string, GQLTypeDefinition>;
  public allFields: Map<string, GQLFieldDefinition>;

  public fieldsByType: Map<string, Map<string, List<string>>> = Map();
  public typesByInterface: Map<string, Set<string>> = Map();
  private objectTypesForField: Map<string, Set<string>> = Map();

  public init() {
    this.fieldsByType.withMutations((fbt) =>
      fbt
        .concat(
          this.interfaces
            .map((d, t) => [
              t,
              d.fields
                .map((f) => f.name)
                .map((fn) => this.getFieldTypeDefinition(fn))
                .flatten(),
            ])
            .toMap(),
        )
        .concat(
          this.objectTypes.map((d, t) => [
            t,
            d.fields
              .map((f) => f.name)
              .map((f) => {
                const fd = this.getFieldTypeDefinition(f).map((ftd) =>
                  this.isScalarLike(ftd) ? 's' : 'o',
                );
              }),
          ]),
        ),
    );
    this.typesByInterface.withMutations((map) => {
      this.objectTypes.forEach((d, t) => {
        d.implements.forEach((i) => {
          if (!map.has(i)) { map.set(i, new Set(t)); }
          else { map.update(i, (s) => s.add(t)); }
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
    }
    else { return this.isObjectType(t) && this.isScalarObjectType(t.name); }
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
      return u.gqlTypes.filterNot((t) => this.isScalarLike(t)).isEmpty();
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
    return tdOpt.map((td) => td.constructor.name);
  }
  public getKind(t: Option<GQLTypeDefinition>): string {
    return t
      .map((td) => {
        if (td instanceof GQLObjectType) { return 'OBJECT'; }
        if (td instanceof GQLInterface) { return 'INTERFACE'; }
        if (td instanceof GQLInputType) { return 'INPUT_OBJECT'; }
        if (td instanceof GQLUnion) { return 'UNION'; }
        if (td instanceof GQLEnum) { return 'ENUM'; }
        if (td instanceof GQLFieldDefinition) {
          return this.getKind(this.getFieldTypeDefinition(td.name));
        }
        if (td instanceof GQLArgumentDefinition) {
          return this.getKind(this.getTypeDefinition(td.gqlType.name));
        }
        if (td instanceof GQLDirectiveDefinition) { return 'DIRECTIVE'; }
        else { return 'GETKIND ERROR'; }
      })
      .getOrElse('GETKIND ERROR');
  }

  public getType(t: Option<GQLTypeDefinition>): string {
    return t
      .map((td) => {
        if (td instanceof GQLObjectType) { return td.name; }
        if (td instanceof GQLInterface) { return td.name; }
        if (td instanceof GQLInputType) { return td.name; }
        if (td instanceof GQLUnion) { return td.name; }
        if (td instanceof GQLEnum) { return td.name; }
        if (td instanceof GQLFieldDefinition) {
          return this.getType(this.getFieldTypeDefinition(td.name));
        }
        if (td instanceof GQLArgumentDefinition) {
          return this.getType(this.getTypeDefinition(td.gqlType.name));
        }
        if (td instanceof GQLDirectiveDefinition) { return td.name; }
        else { return 'GETTYPE ERROR'; }
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
    return this.getFieldDefinition(f).map((fd) => fd.gqlType.name);
  }

  public getFieldTypeDefinition(f: string): Option<GQLTypeDefinition> {
    return this.getFieldType(f).flatMap((t) => this.getTypeDefinition(t));
  }

  public containsFields(t: string, fields: List<string>) {
    const td = this.allTypes.get(t);
    if (td instanceof GQLInterface || td instanceof GQLObjectType) {
      return fields.isSubset(td.fields.map((f) => f.name));
    }
    return false;
  }

  // validFieldsForType(t:string):Map<string, string> {
  //   const types = getTypeDefinition(t) match {
  //     case Some(u:GQLUnion) => u.gqlTypes.toSet
  //     case Some(o:GQLTypeDefinition) => Set(o.name)
  //     case None => Set.empty[string]
  //   }
  //   types.flatten { t =>
  //     if (isScalarObjectType(t)) (objectTypes.get(t): @unchecked) match {
  //       case Some(o) => o.fields.map(f => s"${f.gqlType.xsdType}_${f.name}" -> f.gqlType.xsdType)
  //     }
  //     else {
  //       const s = fieldsByType(t).get("s") match {
  //         case Some(fields) => fields.map(f => f -> getFieldType(f).get)
  //         case None => List.empty
  //       }
  //       const o = fieldsByType(t).get("o") match {
  //         case Some(fields) => fields.map(f => f -> getFieldType(f).get)
  //         case None => List.empty
  //       }
  //       s ++ o
  //     }
  //   }.toMap
  // }

  public parseTypeInfo(objType: string): List<string> {
    if (objType.startsWith('U_')) { return List(objType.substr(2).split('_OR_')); }
    else { return List(objType); }
  }

  // partitionFields(fields:List<(string,GQLField)>): (List<(string,GQLField)>, List<(string,GQLField)>, List<UnknownFieldException>) {
  //   const scalars = mutable.ListBuffer.empty[(string,GQLField)]
  //   const objects = mutable.ListBuffer.empty[(string,GQLField)]
  //   const errors  = mutable.ListBuffer.empty[UnknownFieldException]

  //   fields
  //     .flatMap(objTypeAndField => objTypeAndField match {
  //       case (objType: string, field: GQLField) if objType.startsWith("U_") => {
  //         objType.drop(2).split("_OR_").map(t => (t, field)).toList
  //       }
  //       case (objType: string, field: GQLField) =>
  //         List(objTypeAndField)
  //       case x => {
  //         logger.warn(s"dont know how to handle ${x}!")
  //         List()
  //       }
  //     })
  //     .map(tf => {
  //       if (tf._1.startsWith("xsd")) {
  //         ("O_" + tf._1, tf._2)
  //       } else {
  //         tf
  //       }
  //     })
  //     .map(objTypeAndField => objTypeAndField match {
  //       case (objType: string, field: GQLField) =>
  //         const so: Map<string, List<string>> = fieldsByType(objType)
  //         const s: Option<List<string>> = so.get("s")
  //         const o: Option<List<string>> = so.get("o")
  //         if (s.nonEmpty && s.get.contains(field.name)) scalars += objTypeAndField
  //         else if (o.nonEmpty && o.get.contains(field.name)) objects += objTypeAndField
  //         else errors += new UnknownFieldException(s"field '${field.name}' not in type '$objType'")
  //     })

  //   (scalars.toList, objects.toList, errors.toList)
  // }

  public getFieldsOf(t: string) {
    return this.getTypeDefinition(t)
      .map((td) => {
        if (td instanceof GQLInterface || td instanceof GQLObjectType) {
          return td.fields;
        }
        else { List<GQLFieldDefinition>(); }
      })
      .getOrElse(List<GQLFieldDefinition>());
  }

  public getImplementingTypes(t: string) {
    return Option.of(this.typesByInterface.get(t)).getOrElse(new Set(t));
  }

  public resolveIntrospectionQuery() {}

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

  // nestedField(selections:List<GQLSelection>)(fieldName:string):Option<GQLField> {
  //   const result = selections.foldLeft(Set<GQLField>())((acc, node) => {
  //     node match {
  //       case f:GQLField =>
  //         if(f.name.equals(fieldName)) {
  //           acc + f
  //         } else {
  //           acc ++ nestedField(f.selections)(fieldName).toSet
  //         }
  //       case f:GQLInlineFragment =>
  //         acc ++ nestedField(f.selections)(fieldName).toSet
  //       case x =>
  //         throw new Exception(s"no idea how to handle ${x}")
  //     }
  //   })
  //   result.headOption
  // }

  // nestedFragment(selections:List<GQLSelection>)(fieldType:string):Option<(GQLInlineFragment, Option[GQLField>)] {
  //   var fragmentOwner:Option<GQLField> = None
  //   selections.foldLeft(Set<(GQLInlineFragment, Option<GQLField>)>())((acc, node) => {
  //     node match {
  //       case f:GQLInlineFragment =>
  //         if(f.typeCondition.equals(fieldType)) {
  //           acc + ((f, fragmentOwner))
  //         } else {
  //           acc ++ nestedFragment(f.selections)(fieldType).toSet
  //         }
  //       case f:GQLField =>
  //         fragmentOwner = Some(f)
  //         acc ++ nestedFragment(f.selections)(fieldType).toSet
  //       case x =>
  //         throw new Exception(s"no idea how to handle ${x}")
  //     }
  //   }).headOption
  // }

  // typeMembers(fieldsOfType: string => Option<(GQLInlineFragment, Option[GQLField>)])(typeInfo:string):List<GQLField> =
  //   fieldsOfType(typeInfo).toList.flatMap(fragmentInfo => {
  //     fragmentInfo._1.selections.flatMap(selection => {
  //       selection match {
  //         case f:GQLField => Some(f)
  //         case x => {
  //           logger.warn(s"no idea how to handle ${x}")
  //           None
  //         }
  //       }
  //     })
  //   })

  // inlineFragmentChildFieldMappingsOf(selections:List<GQLSelection>)(field:string):Map<string, Seq[GQLField>] {
  //   const nestedFieldSelections = nestedField(selections) _
  //   const optField = nestedFieldSelections(field)

  //   const nestedFragmentSelections = nestedFragment(selections) _
  //   const membersOfParsedType = typeMembers(nestedFragmentSelections) _

  //   const typeMembersMappings =
  //     for {
  //       field <- optField.toList
  //       fieldType <- getFieldType(field.name).toList
  //       parsedType <- parseTypeInfo(fieldType)
  //     } yield (parsedType -> membersOfParsedType(parsedType))

  //   typeMembersMappings.foldLeft(Map<string, List<GQLField>>())((acc, item) => {
  //     acc + item
  //   })
  // }
}
