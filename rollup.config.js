import typescript from 'rollup-plugin-typescript2';

export default {
  entry: 'lib/index.ts',
  // sourceMap: true,
  plugins: [typescript()]
};
