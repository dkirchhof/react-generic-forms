module.exports = {
    mode: "development",    
    entry: "./src/index.tsx",
    
    output: {
        filename: "[name].js",
        // chunkFilename: '[name]-[chunkhash].js',
        path: __dirname + "/dist/dev/",
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        // alias: {
        //     "react": "preact-compat",
        //     "react-dom": "preact-compat"
        // }
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    enforce: true
                },
            }
        },
        runtimeChunk: "single"
    }

    // externals: [nodeModules]
};