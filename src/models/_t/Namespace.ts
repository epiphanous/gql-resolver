import { expect } from 'chai';
import { List, Map } from 'immutable';
import 'mocha';
import Namespace from '../Namespace';

describe('NamespaceTest', () => {
    const ns = new Namespace('geo', 'Geonames');
    it('shouldHaveProperPrefix', () => {
        expect(ns.getPrefix()).to.eql('geo');
    });
    it('shouldHaveProperName', () => {
        expect(ns.getName()).to.eql('Geonames');
    });
    it('shouldHaveNewNameAndPrefix', () => {
        ns.setName('Jubel');
        ns.setPrefix('j');
        expect(ns.getName()).to.eql('Jubel');
        expect(ns.getPrefix()).to.eql('j');
    });
});
