/*** webpack.config.js ***/

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/src/index.html"),
  filename: "./index.html",
});
const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  entry: [
    path.join(__dirname, "examples/src/index.js"),
    path.join(__dirname, "examples/src/scss/index.scss"),
  ],
  output: {
    path: path.join(__dirname, "examples/dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    htmlWebpackPlugin,
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },
  devServer: {
    port: 3000,
  },
};
