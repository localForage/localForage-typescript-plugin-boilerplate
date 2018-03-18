import typescript from 'rollup-plugin-typescript';

export default {
  entry: 'lib/index.ts',
  format: 'umd',
  dest: 'dist/localforage-plugin-boilerplate.js',
  moduleName: 'localforagePluginBoilerplate',
  // sourceMap: true,
  plugins: [typescript({
    tsconfig: false,
    "allowSyntheticDefaultImports": true,
    "module": "es2015",
    "target": "es3",
    "declaration": false,
    "noImplicitAny": true,
    "preserveConstEnums": true,
    "removeComments": true,
    "sourceMap": true,
    "strictNullChecks": true,
    "moduleResolution": "node",
    "outDir": "dist",
  })],
  external: ['localforage']
};
