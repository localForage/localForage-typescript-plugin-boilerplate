import * as localforage from 'localforage';
import * as m from 'mochainon';

describe('First test', function() {
    it('works as expected', function() {
        return m.chai.expect(Promise.resolve(true)).to.eventually.deep.equal(true);
    });
});

describe('Localforage', function() {
    it('should get ready', function() {
        return m.chai.expect(localforage.ready()).to.eventually.be.fulfilled;
    });

    it('support IDB', function() {
        m.chai.expect(localforage.supports(localforage.INDEXEDDB)).to.be.true;
    });
});

