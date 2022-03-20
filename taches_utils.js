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
    console.log(err, res);
    console.log(`Tâche ${id} clôturée`);
  });
}

function dbGetTasks(fonction_traitement_resultat_bdd) {
  let connection = connectToSQL();
  let query =
    "SELECT id, tache, to_char(echeance, 'DD/MM/YYYY') as ech_txt FROM taches WHERE cloture = false ORDER BY echeance ";
  connection.query(query, fonction_traitement_resultat_bdd);
}

function HTMLTaskList(results) {
  let content_html=''
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

function ShowTasks(results) {
  console.log("nb de lignes affichées :" + results.rows.length);
  let content_html = `
  <html>
    <head>
      <style>
       /* palette (foncé vers clair)
       #051C24 / #003C57 / #007198 / #0594D0 / #04BBFF
       */
        body {
          background-image:url(time.jpg);
          }

        h1 {
          padding : 5px;
        }
        h1, h2, h3, h4 {
          text-align: center;
        }

        #bandeau_haut {
          background-color : #051C24;
          color : white;
          border-radius: 30px 30px 0px 0px;
          margin-top: 20px;
        }

        #bandeau_bas {
          background-color : #051C24;
          color : white;
          border-radius: 0px 0px 30px 30px;
          margin-bottom: 20px;
          text-align:right;
          width:100%;
        }

        #bloc_gauche {
          background-color: #003C57; 
          color: white;
        }

        #bloc_droit {
          background-color : #007198;
          color: white;
        }

        table.tasktable.table-striped > tbody > tr> td,
        table.tasktable {
        color:white;
        }     
        
        table.tasktable.table-striped>tbody>tr:nth-child(odd)>td,
          .table-striped>tbody>tr:nth-child(odd)>th {
              background-color: #007198
        }
/*
        table {
          width: 100%;
      }
*/      
      tbody td, thead th, tr {
          width: 20%
      }
/*
      tr {
        width:100%;
      }
*/
      tbody, thead {
        display: block;
        /* width:100%;  */
      }

      tbody {
          height:400px;
          overflow:auto;
        }

      </style>
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
        }
      </script>
    </head>
    <body onload="SetDate();">
      <div class="container">
        <div class="row">
          <div class="col-12" id="bandeau_haut"><h3>Interactive Task Manager</h3>
          </div>
        </div>
        <div class="row">
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
          <div class="col-4" id="bloc_droit">
            <div><h4>New Task</h4>
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
        </div> <!-- fin row inférieur -->
        <div class="row">
          <div class="col-12" id="bandeau_bas">
            <p>
            <div class="row">
            <div class="col-2">
            <button type="button" class="btn btn-secondary" id="buttoncat">Cats stuff<br>(api test)</button>
            </div>
            <div class="col-2">
            <button type="button" class="btn btn-secondary" id="buttontasks">Get tasks<br>(fetch)</button>
            </div>
            <div class="col-8">
            Copyright cybernaboo
            </div>
            </p>
          </div>
        </div> 
      </div> <!-- fin container -->
      <script>
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
          dd = '0' + dd;
        }

        if (mm < 10) {
          mm = '0' + mm;
        } 
            
        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("echeance").setAttribute("min", today);
        buttoncat=document.getElementById("buttoncat");
        buttoncat.onclick = function() {
          fetch("https://catfact.ninja/fact")
            .then(res => res.json())
            .then(data => {
              alert(data.fact)
            })
            .catch(error => console.log(error))
        };
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
</body>
  </html>`
  return content_html;
}

module.exports = {
  dbGetTasks: dbGetTasks,
  inserttask: inserttask,
  closetask: closetask,
  ShowTasks: ShowTasks,
  HTMLTaskList: HTMLTaskList,
};
