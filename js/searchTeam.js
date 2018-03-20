function searchTeamByName(){

    var elem = document.getElementById('nameTeam');
    var elemName = elem.value;
    var dataTeam = ["Miami Heat", "Oklahoma City Thunder", "New York Knicks", "San Antonio Spurs"];
    var cont = false;
    
    for(k=0 ; k<dataTeam.length ; k++){
        if(elemName == dataTeam[k]){
            cont = true;
        }
    }
    
    if(cont){
        selectTeam(elemName);
    }else{
        d3.select("#Centre").selectAll("svg").remove();
    }
}