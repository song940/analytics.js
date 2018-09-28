import cleanup from 'rollup-plugin-cleanup'
import license from 'rollup-plugin-license'
import uglify from 'rollup-plugin-uglify-es'

let env = process.env.NODE_ENV

export default {
  input: './src/index.js',
  output: {
    file: env === 'cjs' ? './dist/analytics.js' : './dist/analytics.umd.js',
    format: env === 'cjs' ? 'cjs' : 'umd',
    name: 'Analytics'
  },
  plugins: [
    license({
      banner: `by Lsong Copyright ${JSON.stringify(new Date()).replace(
        /T.*|"/g,
        ''
      )}`
    }),
    cleanup(),
    uglify()
  ]
}