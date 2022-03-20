const express = require("express");
const router = express.Router();
const app = express();
const tache_utils = require("./taches_utils");
const _ = require("lodash");
// const utils = require("pg/lib/utils");
const port = 3000;

const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "WEBJS",
  password: "Azerty.123",
  port: 5432,
});

client.connect();

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.post("/creer-tache", (req, res) => {
  let tab_val = [req.body.tache, req.body.echeance];
  tache_utils.inserttask(tab_val, client);
  res.redirect('/liste-taches');
});

app.post("/completer-tache", (req, res) => {
  tache_utils.closetask(req.body.tachecomplete, client)
  res.redirect('/liste-taches');
});

app.get("/", (req, res) => {
  res.redirect('/liste-taches');
});

app.get("/liste-taches", (req, res) => {
  tache_utils.dbGetTasks(function (error, results, fields) {
    let html = tache_utils.ShowTasks(results);
    res.send(html);
  });
});

app.get("/get-data", (req, res) => {
  let personne = {age:30, ville:"Paris"}
  res.json(personne)
});

app.get("/get-tasks", (req, res) => {
  tache_utils.dbGetTasks(function (error, results, fields) {
    res.json(results.rows);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
