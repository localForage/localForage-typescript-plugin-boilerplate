let getSerializerPromiseCache: Promise<LocalForageSerializer>;

export function getSerializerPromise(localForageInstance: LocalForage) {
    if (getSerializerPromiseCache) {
        return getSerializerPromiseCache;
    }
    if (
        !localForageInstance ||
        typeof localForageInstance.getSerializer !== 'function'
    ) {
        return Promise.reject(
            new Error(
                'localforage.getSerializer() was not available! ' +
                    'localforage v1.4+ is required!',
            ),
        );
    }
    getSerializerPromiseCache = localForageInstance.getSerializer();
    return getSerializerPromiseCache;
}

let getDriverPromiseCache: {
    [driverName: string]: Promise<LocalForageDriver>;
};

export function getDriverPromise(
    localForageInstance: LocalForage,
    driverName: string,
) {
    getDriverPromiseCache = getDriverPromiseCache || {};
    if (getDriverPromiseCache[driverName]) {
        return getDriverPromiseCache[driverName];
    }
    if (
        !localForageInstance ||
        typeof localForageInstance.getDriver !== 'function'
    ) {
        return Promise.reject(
            new Error(
                `localforage.getDriver() was not available!
             localforage v1.4+ is required!`,
            ),
        );
    }
    getDriverPromiseCache[driverName] = localForageInstance.getDriver(
        driverName,
    );
    return getDriverPromiseCache[driverName];
}

export function executeCallback<T>(
    promise: Promise<T>,
    callback?: (error: any, result?: T) => void,
) {
    if (callback) {
        promise.then(
            function(result) {
                callback(null, result);
            },
            function(error) {
                callback(error);
            },
        );
    }
    return promise;
}
