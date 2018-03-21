function searchTeamByName(){

    var elem = document.getElementById('nameTeam');
    var elemName1 = elem.value;
    var elemName = elemName1.toUpperCase();
    var dataTeam = ["Miami Heat", "Oklahoma City Thunder", "New York Knicks", "San Antonio Spurs"];
    var cont = false;
    
    for(k=0 ; k<dataTeam.length ; k++){
        if(elemName == dataTeam[k].toUpperCase()){
            cont = true;
            var name = dataTeam[k];
        }
    }
    
    if(cont){
        selectTeam(name);
    }else{
        d3.select("#Centre").selectAll("svg").remove();
    }
}