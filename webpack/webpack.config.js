const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const { FileListPlugin } = require("./plugin.js")
module.exports = {
	entry: {
		app: "./src/index.js",
		print: "./src/print.js",
	},
	devtool: "inline-source-map",
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new HtmlWebpackPlugin({
			title: "Output Management",
		}),
		new FileListPlugin({
			outputFile: "my-assets.md",
		}),
	],
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.txt$/,
				use: {
					loader: path.resolve(__dirname, "loader.js"),
					options,
				},
			},
		],
	},
}
