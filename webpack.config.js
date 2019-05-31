module.exports = {
    mode: "development",    
    entry: "./src/example/index.tsx",
    
    output: {
        filename: "[name].js",
        path: __dirname + "/dist/example/",
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
        ]
    },
};