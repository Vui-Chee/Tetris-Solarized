import webpack from "webpack";
import { spawn } from "child_process";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";

const port = process.env.PORT || 1212;

module.exports = {
  entry: "./src/index.js",

  mode: "development",

  output: {
    publicPath: `http://localhost:${port}/dist`,
    filename: "index_bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.(mp3|png)$/,
        use: {
          loader: "file-loader",
        },
      },

      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
          },
        },
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
          },
        },
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/octet-stream",
          },
        },
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader",
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "image/svg+xml",
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ExternalsPlugin("commonjs", ["electron"]),
    new ESLintPlugin(),
  ],

  devServer: {
    port,
    hot: true,
    before() {
      if (process.env.START_HOT) {
        spawn("npm", ["run", "start-main-dev"], {
          shell: true,
          env: process.env,
          stdio: "inherit",
        })
          .on("close", (code) => process.exit(code))
          .on("error", (spawnError) => process.exit(spawnError.code));
      }
    },
  },
};
