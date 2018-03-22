function searchPlayerByName(pro){
    
    d3.select("#Centre").select("#wrong").remove();

    var elem = document.getElementById('namePlayer');
    var elemName1 = elem.value;
    var elemName = elemName1.toUpperCase();
    var cont = false;
    
    d3.csv("data/NBA_data.csv", function(error, data){
        for(k=0 ; k<data.length ; k++){
            var toRun = data[k].Name;
            if(toRun.toUpperCase() == elemName){
                cont=true;
                var name=data[k].Name;
            }
        }
        if(cont){
            selectPlayer(name,pro);
        }else{
            d3.select("#Centre").selectAll("table").remove();
            d3.select("#Centre").append("p").text("Wrong research : please try again").attr("id","wrong");
        }
    });
    
}
