const express = require("express");
const router = express.Router();
const app = express();
const tache_utils = require("./src/taches_utils");
const _ = require("lodash");
const port = 3000;

const { Client } = require("pg");
const taches_utils = require("./src/taches_utils");

client = taches_utils.connectToSQL()

app.use(express.urlencoded({ extended: true }));

app.use(express.static("css"));
app.use(express.static("src"));

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
    tache_utils.dbGetTasks(client, function(error, results, fields) {
        let html = tache_utils.ShowTasks(results);
        res.send(html);
    });
});

app.get("/get-tasks", (req, res) => {
    tache_utils.dbGetTasks(client, function(error, results, fields) {
        console.log("Get tasks", results.rows)
        res.json(results.rows);
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});