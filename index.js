const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();

// Swagger設定
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express with Swagger デモ",
      version: "1.0.0",
      description: "Swaggerを使ってよいAPIライフを",
      contact: {
        name: "Yoshihiro Maeda",
        email: "yoshihiro.maeda.cc@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/books.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// API設定
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

// サーバリッスン
app.listen(3000, () => {
  console.log("Server running now");
});
