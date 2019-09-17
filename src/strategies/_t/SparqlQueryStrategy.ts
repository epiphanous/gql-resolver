import 'mocha';

describe('fetchResults', () => {
  // TODO should be rewritten to utilize the Factory class
  // const endpointURL = 'http://localhost:7200/repositories/test';
  // // const QSSparql = new SparqlFieldQueryStrategy(); // TODO fix
  // const prefixes = 'PREFIX gn: <http://sws.geonames.org/>';
  // const query = 'SELECT ?o WHERE { ?s ?p ?o. ?s a gn:Feature } LIMIT 10';
  // it('should return a results stream', () => {
  //   const fetch = async (queryStr) => {
  //     const bindingsStream = await QSSparql.fetcher.fetchBindings(
  //       endpointURL,
  //       `${prefixes} ${queryStr}`
  //     );
  //     expect(bindingsStream.constructor.name).to.equal('SparqlJsonBindingsTransformer');
  //   };
  //   fetch(query);
  // });
  //
  // it('should contain 10 result objects', () => {
  //   const res = [];
  //   const fetch = async (queryStr) => {
  //     const bindingsStream = await QSSparql.fetcher.fetchBindings(
  //       endpointURL,
  //       `${prefixes} ${queryStr}`
  //     );
  //     bindingsStream.on('data', data => {
  //       res.push(data);
  //     });
  //     bindingsStream.on('end', () => {
  //       expect(res).to.have.length(10);
  //     });
  //   };
  //   fetch(query);
  // });
  //
  // it('should return a valid queryResult object', () => {
  //   const resolveQuery = () => {
  //     return new Promise((resolve, reject) =>
  //       QSSparql.fetcher.fetchBindings(
  //         endpointURL,
  //         `${prefixes} ${query}`
  //       ).then((stream) => {
  //         const resultArr = [];
  //         const errors = [];
  //         stream.on('data', data => {
  //           resultArr.push(data);
  //         });
  //         stream.on('error', error => {
  //           errors.push(error);
  //         });
  //         stream.on('end', () => {
  //           const result = new QueryResult();
  //           const resultArrValues: Array<{}> = resultArr.map(entry => {
  //             return Object.keys(entry).reduce((acc, key) => {
  //               acc[key] = entry[key].value;
  //               return acc;
  //             }, {});
  //           });
  //           const om = OrderedMap<string, OrderedMap<string, any>>(
  //             resultArrValues.map((row: { parentId: string, s: string }) => {
  //                 const k: string = this.hasProperParent() ? row.parentId : row.s;
  //                 const v = OrderedMap<any>(this.fields.map(f => {
  //                   const key: string = f.alias.getOrElse(f.name);
  //                   const rowValueByKey: any = row[key] || row[this.SPECIAL_PROJECTIONS.get(key)] || null;
  //                   return [key, rowValueByKey];
  //                 }));
  //                 // to prevent lint errors..
  //                 const returnValue: [string, OrderedMap<string, any>] = [k, v];
  //                 return returnValue;
  //               }
  //             )
  //           );
  //           result.data = om;
  //           result.meta.errors.push(...errors);
  //           result.addMetadata();
  //           return resolve(result);
  //         });
  //       }).catch(err => reject(err)));
  //     };
  //   resolveQuery()
  //     .then((result: QueryResult) => {
  //       ['values', 'startTime', 'duration', 'count', 'bytes', 'done', 'ok'].forEach(key => {
  //         expect(result).to.haveOwnProperty(key);
  //       });
  //       expect(result.meta.count).to.be.greaterThan(0);
  //     })
  //     .catch(err => console.error(err));
  // });
});
