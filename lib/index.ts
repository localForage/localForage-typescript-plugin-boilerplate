import localforage from 'localforage';
// // you can access the serializer and thedrivers by:
// import { getSerializerPromise, getDriverPromise } from './utils';

// getSerializerPromise();
// getDriverPromise(localforage.WEBSQL);

export interface LocalForagePlugin extends LocalForage {
    _baseMethods: { [methodName: string]: () => any; };
    _pluginPrivateVariables: {
        listOfImportantThings: any[];
        callCount: number;
    };
}

function handleMethodCall(localforageInstance: LocalForagePlugin, methodName: string, args: any) {
    return localforageInstance.ready()
        .then(function() {
            console.log('Invoking ' + methodName + ' with arguments: ', args);
            const promise = localforageInstance._baseMethods[methodName].apply(localforageInstance, args);
            promise.then(function(result: any) {
                console.log('Invoking ' + methodName + ' resolved with: ', result);
            }, function(err: Error) {
                console.log('Invoking ' + methodName + ' rejected with: ', err);
            });
            return promise;
        });
}

// wraps the localForage methods of the WrappedLibraryMethods array and
// allows you to execute code before & after their invocation
function wireUpMethods(localforageInstance: LocalForagePlugin) {
    const WrappedLibraryMethods = [
        'clear',
        'getItem',
        'iterate',
        'key',
        'keys',
        'length',
        'removeItem',
        'setItem',
    ];

    function wireUpMethod(localforageInstance: LocalForagePlugin, methodName: string) {
        localforageInstance._baseMethods = localforageInstance._baseMethods || {};
        localforageInstance._baseMethods[methodName] =
            (localforageInstance as any)[methodName] as () => any;
        (localforageInstance as any)[methodName] = function() {
            return handleMethodCall(this, methodName, arguments);
        };
    }

    for (let i = 0, len = WrappedLibraryMethods.length; i < len; i++) {
        const methodName = WrappedLibraryMethods[i];
        wireUpMethod(localforageInstance, methodName);
    }
}

// place your plugin initialization logic here
// useful in case that you need to preserve a state
function setup(localforageInstance: LocalForagePlugin) {
    if (!localforageInstance._pluginPrivateVariables) {
        localforageInstance._pluginPrivateVariables = {
            callCount: 0,
            listOfImportantThings: [],
        };

        // in case you need to observe the invocation of some methods
        wireUpMethods(localforageInstance);
    }
}

// this will be available as `localforage.pluginMethod('test');`
export function localforagePluginBoilerplate(/*option*/) {
    const localforageInstance = this;

    // this will initialize your plugin lazily
    // after the first invocation of your method
    setup(localforageInstance);

    console.log('Hello world from the plugin method!');
    return Promise.resolve('Hello world result!');
}

// add your plugin method to every localForage instance
export function extendPrototype(localforage: LocalForage) {
    const localforagePrototype = Object.getPrototypeOf(localforage);
    if (localforagePrototype) {
        localforagePrototype.pluginMethod = localforagePluginBoilerplate;
    }

    return localforage as LocalForagePlugin;
}

export const extendPrototypeResult = extendPrototype(localforage);
