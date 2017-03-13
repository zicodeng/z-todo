var webpack = require("webpack");
var path = require("path");

var config = {
	context: __dirname,
    entry: {
		index: "./public/assets/react-components/index.jsx",
		todo: "./public/assets/react-components/todo.jsx"
	},

    output: {
        path: path.join(__dirname, "/public/dist"),
        filename: "[name]-bundle.js"
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
        extensions: [".js", ".jsx", ".css"]
    },

	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		// Make jQuery accessible to every React component
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	]
};

module.exports = config;
