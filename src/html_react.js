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

function ShowTasks(results) {
    let html = `
        <body>
        <div class="container">
            <div class="row">
            <div class="col-12" id="bandeau_haut"><h3>Interactive Task Manager</h3>
            </div>
            </div>
            <div class="row">
            ${html_bloc_gauche(results)}
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
        </body>
        </script>
    `
}

