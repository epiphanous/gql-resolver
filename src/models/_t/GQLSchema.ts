import { expect } from 'chai';
import fs = require('fs');
import 'mocha';
import Builder from '../../builders/Builder';
import GQLSchemaBuilder from '../../builders/graphql/GQLSchemaBuilder';
import { GQLSchema } from '../GQLSchema';
import { GQLEnum, GQLObjectType } from '../GQLTypeDefinition';

describe('GQLSchema', () => {
  let schema: GQLSchema = null;

  const loadSchema = () => {
    if (!schema) {
      const schemaText = fs.readFileSync('./src/schema.graphql', 'utf8');
      schema = Builder.parse<GQLSchema>(
        new GQLSchemaBuilder(),
        schemaText
      ).get();
    }
  };

  it('loads', () => {
    loadSchema();
    expect(schema).is.not.equal(undefined);
  });

  it('has allFields', () => {
    loadSchema();
    expect(schema.allFields.size).to.equal(570);
    console.log(schema.allFields.get('s_sameAs'));
  });

  it('has allTypes', () => {
    loadSchema();
    expect(schema.allTypes.size).to.equal(249);
  });

  it('has operationTypes', () => {
    loadSchema();
    expect(schema.operationTypes.size).to.equal(3);
  });

  it('has query operation', () => {
    loadSchema();
    expect(schema.operationTypes.get('query')).to.equal('Query');
  });

  it('has mutation operation', () => {
    loadSchema();
    expect(schema.operationTypes.get('mutation')).to.equal('Mutation');
  });

  it('has subscription operation', () => {
    loadSchema();
    expect(schema.operationTypes.get('subscription')).to.equal('Subscription');
  });

  it('has interfaces', () => {
    loadSchema();
    expect(schema.interfaces.size).to.equal(31);
  });

  it('has unions', () => {
    loadSchema();
    expect(schema.unions.size).to.equal(49);
    console.log(
      schema.unions
        .map(td => td.name)
        .toList()
        .toJS()
    );
  });

  it('has object types', () => {
    loadSchema();
    expect(schema.objectTypes.size).to.equal(134);
  });

  it('has scalar types', () => {
    loadSchema();
    const actualMembers = schema.scalarTypes
      .map(td => td.name)
      .toList()
      .toJS();
    const expectedMembers = [
      'ID',
      'String',
      'Int',
      'Float',
      'Boolean',
      'Date',
      'DateTime',
      'Time',
      'Duration',
      'URL',
    ];
    expect(schema.scalarTypes.size).to.equal(expectedMembers.length);
    expect(actualMembers).to.have.members(expectedMembers);
    expect(schema.scalarTypes.get('Duration').nativeType).to.equal(
      'xsd_duration'
    );
  });

  it('has input types', () => {
    loadSchema();
    expect(schema.inputTypes.size).to.equal(1);
    expect(schema.inputTypes.valueSeq().get(0).name).to.equal(
      'TripFilterInput'
    );
  });

  it('has no directives', () => {
    loadSchema();
    expect(schema.directives.size).to.equal(0);
  });

  it('has enums', () => {
    loadSchema();
    expect(schema.enums.size).to.equal(25);
  });

  it('enums has TripRole with correct members', () => {
    loadSchema();
    const tripRoleEnum = schema.enums.get('j_TripRole');
    console.log('ENUM', tripRoleEnum.values);
    expect(tripRoleEnum).is.an.instanceOf(GQLEnum);
    const tripRoleMembers = [
      'j_Organizer',
      'j_Sponsor',
      'j_Tracker',
      'j_Traveller',
    ];
    expect(tripRoleEnum.values.map(evd => evd.name).toJS()).to.have.members(
      tripRoleMembers
    );
  });

  it('allTypes has j_User object type with correct fields', () => {
    loadSchema();
    const userType = schema.allTypes.get('j_User');
    expect(userType).is.an.instanceOf(GQLObjectType);
    const fields = (userType as GQLObjectType).fields.map(fd => fd.name).toJS();
    const members = [
      's_description',
      's_id',
      's_name',
      'j_bookedTrips',
      'j_identities',
      'j_person',
      'j_sessions',
      'j_tripProfiles',
      's_alternateName',
      's_disambiguatingDescription',
      's_identifier',
      's_image',
      's_mainEntityOfPage',
      's_potentialAction',
      's_sameAs',
    ];
    expect(fields).to.have.members(members);
  });

  it('has fields by type', () => {
    loadSchema();
    console.log(schema.fieldsByType.toJS());
  });
});
