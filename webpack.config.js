const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

let config = {
  context: path.resolve(__dirname, "src"),

  // Входной файл
  entry: [
    "./js/index.js"
  ],

  // Выходной файл
  output: {
    filename: "./js/bundle.js",
    clean: true
  },

  module: {
    rules: [
      // Транспилируем js с babel
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src/js"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          }
        }
      },

      // Компилируем SCSS в CSS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract css to separate file
          "css-loader", // translates CSS into CommonJS
          "postcss-loader", // parse CSS and add vendor prefixes to CSS rules
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ],
      },

      // Подключаем шрифты из css
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        generator: {
          filename: "./fonts/[name][ext]"
        }
      },

      // Подключаем картинки из css
      {
        test: /\.(svg|png|jpg|jpeg|webp)$/,
        generator: {
          filename: "./img/[name][ext]"
        }
      },
    ],
  },
  plugins: [
    // Подключаем файл html, стили и скрипты встроятся автоматически
    new HtmlWebpackPlugin({
      title: "WebCore — Финальный макет",
      template: "./index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      }
    }),

    // Кладем стили в отдельный файлик
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),

    // Копируем картинки
    new CopyWebpackPlugin({
      patterns: [
        { from: "./img", to: "img" }
      ]
    })
  ],
};

module.exports = (env, arg) => {
  // Source maps для удобства отладки
  if (arg.mode=="development")
    config.devtool="source-map";
  return config;
}
