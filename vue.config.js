// module.exports = {
//   "transpileDependencies": [
//     "vuetify"
// 	],

// }
const path = require('path');
process.env.VUE_APP_VERSION = require('./package.json').version
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
	devServer: {
    host: '0.0.0.0',
    port: 8085, // CHANGE YOUR PORT HERE!
    https: true,
    hotOnly: false,
  },
	parallel: false,
	chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'test') {
      const sassRule = config.module.rule('sass')
      sassRule.uses.clear()
      sassRule.use('null-loader').loader('null-loader')
      const scssRule = config.module.rule('scss')
      scssRule.uses.clear()
      scssRule.use('null-loader').loader('null-loader')
    }
    // Allow to mix SASS and SCSS
    // https://vuetifyjs.com/en/customization/sass-variables#single-file-components
    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach((match) => {
      config.module.rule('scss').oneOf(match).use('sass-loader')
        .tap(opt => Object.assign(opt, { data: '@import "~@/styles/application.scss";' }))
    })
  },
	// The source of CKEditor is encapsulated in ES6 modules. By default, the code
	// from the node_modules directory is not transpiled, so you must explicitly tell
	// the CLI tools to transpile JavaScript files in all ckeditor5-* modules.
	devServer: {
		host: 'localhost',
		open: true
	},
	transpileDependencies: [
		/ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/, "vuetify"
	],

	configureWebpack: {
		plugins: [
			new CKEditorWebpackPlugin({
				language: 'en',
    		buildAllTranslationsToSeparateFiles: true,
			}),
		]
	},

	// Vue CLI would normally use its own loader to load .svg and .css files, however:
	//	1. The icons used by CKEditor must be loaded using raw-loader,
	//	2. The CSS used by CKEditor must be transpiled using Post  to load properly.
	chainWebpack: config => {
		// (1.) To handle editor icons, get the default rule for *.svg files first:
		const svgRule = config.module.rule('svg');

		// Then you can either:
		//
		// * clear all loaders for existing 'svg' rule:
		//
		//		svgRule.uses.clear();
		//
		// * or exclude ckeditor directory from node_modules:
		svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));

		// Add an entry for *.svg files belonging to CKEditor. You can either:
		//
		// * modify the existing 'svg' rule:
		//
		//		svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
		//
		// * or add a new one:
		config.module
			.rule('cke-svg')
			.test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
			.use('raw-loader')
			.loader('raw-loader');

		// (2.) Transpile the .css files imported by the editor using PostCSS.
		// Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
		config.module
			.rule('cke-css')
			.test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
			.use('postcss-loader')
			.loader('postcss-loader')
			.tap(() => {
				return styles.getPostCssConfig({
					themeImporter: {
						themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
					},
					minify: true
				});
			});
	}
};