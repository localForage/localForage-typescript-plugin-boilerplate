import { LocalForageWithDbInfo } from './types';

declare let webkitIDBKeyRange: IDBKeyRange;
declare let mozIDBKeyRange: IDBKeyRange;

function getIDBKeyRange() {
    if (typeof IDBKeyRange !== 'undefined') {
        return IDBKeyRange;
    }
    if (typeof webkitIDBKeyRange !== 'undefined') {
        return webkitIDBKeyRange;
    }
    if (typeof mozIDBKeyRange !== 'undefined') {
        return mozIDBKeyRange;
    }
}

export const idbKeyRange = getIDBKeyRange();

export function openStoreTransaction(self: LocalForage, fn: any, mode: string) {
    return new Promise(function(resolve, reject) {
        const dbInfo = ((self as any) as LocalForageWithDbInfo<IDBDatabase>)
            ._dbInfo;
        self
            .ready()
            .then(function() {
                const transaction = dbInfo.db.transaction(
                    dbInfo.storeName,
                    'readwrite',
                );
                const store = transaction.objectStore(dbInfo.storeName);

                const req = fn(transaction, store);

                if (mode === 'readwrite') {
                    transaction.oncomplete = function() {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function() {
                        const err = req.error
                            ? req.error
                            : req.transaction.error;
                        reject(err);
                    };
                } else {
                    req.onsuccess = function() {
                        resolve(req.result);
                    };

                    req.onerror = function() {
                        reject(req.error);
                    };
                }
            })
            .catch(reject);
    });
}
