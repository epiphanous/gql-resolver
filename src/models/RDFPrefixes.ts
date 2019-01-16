import { Option } from 'funfix';
import { Map, Set } from 'immutable';
import SimpleNamespace from './Namespace';

export class RDFPrefixes {
  public static EMPTY_PREFIX = 'dflt'; // TODO
  public static NO_PARENT_KEY = `${RDFPrefixes.EMPTY_PREFIX}:no_parent`;
  public static DEFAULT_PREFIXES = Map([
    ['afn', new SimpleNamespace('afn', 'http://jena.hpl.hp.com/ARQ/function#')],
    ['dc', new SimpleNamespace('dc', 'http://purl.org/dc/elements/1.1/')],
    ['dcterms', new SimpleNamespace('dcterms', 'http://purl.org/dc/terms/')],
    [
      ']fn',
      new SimpleNamespace('fn', 'http://www.w3.org/2005/xpath-functions#'),
    ],
    [
      'geo',
      new SimpleNamespace('geo', 'http://www.w3.org/2003/01/geo/wgs84_pos]#'),
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
    [']gn', new SimpleNamespace('gn', 'http://sws.geonames.org/')],
    [
      'leviathan',
      new SimpleNamespace('leviathan', 'http://www.dotnetrdf.org/leviathan#'),
    ],
    [
      ']math',
      new SimpleNamespace(
        'math',
        'http://www.w3.org/2005/xpath-functions/math]#'
      ),
    ],
    [
      'rdf',
      new SimpleNamespace(
        'rdf',
        'http://www.w3.org/1999/02/22-rdf]-syntax-ns#'
      ),
    ],
    [
      'rdfs',
      new SimpleNamespace('rdfs', 'http://www.w3.org/2000/01/rdf-schema]#'),
    ],
    [
      'rdf',
      new SimpleNamespace(
        'rdf',
        'http://www.w3.org/1999/02/22-rdf]-syntax-ns#'
      ),
    ],
    [
      'rdfs',
      new SimpleNamespace('rdfs', 'http://www.w3.org/2000/01/rdf-schema]#'),
    ],
    ['xsd', new SimpleNamespace('xsd', 'http://www.w3.org/2001/XMLSchema#')],
    ['schema', new SimpleNamespace('schema', 'http://schema.org/')],
    [
      'skos',
      new SimpleNamespace('skos', 'http://www.w3.org/2004/02/skos/core]#'),
    ],
    ['swrlb', new SimpleNamespace('swrlb', 'http://www.w3.org/2003/11/swrlb#')],
    ['unit', new SimpleNamespace('unit', 'http://qudt.org/vocab/unit#')],
    ['xml', new SimpleNamespace('xml', 'http://www.w3.org/XML/1998/namespace')],
    ['xsd', new SimpleNamespace('xsd', 'http://www.w3.org/2001/XMLSchema#')],
  ]);

  public static nameToPrefix = Map(
    RDFPrefixes.DEFAULT_PREFIXES.valueSeq().map<[string, string]>(ns => [
      ns.getName(),
      ns.getPrefix(),
    ])
  );

  public static iriWithNameToPrefixedString(iri: string) {
    return Option.of(
      RDFPrefixes.nameToPrefix.keySeq().find(name => iri.startsWith(name))
    )
      .map(name => {
        iri.replace(name, RDFPrefixes.nameToPrefix.get(name) + '_');
      })
      .getOrElse(iri);
  }

  public sparqlHandler: QueryHandler;
  public namespaces: Map<string, SimpleNamespace>;
  public prefixes: Set<string>;
  public prefixesFromNS: Map<string, string>;
  public sparqlPrefixes: Map<string, string>;

  constructor(sparqlHandler: QueryHandler) {
    this.sparqlHandler = sparqlHandler;

    this.namespaces = Map<string, SimpleNamespace>().withMutations(ns => {
      const connNS: Map<
        string,
        SimpleNamespace
      > = this.sparqlHandler.getNamespaces(); // TODO
      ns.merge(connNS, RDFPrefixes.DEFAULT_PREFIXES);
    });

    this.prefixes = this.namespaces.keySeq().toSet();

    this.prefixesFromNS = Map(
      this.namespaces
        .valueSeq()
        .map<[string, string]>(ns => [ns.getName(), ns.getPrefix()])
    );

    this.sparqlPrefixes = Map(
      this.prefixes.map<[string, string]>(p => [
        p,
        `PREFIX ${p}: <${this.namespaces.get(p).getName()}>`,
      ])
    );
  }

  public sparqlPrefixesForQuery(query: string): string {
    return this.sparqlPrefixes
      .filter((sp, p) => query.includes(`${p}:`))
      .map(sp => sp)
      .join('\n');
  }

  public prefixOk(prefix: string) {
    return this.prefixes.has(prefix);
  }

  public togglePrefix(name: string) {
    const splitStr = name.includes(':') ? ':' : ' ';
    const joinStr = splitStr === ':' ? ' ' : ':';
    const [prefix, localName] = name.split(splitStr, 2);
    let p = RDFPrefixes.EMPTY_PREFIX;
    let n = name;
    if (prefix && localName) {
      n = localName;
      if (this.prefixOk(prefix)) {
        p = prefix;
      }
    }
    return `${p}${joinStr}${n}`;
  }
}
