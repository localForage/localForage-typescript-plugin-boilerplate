import typescript from 'rollup-plugin-typescript2';

export default {
  entry: 'lib/index.ts',
  format: 'es',
  dest: 'dist/localforage-plugin-boilerplate.es6.js',
  // sourceMap: true,
  plugins: [typescript()],
  external: ['localforage']
};
