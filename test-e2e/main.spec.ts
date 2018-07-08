import * as m from 'mochainon';

import * as localforage from 'localforage';
// load this repo's extension
import '../../';

describe('Localforage', function() {
    it('should get ready', function() {
        return m.chai.expect(localforage.ready()).to.eventually.be.fulfilled;
    });

    it('support IDB', function() {
        m.chai.expect(localforage.supports(localforage.INDEXEDDB)).to.be.true;
    });
});
