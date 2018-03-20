function searchPlayerByName(){

    var elem = document.getElementById('namePlayer');
    var elemName = elem.value;
    var cont = false;
    
    d3.csv("data/NBA_data.csv", function(error, data){
        for(k=0 ; k<data.length ; k++){
            if(data[k].Name == elemName){
                cont=true;
            }
        }
        if(cont){
            selectPlayer(elemName);
        }else{
            d3.select("#Centre").selectAll("table").remove();
        }
    });
    
}
