/**
* Script with all the functions called in team.html and team_pro.html
**/


/**
* Function addDataTeamCompare(id) : 
* return the list of teams in pro mode
* param : id, the id of the section
**/
function addDataTeamCompare(id){
    var dataTeam = ["Miami Heat", "Oklahoma City Thunder", "New York Knicks", "San Antonio Spurs"];
                        d3.select("#blocNavElementList"+id).selectAll("p")
                                .data(dataTeam)
                                .enter()
                                .append("p")                            
                                .text(function(d){return d ;})
                                .attr("onclick",function(d){return "selectTeam('" + d +"',1,"+id+");";})
                                .style("margin", "0") 
                                .style("font-size", "15px");
}

/**
* Function iqr(k) :
* return a function to compute the interquartile range
* param : k, the scale to drawn
**/
function iqr(k) {
    return function(d, i) {
        var q1 = d.quartiles[0],
            q3 = d.quartiles[2],
            iqr = (q3 - q1) * k,
            i = -1,
            j = d.length;
            while (d[++i] < q1 - iqr);
            while (d[--j] > q3 + iqr);
            return [i, j];
    };
}

/**
* Function selectTeam(elemID,pro,id) : 
* return the data of the selected team
* param : elemID, the id in html of the team
* param : pro, 0 if fan mode, 1 if pro mode
* param : id, the id of the section
**/
function selectTeam(elemID,pro,id){
    
    //Remove the error message
    d3.select("#Centre"+id).select("#wrong").remove();
    //Remove all the previous search
    d3.select("#Centre"+id).selectAll("svg").remove();
	
    //Print boxplot with goals : different number of data if pro or fan mode activated
    
        d3.csv("data/NBA_data.csv", function(error, csv) {
            var labels = true; // show the text labels beside individual boxplots?
            var margin = {top: 30, right: 100, bottom: 70, left: 100};
            var  width = 600 - margin.left - margin.right;
            var height = 400 - margin.top - margin.bottom;	
            var min = Infinity,
                max = -Infinity;
            var dataset = [];
            for (var i = 0; i < csv.length; i++){
                if (csv[i].Team == elemID){;
                    dataset.push(csv[i]);
                }
            }               
            var col1 = ['Fields goals made','Three points made','Free throws made'];
            var data1 = [];
            for(i=0 ; i<col1.length ; i++){
                data1[i] = [];
            }
            for(j=0 ; j<col1.length ; j++){
                data1[j][0] = col1[j];
            }
            for(k=0 ; k<col1.length ; k++){
                data1[k][1] = [];
            }
            dataset.forEach(function(x) {
                var v1 = Math.floor(x.Fields_goals_made),
                    v2 = Math.floor(x.Three_pts_FGM),
                    v3 = Math.floor(x.Free_throws_made);
			
                var rowMax1 = Math.max(v1, Math.max(v2, v3));
                var rowMin1 = Math.min(v1, Math.min(v2, v3));

                data1[0][1].push(v1);
                data1[1][1].push(v2);
                data1[2][1].push(v3);
		 
                if (rowMax1 > max) max = rowMax1;
                if (rowMin1 < min) min = rowMin1;	
            });
  
            var chart = d3.box()
                      .whiskers(iqr(1.5))
                      .height(height)	
                      .domain([min, max])
                      .showLabels(labels);

            var svg = d3.select("#Centre"+id).append("svg")
                                   .attr("width", width + margin.left + margin.right)
                                   .attr("height", height + margin.top + margin.bottom)
                                   .attr("class", "box")    
                                   .append("g")
                                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var x = d3.scale.ordinal()	   
            .domain( data1.map(function(d) { console.log(d); return d[0] } ) )	    
            .rangeRoundBands([0 , width], 0.7, 0.3); 		

            var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

            var y = d3.scale.linear()
            .domain([min, max])
            .range([height + margin.top, 0 + margin.top]);
	
            var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

            svg.selectAll(".box")	   
            .data(data1)
            .enter().append("g")
            .attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
            .call(chart.width(x.rangeBand())); 
	
            svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 0 + (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "18px")  
            .text("Throws from the team : " + elemID);
 
            svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text") // and text1
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("font-size", "16px") 
            .text("Number of throws per player match played");		
	
            svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
            .call(xAxis)
            .append("text")            
            .attr("x", (width / 2) )
            .attr("y",  10 )
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .style("font-size", "16px"); 
        });
    
    
    //Boxplot with Salary
    d3.csv("data/NBA_data.csv", function(error, csv) {

        var labels = true; // show the text labels beside individual boxplots?
        var margin = {top: 30, right: 100, bottom: 70, left: 100};
        var  width = 600 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;
        var min = Infinity,
            max = -Infinity;
        var dataset = [];
        for (var i = 0; i < csv.length; i++){
                if (csv[i].Team == elemID){;
                    dataset.push(csv[i]);
                }
        }
        var col1 = ['Salary'];
        var data1 = [];
        for(i=0 ; i<col1.length ; i++){
            data1[i] = [];
        }
        for(j=0 ; j<col1.length ; j++){
            data1[j][0] = col1[j];
        }
        for(k=0 ; k<col1.length ; k++){
            data1[k][1] = [];
        }
        dataset.forEach(function(x) {
            var v1 = Math.floor(x.Salary);
			
            var rowMax1 = Math.max(v1);
            var rowMin1 = Math.min(v1);

            data1[0][1].push(v1);
		 
            if (rowMax1 > max) max = rowMax1;
            if (rowMin1 < min) min = rowMin1;	
        });
  
        var chart = d3.box()
                      .whiskers(iqr(1.5))
                      .height(height)	
                      .domain([min, max])
                      .showLabels(labels);
                      

        var svg = d3.select("#Centre"+id).append("svg")
                                   .attr("width", width + margin.left + margin.right)
                                   .attr("height", height + margin.top + margin.bottom)
                                   .attr("class", "box")    
                                   .append("g")
                                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.ordinal()	   
		.domain( data1.map(function(d) { console.log(d); return d[0] } ) )	    
		.rangeRoundBands([0 , width], 0.7, 0.3); 		

        var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

        var y = d3.scale.linear()
		.domain([min, max])
		.range([height + margin.top, 0 + margin.top]);
	
        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        svg.selectAll(".box")	   
        .data(data1)
        .enter().append("g")
		.attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
        .call(chart.width(x.rangeBand())); 
	
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "18px")  
        .text("Salary from the team: " + elemID);
 
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.append("text") // and text1
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .style("font-size", "16px") 
		  .text("Salary in $");		
	
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
        .append("text")            
        .attr("x", (width / 2) )
        .attr("y",  10 )
		.attr("dy", ".71em")
        .style("text-anchor", "middle")
		.style("font-size", "16px"); 
    });
    
    //Boxplot with Age
    d3.csv("data/NBA_data.csv", function(error, csv) {

        var labels = true; // show the text labels beside individual boxplots?
        var margin = {top: 30, right: 100, bottom: 70, left: 100};
        var  width = 600 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;
        var min = Infinity,
            max = -Infinity;
        var dataset = [];
        for (var i = 0; i < csv.length; i++){
                if (csv[i].Team == elemID){;
                    dataset.push(csv[i]);
                }
        }
        var col1 = ['Age'];
        var data1 = [];
        for(i=0 ; i<col1.length ; i++){
            data1[i] = [];
        }
        for(j=0 ; j<col1.length ; j++){
            data1[j][0] = col1[j];
        }
        for(k=0 ; k<col1.length ; k++){
            data1[k][1] = [];
        }
        dataset.forEach(function(x) {
            var v1 = Math.floor(x.Age);
			
            var rowMax1 = Math.max(v1);
            var rowMin1 = Math.min(v1);

            data1[0][1].push(v1);
		 
            if (rowMax1 > max) max = rowMax1;
            if (rowMin1 < min) min = rowMin1;	
        });
  
        var chart = d3.box()
                      .whiskers(iqr(1.5))
                      .height(height)	
                      .domain([min, max])
                      .showLabels(labels);
                      

        var svg = d3.select("#Centre"+id).append("svg")
                                   .attr("width", width + margin.left + margin.right)
                                   .attr("height", height + margin.top + margin.bottom)
                                   .attr("class", "box")    
                                   .append("g")
                                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.ordinal()	   
		.domain( data1.map(function(d) { console.log(d); return d[0] } ) )	    
		.rangeRoundBands([0 , width], 0.7, 0.3); 		

        var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

        var y = d3.scale.linear()
		.domain([min, max])
		.range([height + margin.top, 0 + margin.top]);
	
        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        svg.selectAll(".box")	   
        .data(data1)
        .enter().append("g")
		.attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
        .call(chart.width(x.rangeBand())); 
	
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "18px")  
        .text("Ages: " + elemID);
 
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.append("text") // and text1
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .style("font-size", "16px") 
		  .text("Ages (years old)");		
	
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
        .append("text")            
        .attr("x", (width / 2) )
        .attr("y",  10 )
		.attr("dy", ".71em")
        .style("text-anchor", "middle")
		.style("font-size", "16px"); 
    });
    
    //Boxplot with Height
    d3.csv("data/NBA_data.csv", function(error, csv) {

        var labels = true; // show the text labels beside individual boxplots?
        var margin = {top: 30, right: 100, bottom: 70, left: 100};
        var  width = 600 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;
        var min = Infinity,
            max = -Infinity;
        var dataset = [];
        for (var i = 0; i < csv.length; i++){
                if (csv[i].Team == elemID){;
                    dataset.push(csv[i]);
                }
        }
        var col1 = ['Height'];
        var data1 = [];
        for(i=0 ; i<col1.length ; i++){
            data1[i] = [];
        }
        for(j=0 ; j<col1.length ; j++){
            data1[j][0] = col1[j];
        }
        for(k=0 ; k<col1.length ; k++){
            data1[k][1] = [];
        }
        dataset.forEach(function(x) {
            var v1 = x.Height;
			
            var rowMax1 = Math.max(v1);
            var rowMin1 = Math.min(v1);

            data1[0][1].push(v1);
		 
            if (rowMax1 > max) max = rowMax1;
            if (rowMin1 < min) min = rowMin1;	
        });
  
        var chart = d3.box()
                      .whiskers(iqr(1.5))
                      .height(height)	
                      .domain([min, max])
                      .showLabels(labels);
                      

        var svg = d3.select("#Centre"+id).append("svg")
                                   .attr("width", width + margin.left + margin.right)
                                   .attr("height", height + margin.top + margin.bottom)
                                   .attr("class", "box")    
                                   .append("g")
                                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.ordinal()	   
		.domain( data1.map(function(d) { console.log(d); return d[0] } ) )	    
		.rangeRoundBands([0 , width], 0.7, 0.3); 		

        var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

        var y = d3.scale.linear()
		.domain([min, max])
		.range([height + margin.top, 0 + margin.top]);
	
        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        svg.selectAll(".box")	   
        .data(data1)
        .enter().append("g")
		.attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
        .call(chart.width(x.rangeBand())); 
	
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "18px")  
        .text("Height: " + elemID);
 
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.append("text") // and text1
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .style("font-size", "16px") 
		  .text("Height (in meters)");		
	
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
        .append("text")            
        .attr("x", (width / 2) )
        .attr("y",  10 )
		.attr("dy", ".71em")
        .style("text-anchor", "middle")
		.style("font-size", "16px");
    });
    
    //Boxplot with Weight
    d3.csv("data/NBA_data.csv", function(error, csv) {

        var labels = true; // show the text labels beside individual boxplots?
        var margin = {top: 30, right: 100, bottom: 70, left: 100};
        var  width = 600 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;
        var min = Infinity,
            max = -Infinity;
        var dataset = [];
        for (var i = 0; i < csv.length; i++){
                if (csv[i].Team == elemID){;
                    dataset.push(csv[i]);
                }
        }
        var col1 = ['Weight'];
        var data1 = [];
        for(i=0 ; i<col1.length ; i++){
            data1[i] = [];
        }
        for(j=0 ; j<col1.length ; j++){
            data1[j][0] = col1[j];
        }
        for(k=0 ; k<col1.length ; k++){
            data1[k][1] = [];
        }
        dataset.forEach(function(x) {
            var v1 = Math.floor(x.Weight);
			
            var rowMax1 = Math.max(v1);
            var rowMin1 = Math.min(v1);

            data1[0][1].push(v1);
		 
            if (rowMax1 > max) max = rowMax1;
            if (rowMin1 < min) min = rowMin1;	
        });
  
        var chart = d3.box()
                      .whiskers(iqr(1.5))
                      .height(height)	
                      .domain([min, max])
                      .showLabels(labels);
                      

        var svg = d3.select("#Centre"+id).append("svg")
                                   .attr("width", width + margin.left + margin.right)
                                   .attr("height", height + margin.top + margin.bottom)
                                   .attr("class", "box")    
                                   .append("g")
                                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.ordinal()	   
		.domain( data1.map(function(d) { console.log(d); return d[0] } ) )	    
		.rangeRoundBands([0 , width], 0.7, 0.3); 		

        var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

        var y = d3.scale.linear()
		.domain([min, max])
		.range([height + margin.top, 0 + margin.top]);
	
        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        svg.selectAll(".box")	   
        .data(data1)
        .enter().append("g")
		.attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
        .call(chart.width(x.rangeBand())); 
	
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "18px")  
        .text("Weight: " + elemID);
 
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.append("text") // and text1
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .style("font-size", "16px") 
		  .text("Weight in kg");		
	
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
        .append("text")            
        .attr("x", (width / 2) )
        .attr("y",  10 )
		.attr("dy", ".71em")
        .style("text-anchor", "middle")
		.style("font-size", "16px"); 
    });
    
    //Boxplot with games played
    d3.csv("data/NBA_data.csv", function(error, csv) {
        var labels = true; // show the text labels beside individual boxplots?
        var margin = {top: 30, right: 100, bottom: 70, left: 100};
        var  width = 600 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;	
        var min = Infinity,
            max = -Infinity;
        var dataset = [];
        for (var i = 0; i < csv.length; i++){
                if (csv[i].Team == elemID){;
                    dataset.push(csv[i]);
                }
        }               
        var col1 = ['Games played'];
        var data1 = [];
        for(i=0 ; i<col1.length ; i++){
            data1[i] = [];
        }
        for(j=0 ; j<col1.length ; j++){
            data1[j][0] = col1[j];
        }
        for(k=0 ; k<col1.length ; k++){
            data1[k][1] = [];
        }
        dataset.forEach(function(x) {
            var v1 = Math.floor(x.Games_played);
			
            var rowMax1 = Math.max(v1);
            var rowMin1 = Math.min(v1);

            data1[0][1].push(v1); 
		 
            if (rowMax1 > max) max = rowMax1;
            if (rowMin1 < min) min = rowMin1;	
        });
  
        var chart = d3.box()
                      .whiskers(iqr(1.5))
                      .height(height)	
                      .domain([min, max])
                      .showLabels(labels);
                      

        var svg = d3.select("#Centre"+id).append("svg")
                                   .attr("width", width + margin.left + margin.right)
                                   .attr("height", height + margin.top + margin.bottom)
                                   .attr("class", "box")    
                                   .append("g")
                                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.ordinal()	   
		.domain( data1.map(function(d) { console.log(d); return d[0] } ) )	    
		.rangeRoundBands([0 , width], 0.7, 0.3); 		

        var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

        var y = d3.scale.linear()
		.domain([min, max])
		.range([height + margin.top, 0 + margin.top]);
	
        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        svg.selectAll(".box")	   
        .data(data1)
        .enter().append("g")
		.attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
        .call(chart.width(x.rangeBand())); 
	
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "18px")  
        .text("Games played: " + elemID);
 
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.append("text") // and text1
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .style("font-size", "16px") 
		  .text("Games played per player");		
	
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
        .append("text")            
        .attr("x", (width / 2) )
        .attr("y",  10 )
		.attr("dy", ".71em")
        .style("text-anchor", "middle")
		.style("font-size", "16px"); 
    });
    
    //Boxplot with minutes played
    d3.csv("data/NBA_data.csv", function(error, csv) {
        var labels = true; // show the text labels beside individual boxplots?
        var margin = {top: 30, right: 100, bottom: 70, left: 100};
        var  width = 600 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;	
        var min = Infinity,
            max = -Infinity;
        var dataset = [];
        for (var i = 0; i < csv.length; i++){
                if (csv[i].Team == elemID){;
                    dataset.push(csv[i]);
                }
        }               
        var col1 = ['Minutes played'];
        var data1 = [];
        for(i=0 ; i<col1.length ; i++){
            data1[i] = [];
        }
        for(j=0 ; j<col1.length ; j++){
            data1[j][0] = col1[j];
        }
        for(k=0 ; k<col1.length ; k++){
            data1[k][1] = [];
        }
        dataset.forEach(function(x) {
            var v1 = Math.floor(x.Minutes);
			
            var rowMax1 = Math.max(v1);
            var rowMin1 = Math.min(v1);

            data1[0][1].push(v1);
		 
            if (rowMax1 > max) max = rowMax1;
            if (rowMin1 < min) min = rowMin1;	
        });
  
        var chart = d3.box()
                      .whiskers(iqr(1.5))
                      .height(height)	
                      .domain([min, max])
                      .showLabels(labels);
                      

        var svg = d3.select("#Centre"+id).append("svg")
                                   .attr("width", width + margin.left + margin.right)
                                   .attr("height", height + margin.top + margin.bottom)
                                   .attr("class", "box")    
                                   .append("g")
                                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.ordinal()	   
		.domain( data1.map(function(d) { console.log(d); return d[0] } ) )	    
		.rangeRoundBands([0 , width], 0.7, 0.3); 		

        var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

        var y = d3.scale.linear()
		.domain([min, max])
		.range([height + margin.top, 0 + margin.top]);
	
        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        svg.selectAll(".box")	   
        .data(data1)
        .enter().append("g")
		.attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
        .call(chart.width(x.rangeBand())); 
	
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "18px")  
        .text("Minutes played: " + elemID);
 
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.append("text") // and text1
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .style("font-size", "16px") 
		  .text("Minutes played per player per game");		
	
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
        .append("text")            
        .attr("x", (width / 2) )
        .attr("y",  10 )
		.attr("dy", ".71em")
        .style("text-anchor", "middle")
		.style("font-size", "16px"); 
    });
    
    //Boxplot with rebonds (for pro only)
    if(pro == 1){
        d3.csv("data/NBA_data.csv", function(error, csv) {
            var labels = true; // show the text labels beside individual boxplots?
            var margin = {top: 30, right: 100, bottom: 70, left: 100};
            var  width = 600 - margin.left - margin.right;
            var height = 400 - margin.top - margin.bottom;	
            var min = Infinity,
                max = -Infinity;
            var dataset = [];
            for (var i = 0; i < csv.length; i++){
                if (csv[i].Team == elemID){;
                    dataset.push(csv[i]);
                }
            }               
            var col1 = ['Offensive rebond','Defensive rebond','Total'];
            var data1 = [];
            for(i=0 ; i<col1.length ; i++){
                data1[i] = [];
            }
            for(j=0 ; j<col1.length ; j++){
                data1[j][0] = col1[j];
            }
            for(k=0 ; k<col1.length ; k++){
                data1[k][1] = [];
            }
            dataset.forEach(function(x) {
                var v1 = x.Off_rebond;
                var v2 = x.Def_rebond;
                var v3 = Math.floor(x.Total_rebond);
			
                var rowMax1 = Math.max(v1, Math.max(v2,v3));
                var rowMin1 = Math.min(v1, Math.min(v2,v3));

                data1[0][1].push(v1);
                data1[1][1].push(v2);
                data1[2][1].push(v3);
		 
                if (rowMax1 > max) max = rowMax1;
                if (rowMin1 < min) min = rowMin1;	
            });
  
            var chart = d3.box()
                      .whiskers(iqr(1.5))
                      .height(height)	
                      .domain([min, max])
                      .showLabels(labels);
                      

            var svg = d3.select("#Centre"+id).append("svg")
                                   .attr("width", width + margin.left + margin.right)
                                   .attr("height", height + margin.top + margin.bottom)
                                   .attr("class", "box")    
                                   .append("g")
                                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var x = d3.scale.ordinal()	   
            .domain( data1.map(function(d) { console.log(d); return d[0] } ) )	    
            .rangeRoundBands([0 , width], 0.7, 0.3); 		

            var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

            var y = d3.scale.linear()
            .domain([min, max])
            .range([height + margin.top, 0 + margin.top]);
	
            var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

            svg.selectAll(".box")	   
            .data(data1)
            .enter().append("g")
            .attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
            .call(chart.width(x.rangeBand())); 
	
            svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 0 + (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "18px")  
            .text("Rebonds caught: " + elemID);
 
            svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text") // and text1
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("font-size", "16px") 
            .text("Rebonds successful per player per game");		
	
            svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
            .call(xAxis)
            .append("text")            
            .attr("x", (width / 2) )
            .attr("y",  10 )
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .style("font-size", "16px"); 
        });
    }
    
    //Boxplot with fouls
    d3.csv("data/NBA_data.csv", function(error, csv) {
        var labels = true; // show the text labels beside individual boxplots?
        var margin = {top: 30, right: 100, bottom: 70, left: 100};
        var  width = 600 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;	
        var min = Infinity,
            max = -Infinity;
        var dataset = [];
        for (var i = 0; i < csv.length; i++){
                if (csv[i].Team == elemID){;
                    dataset.push(csv[i]);
                }
        }               
        var col1 = ['Personnal fouls','Personnal fouls drawn'];
        var data1 = [];
        for(i=0 ; i<col1.length ; i++){
            data1[i] = [];
        }
        for(j=0 ; j<col1.length ; j++){
            data1[j][0] = col1[j];
        }
        for(k=0 ; k<col1.length ; k++){
            data1[k][1] = [];
        }
        dataset.forEach(function(x) {
            var v1 = x.Personnal_fouls;
            var v2 = x.Personnal_fouls_drawn;
			
            var rowMax1 = Math.max(v1, v2);
            var rowMin1 = Math.min(v1, v2);

            data1[0][1].push(v1);
            data1[1][1].push(v2);
		 
            if (rowMax1 > max) max = rowMax1;
            if (rowMin1 < min) min = rowMin1;	
        });
  
        var chart = d3.box()
                      .whiskers(iqr(1.5))
                      .height(height)	
                      .domain([min, max])
                      .showLabels(labels);
                      

        var svg = d3.select("#Centre"+id).append("svg")
                                   .attr("width", width + margin.left + margin.right)
                                   .attr("height", height + margin.top + margin.bottom)
                                   .attr("class", "box")    
                                   .append("g")
                                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.ordinal()	   
		.domain( data1.map(function(d) { console.log(d); return d[0] } ) )	    
		.rangeRoundBands([0 , width], 0.7, 0.3); 		

        var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

        var y = d3.scale.linear()
		.domain([min, max])
		.range([height + margin.top, 0 + margin.top]);
	
        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        svg.selectAll(".box")	   
        .data(data1)
        .enter().append("g")
		.attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
        .call(chart.width(x.rangeBand())); 
	
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "18px")  
        .text("Fouls: " + elemID);
 
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.append("text") // and text1
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .style("font-size", "16px") 
		  .text("Number of fouls per match per player");		
	
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
        .append("text")            
        .attr("x", (width / 2) )
        .attr("y",  10 )
		.attr("dy", ".71em")
        .style("text-anchor", "middle")
		.style("font-size", "16px"); 
    });
    
    //Boxplot with points
    d3.csv("data/NBA_data.csv", function(error, csv) {
        var labels = true; // show the text labels beside individual boxplots?
        var margin = {top: 30, right: 100, bottom: 70, left: 100};
        var  width = 600 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;	
        var min = Infinity,
            max = -Infinity;
        var dataset = [];
        for (var i = 0; i < csv.length; i++){
                if (csv[i].Team == elemID){;
                    dataset.push(csv[i]);
                }
        }               
        var col1 = ['Points','Point differential of the score'];
        var data1 = [];
        for(i=0 ; i<col1.length ; i++){
            data1[i] = [];
        }
        for(j=0 ; j<col1.length ; j++){
            data1[j][0] = col1[j];
        }
        for(k=0 ; k<col1.length ; k++){
            data1[k][1] = [];
        }
        dataset.forEach(function(x) {
            var v1 = Math.floor(x.Points);
            var v2 = Math.floor(x.Point_differential_of_the_score);
			
            var rowMax1 = Math.max(v1, v2);
            var rowMin1 = Math.min(v1, v2);

            data1[0][1].push(v1);
            data1[1][1].push(v2);
		 
            if (rowMax1 > max) max = rowMax1;
            if (rowMin1 < min) min = rowMin1;	
        });
  
        var chart = d3.box()
                      .whiskers(iqr(1.5))
                      .height(height)	
                      .domain([min, max])
                      .showLabels(labels);
                      

        var svg = d3.select("#Centre"+id).append("svg")
                                   .attr("width", width + margin.left + margin.right)
                                   .attr("height", height + margin.top + margin.bottom)
                                   .attr("class", "box")    
                                   .append("g")
                                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.ordinal()	   
		.domain( data1.map(function(d) { console.log(d); return d[0] } ) )	    
		.rangeRoundBands([0 , width], 0.7, 0.3); 		

        var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

        var y = d3.scale.linear()
		.domain([min, max])
		.range([height + margin.top, 0 + margin.top]);
	
        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        svg.selectAll(".box")	   
        .data(data1)
        .enter().append("g")
		.attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
        .call(chart.width(x.rangeBand())); 
	
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "18px")  
        .text("Points: " + elemID);
 
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.append("text") // and text1
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .style("font-size", "16px") 
		  .text("Points scored per player per match");		
	
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
        .append("text")            
        .attr("x", (width / 2) )
        .attr("y",  10 )
		.attr("dy", ".71em")
        .style("text-anchor", "middle")
		.style("font-size", "16px"); 
    });

}