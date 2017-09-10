module.exports = {
    context: __dirname + "/",
    entry: {
        index: ["./src/index.js"]
    },
    output: {
        path: __dirname,
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    plugins: ['transform-object-rest-spread'],
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};
