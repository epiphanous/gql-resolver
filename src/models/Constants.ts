import { Map } from 'immutable';
import { SimpleNamespace } from '.';

export const DEFAULT_PREFIXES = Map([
  ['afn', new SimpleNamespace('afn', 'http://jena.hpl.hp.com/ARQ/function#')],
  ['dc', new SimpleNamespace('dc', 'http://purl.org/dc/elements/1.1/')],
  ['dcterms', new SimpleNamespace('dcterms', 'http://purl.org/dc/terms/')],
  ['fn', new SimpleNamespace('fn', 'http://www.w3.org/2005/xpath-functions#')],
  [
    'geo',
    new SimpleNamespace('geo', 'http://www.w3.org/2003/01/geo/wgs84_pos#'),
  ],
  [
    'geof',
    new SimpleNamespace(
      'geof',
      'http://www.opengis.net/def/function/geosparql/'
    ),
  ],
  [
    'geoname',
    new SimpleNamespace('geoname', 'http://www.geonames.org/ontology#'),
  ],
  ['gn', new SimpleNamespace('gn', 'http://sws.geonames.org/')],
  [
    'leviathan',
    new SimpleNamespace('leviathan', 'http://www.dotnetrdf.org/leviathan#'),
  ],
  [
    'math',
    new SimpleNamespace('math', 'http://www.w3.org/2005/xpath-functions/math#'),
  ],
  ['omgeo', new SimpleNamespace('omgeo', 'http://www.ontotext.com/owlim/geo#')],
  [
    'rdf',
    new SimpleNamespace('rdf', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
  ],
  [
    'rdfs',
    new SimpleNamespace('rdfs', 'http://www.w3.org/2000/01/rdf-schema#'),
  ],
  ['s', new SimpleNamespace('s', 'http://schema.org/')],
  ['schema', new SimpleNamespace('schema', 'http://schema.org/')],
  ['skos', new SimpleNamespace('skos', 'http://www.w3.org/2004/02/skos/core#')],
  ['swrlb', new SimpleNamespace('swrlb', 'http://www.w3.org/2003/11/swrlb#')],
  ['unit', new SimpleNamespace('unit', 'http://qudt.org/vocab/unit#')],
  ['xml', new SimpleNamespace('xml', 'http://www.w3.org/XML/1998/namespace')],
  ['xsd', new SimpleNamespace('xsd', 'http://www.w3.org/2001/XMLSchema#')],
]);
