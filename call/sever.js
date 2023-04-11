const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
app.use(cors());
app.use(express.json());

const setDB = mysql.createPool({
  host: "database" || process.env.DB_HOST,
  user: "root" || process.env.DB_USER,
  password: "412006" || process.env.DB_PASSWORD,
  database: "data" || process.env.DB_NAME,
  port: "3306" || process.env.DB_PORT
});

const key = 'kittiphum';
const jwt = require('jsonwebtoken');
const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');

app.get("/root", (req, res) => {
  const q = "SELECT * FROM multi";
  setDB.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/token/:pass", (req, res) => {
  const pass = req.params.pass;
  var token = jwt.sign({ admin: pass }, 'kittiphum');
  res.send(token);
});

function authen(req, res, next) {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) { return res.sendStatus(401) }
    if (jwt.verify(token, key).admin == 'arm') {
      return next();
    }
  } catch (error) {
    res.sendStatus(401)
  }
}

app.post("/push", authen, (req, res) => {
  const { id, fx, xl, xr } = req.body;
  const query = `INSERT INTO data.root (id, fx, xl, xr) VALUES (${id}, '${fx}', ${xl}, ${xr})`;
  setDB.query(query, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Data added successfully");
    }
  });
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.listen(8080, () => {
  console.log(`Start server at port 8080`);
});

module.exports = app