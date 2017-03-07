var webpack = require('webpack');
var path = require('path');

var config = {
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
                exclude: /node_modules/
            },
        ]
    },

    resolve: {
        extensions: [".jsx", ".js"]
    }
};

module.exports = config;
