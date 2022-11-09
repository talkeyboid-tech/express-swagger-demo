# express-swagger-demo

Express サーバと Swagger のデモ。

# 使い方

## セットアップ

```
git clone <this repository>
npm install
```

## サーバ起動

```
npm run dev
```

Swagger UI へアクセス: http://localhost:3000/api-docs

## Swagger UI から API 実行

### POST 新しい書籍を登録

![post](https://user-images.githubusercontent.com/110523208/200860307-57ee696b-4e98-477f-a6be-1971e33eab20.gif)

### GET すべての書籍を取得

![getall](https://user-images.githubusercontent.com/110523208/200859598-5b3e8886-0c3e-4850-b6af-a912044721b0.gif)

### GET 特定の書籍を取得

![get](https://user-images.githubusercontent.com/110523208/200859592-ef3c3ad3-0632-4fcc-89f9-773f91f8749c.gif)

# このプロジェクトの作り方

## プロジェクト初期化

npm 初期設定＆インストール

```
npm init -y
npm install swagger-ui-express swagger-jsdoc
npm install -D nodemon
```

必要に応じて `package.json` を書き換え

## express 実装

```
touch index.js
mkdir routes
touch routes/books.js
```

コードの内容は当リポジトリファイルを参照

### 実装のポイント

bodyParser は最新の Express では不要。
また、`routes` を利用する場合はそれよりも上に書くこと。

> https://developer.mozilla.org/ja/docs/Learn/Server-side/Express_Nodejs/routes

```js
// 不要
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// こっちを使う
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ~~~~~~~~~~~~~~~~~~

const booksRouter = require("./routes/books");
app.use("/books", booksRouter);
```

Swagger UI から POST するときに body が送信されない問題が発生した（content-length=0）。
OpenAPI 3.0 からは `requestBody` を使用する。

> https://swagger.io/docs/specification/describing-request-body/

動かなかった記法

```yaml
post:
  summary: book登録
  description: bookオブジェクトを登録する
  parameters:
    - in: body
      name: body
      required: true
      schema:
        $ref: "#/components/schemas/Book"
```

ちゃんと動いた記法

```yaml
post:
  summary: book登録
  description: bookオブジェクトを登録する
  required: true
  requestBody:
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Book"
```
