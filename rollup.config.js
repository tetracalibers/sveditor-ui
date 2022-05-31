import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import sveltePreprocess from 'svelte-preprocess'
import typescript from '@rollup/plugin-typescript'

const pkg = require('./package.json')

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, (m) => m.toUpperCase())
	.replace(/-\w/g, (m) => m[1].toUpperCase())

const production = !process.env.ROLLUP_WATCH

export default {
	input: 'src/index.js',
	output: [
		{ file: pkg.module, format: 'en' },
		{ file: pkg.main, format: 'umd', name: name },
	],
	plugins: [
		typescript({ sourceMap: !production }),
		svelte({
			preprocess: sveltePreprocess({
				sourceMap: !production,
				postcss: {
					plugins: [require('autoprefixer')()],
				},
				stylus: {
					paths: ['src/stylus'],
				},
			}),
			dev: !production,
			css: (css) => {
				css.write('dist/bundle.css')
			},
		}),
		resolve(),
	],
}
