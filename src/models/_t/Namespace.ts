import { expect } from 'chai';
import 'mocha';
import { SimpleNamespace } from '../Namespace';

describe('NamespaceTest', () => {
  const ns = new SimpleNamespace('geo', 'Geonames');
  it('shouldHaveProperPrefix', () => {
    expect(ns.getPrefix()).to.eql('geo');
  });
  it('shouldHaveProperName', () => {
    expect(ns.getName()).to.eql('Geonames');
  });
  it('shouldHaveNewNameAndPrefix', () => {
    ns.setName('Test');
    ns.setPrefix('t');
    expect(ns.getName()).to.eql('Test');
    expect(ns.getPrefix()).to.eql('t');
  });
});
