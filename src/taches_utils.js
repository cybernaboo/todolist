const { Client } = require("pg");

function connectToSQL() {
    const connection = new Client({
        user: "postgres",
        host: "localhost",
        database: "WEBJS",
        password: "Azerty.123",
        port: 5432,
    });
    connection.connect();
    return connection;
}

function inserttask(tab_val, client) {
    let cmdsql = `insert into taches (tache, echeance) values($1,$2)`;
    client.query(cmdsql, tab_val, (err, res) => {
        console.log(err, res);
        console.log("Création tâche ok");
    });
}

function closetask(id, client) {
    let cmdsql = `update taches set cloture=true where id=${id}`;
    client.query(cmdsql, (err, res) => {
        console.log(`Tâche ${id} clôturée`);
    });
}

function dbGetTasks(client, fonction_traitement_resultat_bdd) {
    let query =
        "SELECT id, tache, to_char(echeance, 'DD/MM/YYYY') as ech_txt FROM taches WHERE cloture = false ORDER BY echeance ";
    client.query(query, fonction_traitement_resultat_bdd);
}

function HTMLTaskList(results) {
    let content_html = ''
    for (i = 0; i < results.rows.length; i++) {
        content_html =
            content_html +
            `
          <tr>
            <td>${results.rows[i]["id"]}</td>
            <td>${results.rows[i]["tache"]}</td>
            <td>${results.rows[i]["ech_txt"]}</td>
          </tr>
          `;
    }
    return content_html
}

function html_js() {
    let content_html = `
        <script type="text/javascript">
        function SetDate() {
          var date = new Date();
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();

          if (month < 10) month = "0" + month;
          if (day < 10) day = "0" + day;
          var today = year + "-" + month + "-" + day;

          document.getElementById("echeance").value = today;
          document.getElementById("echeance").setAttribute("min", today);
        }
        buttontasks=document.getElementById("buttontasks");
        buttontasks.onclick = function() {
          fetch("http://localhost:3000/get-tasks")
            .then(res => res.json())
            .then(data => {
              alert(JSON.stringify(data))
            })
            .catch(error => console.log(error))
        };  
      </script>
      `
    return content_html
}

function html_head() {
    let content_html = `
        <link href="/style_taches.css" rel="stylesheet">
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossorigin="anonymous"
        ></script>
        `
    return content_html
}

function html_bloc_gauche(results) {
    let content_html = `
        <div class="col-8" id="bloc_gauche">
          <div><h4>Task List</h4>
          </div>
          <table class="table tasktable table-striped table-responsive">
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              ${HTMLTaskList(results)}
            </tbody>
          </table>
        </div> <!-- bloc gauche -->
        `
    return content_html
}

function html_bloc_droit() {
    let content_html = `
        <div class="col-4" id="bloc_droit">
          <div><h4>Task creation & completion</h4>
          </div>
          <form
            class="form"
            method="POST"
            action="/creer-tache"
            enctype="application/x-www-form-urlencoded"
          >
            <label for="tache">Task description</label>
            <div class="input-group">
              <input
                type="text"
                class="form-control input-lg"
                id="tache"
                aria-describedby="basic-addon3"
                name="tache"
                required
              />
            </div>
            <br />
            <label for="echeance">Deadline</label>
            <div class="input-group">
              <input
                type="date"
                class="form-control input-lg"
                id="echeance"
                placeholder="jj/mm/aaaa"
                aria-describedby="basic-addon3"
                name="echeance"
                required
                min="2022-01-01"
              />
            </div>
            <br />
            <input type="submit" value="Create Task" />
          </form>
          <div id="taskcomplete">
            <form
              class="form"
              method="POST"
              action="/completer-tache"
              enctype="application/x-www-form-urlencoded"
              >
              <label for="tachetocomplete">Task to complete</label>
                    <input
                  type="text"
                  class="form-control input-lg"
                  id="tachecomplete"
                  aria-describedby="basic-addon3"
                  name="tachecomplete"
                />
              <br>
              <input type="submit" value="Complete Task" />
            </form>
          </div> <!-- fin bloc task complete -->
        </div> <!-- fin bloc droit -->
    `
    return content_html
}

function ShowTasks(results) {
    console.log("nb de lignes affichées :" + results.rows.length);
    let content_html = `
  <html>
    <head>
      ${html_head()}
    </head>
    <body onload="SetDate();">
      <div class="container">
        <div class="row">
          <div class="col-12" id="bandeau_haut"><h3>Interactive Task Manager</h3>
          </div>
        </div>
        <div class="row">
          ${html_bloc_gauche(results)}
          ${html_bloc_droit()}
          </div> <!-- fin row inférieur -->
        <div class="row">
          <div class="col-12" id="bandeau_bas">
            <p>
            <div class="row">
            <div class="col-2">
            <button type="button" class="btn btn-secondary" id="buttontasks">Get tasks<br>(fetch)</button>
            </div>
            <div class="col-10">
            Copyright cybernaboo
            </div>
            </p>
          </div>
        </div> 
      </div> <!-- fin container -->
      ${html_js()}
    </body>
  </html>`
    return content_html;
}

module.exports = {
    connectToSQL: connectToSQL,
    dbGetTasks: dbGetTasks,
    inserttask: inserttask,
    closetask: closetask,
    ShowTasks: ShowTasks,
    HTMLTaskList: HTMLTaskList,
};