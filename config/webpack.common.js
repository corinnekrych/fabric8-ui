/**
 * @author: @AngularClass
 */

// const webpack = require('webpack');
// const helpers = require('./helpers');
// const ngtools = require('@ngtools/webpack');
// const branding = require('./branding');
// var path = require('path');
// var stringify = require('json-stringify');
// const ngTools = require('@ngtools/webpack');
// /*
//  * Webpack Plugins
//  */
//
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// const StyleLintPlugin = require('stylelint-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
 * Webpack Constants
 */
// const HMR = helpers.hasProcessFlag('hot');
// const AOT = helpers.hasNpmFlag('aot');
//const METADATA = {
//   baseUrl: '/',
//   isDevServer: helpers.isWebpackDevServer(),
//   FABRIC8_BRANDING: process.env.FABRIC8_BRANDING || 'fabric8'
// };

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
// module.exports = function (options) {
//   const isProd = options.env === 'production';
//   const aotMode = false;//options && options.aot !== undefined;
//   console.log('The options from the webpack config: ' + stringify(options, null, 2));
//
//   const entry = {
//     vendor: './src/vendor.browser.ts',
//       polyfills: './src/polyfills.browser.ts',
//       main: './src/main.browser.ts'
//   };
//
//   var config = {
//
//     /*
//      * The entry point for the bundle
//      * Our Angular.js app
//      *
//      * See: https://webpack.js.org/configuration/entry-context/#entry
//      */
//     entry: entry,
//
//     /*
//      * Options affecting the resolving of modules.
//      *
//      * See: https://webpack.js.org/configuration/resolve
//      */
//     resolve: {
//
//       /**
//        * An array that automatically resolve certain extensions.
//        * Which is what enables users to leave off the extension when importing.
//        *
//        * See: https://webpack.js.org/configuration/resolve/#resolve-extensions
//        */
//       extensions: ['.ts', '.js', '.json']
//     },
//
//     /*
//      * Options affecting the normal modules.
//      *
//      * See: http://webpack.github.io/docs/configuration.html#module
//      */
//     module: {
//
//       rules: [
//
//         {
//           test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
//           loader: '@ngtools/webpack',
//           exclude: [/\.(spec|e2e)\.ts$/]
//         },
//
//         /**
//          * Static analysis linter for TypeScript advanced options configuration
//          * Description: An extensible linter for the TypeScript language.
//          *
//          * See: https://github.com/wbuchwalter/tslint-loader
//          */
//         // {
//         //   test: /\.ts$/,
//         //   enforce: 'pre',
//         //   loader: 'tslint-loader',
//         //   exclude: [
//         //     /node_modules/,
//         //     /src\/a-runtime-console/
//         //   ],
//         //   options: {
//         //   //   configuration: {
//         //   //     rules: {
//         //   //       quotemark: [true, 'double']
//         //   //     }
//         //   //   },
//         //   //
//         //     // can specify a custom config file relative to current directory or with absolute path
//         //     // 'tslint-custom.json'
//         //     configFile: "tslint.json",
//         //
//         //     // tslint errors are displayed by default as warnings
//         //     // set emitErrors to true to display them as errors
//         //     emitErrors: true,
//         //
//         //     // tslint does not interrupt the compilation by default
//         //     // if you want any file with tslint errors to fail
//         //     // set failOnHint to true
//         //     failOnHint: true,
//         //
//         //     // enables type checked rules like 'for-in-array'
//         //     // uses tsconfig.json from current working directory
//         //     typeCheck: false,
//         //
//         //     // automatically fix linting errors
//         //     fix: false,
//         //
//         //     // can specify a custom tsconfig file relative to current directory or with absolute path
//         //     // to be used with type checked rules
//         //     tsConfigFile: 'tsconfig.json',
//         //
//         //     // path to directory containing formatter (optional)
//         //     formattersDirectory: 'node_modules/tslint-loader/formatters/',
//         //
//         //     // name of your formatter (optional)
//         //     formatter: 'custom',
//         //
//         //     // These options are useful if you want to save output to files
//         //     // for your continuous integration server
//         //     fileOutput: {
//         //       // The directory where each file's report is saved
//         //       dir: './lint/',
//         //
//         //       // The extension to use for each report's filename. Defaults to 'txt'
//         //       ext: 'xml',
//         //
//         //       // If true, all files are removed from the report directory at the beginning of run
//         //       clean: true,
//         //
//         //       // A string to include at the top of every report file.
//         //       // Useful for some report formats.
//         //       header: '<?xml version="1.0" encoding="utf-8"?>\n<checkstyle version="5.7">',
//         //
//         //       // A string to include at the bottom of every report file.
//         //       // Useful for some report formats.
//         //       footer: '</checkstyle>'
//         //     }
//         //   }
//         // },
//
//
//         /*
//          * Json loader support for *.json files.
//          *
//          * See: https://github.com/webpack/json-loader
//          */
//         {
//           test: /\.json$/,
//           use: ['json-loader']
//         },
//
//         /* HTML Linter
//          * Checks all files against .htmlhintrc
//         */
//         {
//           enforce: 'pre',
//           test: /\.html$/,
//           loader: 'htmlhint-loader',
//           exclude: [/node_modules/,/src\/a-runtime-console/],
//           options: {
//             configFile: './.htmlhintrc'
//           }
//         },
//
//         /* Raw loader support for *.html
//          * Returns file content as string
//          *
//          * See: https://github.com/webpack/raw-loader
//          */
//         {
//           test: /\.html$/,
//           use: ['html-loader']
//         },
//         {
//           test: /^(?!.*component).*\.css$/,
//           include: helpers.root('src', 'app'),
//           use: ['raw-loader', 'postcss-loader']
//         },
//         {
//           test: /\.component\.css$/,
//           include: helpers.root('src', 'app'),
//           use: ['raw-loader', 'postcss-loader']
//         },
//         {
//           test: /^(?!.*component).*\.less$/,
//           exclude: helpers.root('src', 'app'),
//           use: [
//             MiniCssExtractPlugin.loader,
//             { loader: 'css-loader', options: { sourceMap: true}},
//             'postcss-loader',
//             'resolve-url-loader',
//             { loader: 'less-loader', options: {
//                 paths: [
//                   path.resolve(__dirname, "../node_modules/patternfly/dist/less"),
//                   path.resolve(__dirname, "../node_modules/patternfly/dist/less/dependencies"),
//                   path.resolve(__dirname, "../node_modules/patternfly/dist/less/dependencies/bootstrap"),
//                   path.resolve(__dirname, "../node_modules/patternfly/dist/less/dependencies/font-awesome"),
//                 ],
//                 sourceMap: true
//               }
//             }
//           ]
//         },
//         {
//           test: /\.component\.less$/,
//           exclude: helpers.root('src', 'app'),
//           use: [
//             MiniCssExtractPlugin.loader,
//             { loader: 'css-loader', options: { sourceMap: true}},
//             'postcss-loader',
//             'resolve-url-loader',
//             { loader: 'less-loader', options: {
//                 paths: [
//                   path.resolve(__dirname, "../node_modules/patternfly/dist/less"),
//                   path.resolve(__dirname, "../node_modules/patternfly/dist/less/dependencies"),
//                   path.resolve(__dirname, "../node_modules/patternfly/dist/less/dependencies/bootstrap"),
//                   path.resolve(__dirname, "../node_modules/patternfly/dist/less/dependencies/font-awesome"),
//                 ],
//                 sourceMap: true
//               }
//             }
//           ]
//         },
//
//         /**
//          * File loader for supporting fonts, for example, in CSS files.
//          */
//         {
//           test: /\.(woff2|woff|ttf|eot|svg)$/,
//           use: {
//             loader: 'url-loader',
//             query: {
//               limit: 3000,
//               includePaths: [
//                 path.resolve(__dirname, "../node_modules/patternfly/dist/fonts/")
//               ],
//               name: '_assets/fonts/[name]' + (isProd ? '.[hash]' : '') + '.[ext]'
//             }
//           },
//           exclude: path.resolve(__dirname, "../src/assets/images/")
//         },
//         {
//           test: /\.(jpg|png|svg|gif|jpeg)$/,
//           use: {
//             loader: 'url-loader',
//             query: {
//               limit: 3000,
//               includePaths: [
//                 path.resolve(__dirname, "../src/assets/images/")
//               ],
//               name: '_assets/images/[name]' + (isProd ? '.[hash]' : '') + '.[ext]'
//             }
//           },
//           exclude: path.resolve(__dirname, "../node_modules/patternfly/dist/fonts/")
//         }
//       ]
//     },
//
//     /*
//      * Add additional plugins to the compiler.
//      *
//      * See: http://webpack.github.io/docs/configuration.html#plugins
//      */
//     plugins: [
//       new ngTools.AngularCompilerPlugin({
//         mainPath: entry.main,
//         tsConfigPath: 'tsconfig.json',
//         sourceMap: true,
//         skipCodeGeneration: true
//       }),
//
//
//       /*
//        * Plugin: CopyWebpackPlugin
//        * Description: Copy files and directories in webpack.
//        *
//        * Copies project static assets.
//        *
//        * See: https://www.npmjs.com/package/copy-webpack-plugin
//        */
//        /*
//        * this needs to be redirected to reside in the _assets/ directory
//        */
//       new CopyWebpackPlugin([
//         {
//           from: 'src/meta'
//         }
//       ]),
//
//       /*
//        * Plugin: HtmlWebpackPlugin
//        * Description: Simplifies creation of HTML files to serve your webpack bundles.
//        * This is especially useful for webpack bundles that include a hash in the filename
//        * which changes every compilation.
//        *
//        * See: https://github.com/ampedandwired/html-webpack-plugin
//        */
//       new HtmlWebpackPlugin({
//         template: 'src/index.ejs',
//         title: branding.assets[METADATA.FABRIC8_BRANDING].title.prefix,
//         chunksSortMode: function (a, b) {
//           const entryPoints = ["manifest", "polyfills", "vendor", "main"];
//           return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
//         },
//         metadata: METADATA
//       }),
//
//       /*
//        * Plugin: ScriptExtHtmlWebpackPlugin
//        * Description: Enhances html-webpack-plugin functionality
//        * with different deployment options for your scripts including:
//        *
//        * See: https://github.com/numical/script-ext-html-webpack-plugin
//        */
//       new ScriptExtHtmlWebpackPlugin({
//         sync: /inline|polyfills|vendor/,
//         defaultAttribute: 'async',
//         preload: [/polyfills|vendor|main/],
//         prefetch: [/chunk/]
//       }),
//
//       /*
//        * Plugin LoaderOptionsPlugin (experimental)
//        *
//        * See: https://gist.github.com/sokra/27b24881210b56bbaff7
//        */
//       new LoaderOptionsPlugin({}),
//
//       new webpack.IgnorePlugin(/^\.\/locale$/, /[^-]moment$/),
//
//       /*
//        * StyleLintPlugin
//       */
//       new StyleLintPlugin({
//         configFile: '.stylelintrc',
//         syntax: 'less',
//         context: 'src',
//         files: '**/*.less',
//         lintDirtyModulesOnly: false,
//         failOnError: false,
//         emitErrors: true,
//         quiet: false
//       })
//     ],
//
//     /*
//      * Include polyfills or mocks for various node stuff
//      * Description: Node configuration
//      *
//      * See: https://webpack.github.io/docs/configuration.html#node
//      */
//     node: {
//       global: true,
//       crypto: 'empty',
//       process: true,
//       module: false,
//       clearImmediate: false,
//       setImmediate: false
//     }
//   };
//
//   if (aotMode) {
//     config.plugins.push(new ngtools.AotPlugin({
//       tsConfigPath: 'tsconfig-aot.json'
//       // entryModule: './src/app/app.module#AppModule',
//       // genDir: './src/aot'
//     }));
//   }
//
//   return config;
// };

const webpack = require('webpack');
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
//const GitRevisionPlugin = require('git-revision-webpack-plugin')

const ngcWepack = require('ngc-webpack');
const ngTools = require('@ngtools/webpack');

module.exports = function ({ env, metadata }) {
  //const gitRevisionPlugin = new GitRevisionPlugin();
  const isProd = env === 'production';
  // const entry = {
  //   polyfills: './src/polyfills.ts',
  //   vendor: './src/vendor.ts',
  //   main:      './src/main.ts',
  // };
  const entry = {
    vendor: './src/vendor.browser.ts',
    polyfills: './src/polyfills.browser.ts',
    main: './src/main.browser.ts'
  };
  return {
    entry: entry,
    resolve: {
      //mainFields: ['browser', 'module', 'main' ],
      extensions: ['.ts', '.js', '.json'],
      //modules: [helpers.root('src'), helpers.root('node_modules')]
    },
    module: {

      rules: [
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack'
        },
        {
          test: /\.css$/,
          exclude: helpers.root('src', 'app'),
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: true}},
            'postcss-loader',
          ],
        },

        {
          test: /\.css$/,
          include: helpers.root('src', 'app'),
          use: ['raw-loader', 'postcss-loader'],
        },

        {
          test: /\.less$/,
          exclude: helpers.root('src', 'app'),
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: true}},
            'postcss-loader',
            'resolve-url-loader',
            { loader: 'less-loader', options: { sourceMap: true}}
          ],
        },

        {
          test: /\.less$/,
          include: helpers.root('src', 'app'),
          use: [
            'to-string-loader',
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[hash].[ext]',
              }
            }
          ]
        }
      ],

    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'ENV': JSON.stringify(metadata.ENV),
          'NODE_ENV': JSON.stringify(metadata.ENV),
          'PUBLIC_PATH' : JSON.stringify(metadata.PUBLIC_PATH),
          // 'LAUNCHER_FRONTEND_COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
          // 'LAUNCHER_BACKEND_URL' : JSON.stringify(metadata.LAUNCHER_BACKEND_URL),
          // 'LAUNCHER_KEYCLOAK_URL' : JSON.stringify(metadata.LAUNCHER_KEYCLOAK_URL),
          // 'LAUNCHER_KEYCLOAK_REALM' : JSON.stringify(metadata.LAUNCHER_KEYCLOAK_REALM),
          // 'LAUNCHER_KEYCLOAK_CLIENT_ID': JSON.stringify(metadata.LAUNCHER_KEYCLOAK_CLIENT_ID),
          // 'LAUNCHER_FRONTEND_SENTRY_DSN': JSON.stringify(metadata.LAUNCHER_FRONTEND_SENTRY_DSN)
        }
      }),
      new ngTools.AngularCompilerPlugin({
        mainPath: entry.main,
        tsConfigPath: 'tsconfig.json',
        sourceMap: true,
        skipCodeGeneration: true
      }),
      // new ngcWepack.NgcWebpackPlugin({
      //   mainPath: entry.main,
      //   tsConfigPath: 'tsconfig.json',
      //   sourceMap: true,
      //   skipCodeGeneration: true
      // }),
      new MiniCssExtractPlugin({ filename: '[name]-[chunkhash].css' }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: function (a, b) {
          const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
          return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
        },
        minify: isProd ? {
          caseSensitive: true,
          collapseWhitespace: true,
          keepClosingSlash: true
        } : false
      }),
      new ScriptExtHtmlWebpackPlugin({
        sync: /inline|polyfills|vendor/,
        defaultAttribute: 'async',
        preload: [/polyfills|vendor|main/],
        prefetch: [/chunk/]
      }),
      new LoaderOptionsPlugin({}),
    ],
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
};
