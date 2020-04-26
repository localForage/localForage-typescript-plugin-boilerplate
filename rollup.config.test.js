import typescript from 'rollup-plugin-typescript';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
  input: './tests-unit/**/*_test.ts',
  plugins: [typescript({
    tsconfig: 'test/tsconfig.json',
    typescript: require('typescript'),
  }), multiEntry()],
  external: ['localforage'],
  output: [
    {
      intro: 'require("source-map-support").install();',
      file: 'build/tests-unit/test-bundle.js',
      format: 'cjs',
      sourceMap: true
    }
  ]
};
