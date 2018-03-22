/**
* Script to search a team
**/

/**
* Search a team by its name 
* param: pro - decides if you are in pro or fan mode
**/
function searchTeamByName(pro){
    
    //Remove the error message
    d3.select("#Centre").select("#wrong").remove();

    //Get the name you enter
    var elem = document.getElementById('nameTeam');
    var elemName1 = elem.value;
    //Transform into uppercase
    var elemName = elemName1.toUpperCase();
    var dataTeam = ["Miami Heat", "Oklahoma City Thunder", "New York Knicks", "San Antonio Spurs"];
    var cont = false;
    
    for(k=0 ; k<dataTeam.length ; k++){
        //Compare with uppercase
        if(elemName == dataTeam[k].toUpperCase()){
            cont = true;
            var name = dataTeam[k];
        }
    }
    
    //Depends if the research is right
    if(cont){
        //Print the data of the team
        selectTeam(name,pro);
    }else{
        //Remove all the data and print an error message
        d3.select("#Centre").selectAll("svg").remove();
        d3.select("#Centre").append("p").text("Wrong research : please try again").attr("id","wrong");
    }
}