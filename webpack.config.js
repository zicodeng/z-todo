var webpack = require("webpack");
var path = require("path");

var config = {
	context: __dirname,
    entry: "./public/assets/react-components/app.jsx",

    output: {
        path: path.join(__dirname, "/public/dist"),
        filename: 'bundle.js'
    },

	watch: true,

    module: {
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                loaders: "babel-loader",
                exclude: /node_modules/,
				query: {
			        presets: ["es2015", "react"]
		        }
            },
			{
				test: /\.css$/,
		        loader: "style-loader!css-loader"
			}
        ]
    },

    resolve: {
        extensions: [".js", ".jsx"]
    },

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	]
};

module.exports = config;
