const express = require("express");
const router = express.Router();

// const bodyParser = require("body-parser");
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

const bookList = [
  { id: 1, name: "本1", author: "著者1" },
  { id: 2, name: "本2", author: "著者2" },
  { id: 3, name: "本3", author: "著者3" },
];

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Book:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: 書籍名
 *            example: 本1
 *          author:
 *            type: string
 *            description: 著者名
 *            example: 著者1
 */

/**
 *  @swagger
 *  /books:
 *    get:
 *      summary: book一覧取得
 *      description: book一覧を取得する
 *      responses:
 *        200:
 *          description: 成功時
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Book'
 *    post:
 *      summary: book登録
 *      description: bookオブジェクトを登録する
 *      required: true
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 * */
router.post("/", (req, res) => {
  const reqBody = req.body;
  let maxId = 0;
  bookList.forEach((elem) => {
    if (elem.id > maxId) maxId = elem.id;
  });
  reqBody.id = maxId + 1;
  bookList.push(reqBody);
  res.status(200).end();
});
router.get("/", function (_, res) {
  res.json(bookList);
});

/**
 *  @swagger
 *  /books/{id}:
 *    get:
 *      summary: book取得
 *      description: idを指定しbookを取得する
 *      parameters:
 *      - name: id
 *        in: path
 *      responses:
 *        200:
 *          description: 成功時
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Book'
 */
router.get("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const retBookArr = bookList.filter((elem) => elem.id === bookId);
  res.json(retBookArr[0]);
});

module.exports = router;
