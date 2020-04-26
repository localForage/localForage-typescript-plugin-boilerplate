import * as m from 'mochainon';

import * as localforage from 'localforage';
// load this repo's extension
import '../';

const { expect } = m.chai;

describe('Localforage', function() {
    it('should get ready', function() {
        return expect(localforage.ready()).to.eventually.be.fulfilled;
    });

    it('support IDB', function() {
        expect(localforage.supports(localforage.INDEXEDDB)).to.be.true;
    });
});
