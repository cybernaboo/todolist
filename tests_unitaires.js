const taches_utils = require("./taches_utils");

function test_HTMLTaskList(){
    results={
        rows: [
        {"id" : 15, "tache" : "test unitaire", "ech_txt" : "20-12-2022"},
        {"id" : 16, "tache" : "autre test unitaire", "ech_txt" : "20-12-2023"}
        ]}
    let sortie=taches_utils.HTMLTaskList(results)
    if (sortie.includes("<tr>") & sortie.includes("test unitaire") & sortie.includes("<td>")){
        console.log("Test fonction HTMLTaskList : OK")
    }else{
        console.log("Test fonction HTMLTaskList : KO")
    }
}

test_HTMLTaskList();