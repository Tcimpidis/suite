const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	devtool: 'inline-source-map',
	output: {
	path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
	},
	devServer: {
		static: './dist',
	},
	module: {
		rules: [
			{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
			},
			{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
			},
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins:[
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new ModuleFederationPlugin({
			name: "microfrontend_remote",
			exposes: {
				"./microfrontend": "./src/microfrontend.tsx",
				"./routes": "./src/routes.tsx"
			},
			filename: "remoteEntry.js",
			shared: {
				...deps,
				react: {
					singleton: true,
					requiredVersion: deps.react,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: deps["react-dom"],
				},
			}
		}),
	],
};