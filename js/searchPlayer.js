/**
* Script to search a player
**/

/**
* Search a player by his name 
* param: pro - decides if you are in pro or fan mode
**/
function searchPlayerByName(pro){
    
    //Remove the error message
    d3.select("#Centre").select("#wrong").remove();

    //Get the name you enter
    var elem = document.getElementById('namePlayer');
    var elemName1 = elem.value;
    //Transform into uppercase
    var elemName = elemName1.toUpperCase();
    var cont = false;
    
    d3.csv("data/NBA_data.csv", function(error, data){
        for(k=0 ; k<data.length ; k++){
            var toRun = data[k].Name;
            //Compare with uppercase
            if(toRun.toUpperCase() == elemName){
                cont=true;
                var name=data[k].Name;
            }
        }
        //Depends if the research is right
        if(cont){
            //Print the data of the player
            selectPlayer(name,pro);
        }else{
            //Remove all the data and print an error message
            d3.select("#Centre").selectAll("table").remove();
            d3.select("#Centre").append("p").text("Wrong research : please try again").attr("id","wrong");
        }
    });
    
}
