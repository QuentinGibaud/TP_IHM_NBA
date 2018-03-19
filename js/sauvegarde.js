function selectTeam(elemID){
    
    /*
    d3.csv("data/NBA_data.csv", function (error,data) {
        
        var dataset = [];
        for (var i = 0; i < data.length; i++){
                if (data[i].Team == elemID){;
                    dataset.push(data[i]);
                }
        }

        function tabulate(data, columns) {
            
            var table = d3.select('#Centre').append('table')
            var thead = table.append('thead')
            var	tbody = table.append('tbody');
            
            // append the header row
            thead.append('tr')
                 .selectAll('th')
                 .data(columns).enter()
		         .append('th')
		         .text(function (column) { return column; });

            // create a row for each object in the data
            var rows = tbody.selectAll('tr')
                            .data(data)
                            .enter()
                            .append('tr');
                            

            // create a cell in each row for each column
            var cells = rows.selectAll('td')
                            .data(function (row) {
                                return columns.map(function (column) {
                                    return {column: column, value: row[column]};
                                });
                            })
                            .enter()
                            .append('td')
                            .text(function (d) { return d.value; });

            return table;
        }

        // render the table(s)
        var col = ['Name','Height','Weight','Age','Salary','Team','Position','Games_played','Minutes',
                           'Fields_goals_made','Fields_goal_attempted','Percent_Fields_goal_made','Three_pts_FGM','Three_pts_FGA','Percent_Three_pts_FG','Free_throws_made',
                           'Free_throws_attempted','Percent_FT','Off_rebond','Def_rebond','Total_rebond','Assits','Turnover','Steals','Blocks','Blocked_fields_goals_attempted',
                           'Personnal_fouls','Personnal_fouls_drawn','Points','Point_differential_of_the_score'];
        tabulate(dataset, col);

    });*/
    
    var labels = true; // show the text labels beside individual boxplots?

    var margin = {top: 30, right: 100, bottom: 70, left: 100};
    var  width = 1500 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;
	
    var min = Infinity,
        max = -Infinity;
        
    var col = ['Height','Weight','Age','Salary','Games_played','Minutes',
               'Fields_goals_made','Fields_goal_attempted','Percent_Fields_goal_made','Three_pts_FGM','Three_pts_FGA','Percent_Three_pts_FG','Free_throws_made',
               'Free_throws_attempted','Percent_FT','Off_rebond','Def_rebond','Total_rebond','Assits','Turnover','Steals','Blocks','Blocked_fields_goals_attempted',
               'Personnal_fouls','Personnal_fouls_drawn','Points','Point_differential_of_the_score'];
	
    // parse in the data	
    d3.csv("data/NBA_data.csv", function(error, csv) {
        var labels = true; // show the text labels beside individual boxplots?

    var margin = {top: 30, right: 100, bottom: 70, left: 100};
    var  width = 1500 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;
	
    var min = Infinity,
        max = -Infinity;
	// using an array of arrays with
	// data[n][2] 
	// where n = number of columns in the csv file 
	// data[i][0] = name of the ith column
	// data[i][1] = array of values of ith column
        var dataset = [];
        for (var i = 0; i < csv.length; i++){
                if (csv[i].Team == elemID){;
                    dataset.push(csv[i]);
                }
        }
        /*
        var data = [];
        for(i=0 ; i<27 ; i++){
            data[i] = [];
        }
        
        // add more rows if your csv file has more columns

        // add here the header of the csv file
        for(j=0 ; j<27 ; j++){
            data[j][0] = col[j];
        }
        
        // add more rows if your csv file has more columns

        for(k=0 ; k<27 ; k++){
            data[k][1] = [];
        }
  
        dataset.forEach(function(x) {
            var v1 = Math.floor(x.Height),
                v2 = Math.floor(x.Weight),
                v3 = Math.floor(x.Age),
                v4 = Math.floor(x.Salary),
                v5 = Math.floor(x.Games_played),
                v6 = Math.floor(x.Minutes),
                v7 = Math.floor(x.Fields_goals_made),
                v8 = Math.floor(x.Fields_goal_attempted),
                v9 = Math.floor(x.Percent_Fields_goal_made),
                v10 = Math.floor(x.Three_pts_FGM),
                v11 = Math.floor(x.Three_pts_FGA),
                v12 = Math.floor(x.Percent_Three_pts_FG),
                v13 = Math.floor(x.Free_throws_made),
                v14 = Math.floor(x.Free_throws_attempted),
                v15 = Math.floor(x.Percent_FT),
                v16 = Math.floor(x.Off_rebond),
                v17 = Math.floor(x.Def_rebond),
                v18 = Math.floor(x.Total_rebond),
                v19 = Math.floor(x.Assits),
                v20 = Math.floor(x.Turnover),
                v21 = Math.floor(x.Steals),
                v22 = Math.floor(x.Blocks),
                v23 = Math.floor(x.Blocked_fields_goals_attempted),
                v24 = Math.floor(x.Personnal_fouls),
                v25 = Math.floor(x.Personnal_fouls_drawn),
                v26 = Math.floor(x.Points),
                v27 = Math.floor(x.Point_differential_of_the_score);
                
                // add more variables if your csv file has more columns
			
            var rowMax = Math.max(v1, Math.max(v2, Math.max(v3,v4)));
            var rowMin = Math.min(v1, Math.min(v2, Math.min(v3,v4)));

            data[0][1].push(v1);
            data[1][1].push(v2);
            data[2][1].push(v3);
            data[3][1].push(v4);
            data[4][1].push(v5);
            data[5][1].push(v6); 
            data[6][1].push(v7);
            data[7][1].push(v8);
            data[8][1].push(v9);
            data[9][1].push(v10);
            data[10][1].push(v11);
            data[11][1].push(v12);
            data[12][1].push(v13);
            data[13][1].push(v14);
            data[14][1].push(v15);
            data[15][1].push(v16);
            data[16][1].push(v17);
            data[17][1].push(v18);
            data[18][1].push(v19);
            data[19][1].push(v20);
            data[20][1].push(v21);
            data[21][1].push(v22);
            data[22][1].push(v23);
            data[23][1].push(v24);
            data[24][1].push(v25);
            data[25][1].push(v26);
            data[26][1].push(v27);
            // add more rows if your csv file has more columns
		 
            if (rowMax > max) max = rowMax;
            if (rowMin < min) min = rowMin;	
        });
  
        var chart = d3.box()
                      .whiskers(iqr(1.5))
                      .height(height)	
                      .domain([min, max])
                      .showLabels(labels);
                      
        d3.select("#Centre").select("svg").remove();

        var svg = d3.select("#Centre").append("svg")
                                   .attr("width", width + margin.left + margin.right)
                                   .attr("height", height + margin.top + margin.bottom)
                                   .attr("class", "box")    
                                   .append("g")
                                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
        // the x-axis
        var x = d3.scale.ordinal()	   
		.domain( data.map(function(d) { console.log(d); return d[0] } ) )	    
		.rangeRoundBands([0 , width], 0.7, 0.3); 		

        var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

        // the y-axis
        var y = d3.scale.linear()
		.domain([min, max])
		.range([height + margin.top, 0 + margin.top]);
	
        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        // draw the boxplots	
        svg.selectAll(".box")	   
        .data(data)
        .enter().append("g")
		.attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
        .call(chart.width(x.rangeBand())); 
	
	      
        // add a title
        svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "18px") 
        //.style("text-decoration", "underline")  
        .text("Data from the team : " + elemID);
 
        // draw y axis
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.append("text") // and text1
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .style("font-size", "16px") 
		  .text("Value");		
	
        // draw x axis	
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
        .append("text")             // text label for the x axis
        .attr("x", (width / 2) )
        .attr("y",  10 )
		.attr("dy", ".71em")
        .style("text-anchor", "middle")
		.style("font-size", "16px") 
        .text("Variables"); 
        */
        //Affichage d'un premier diagramme
        
        var col1 = ['Fields_goals_made','Fields_goal_attempted','Three_pts_FGM','Three_pts_FGA','Free_throws_made','Free_throws_attempted'];

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
                v2 = Math.floor(x.Fields_goal_attempted),
                v3 = Math.floor(x.Three_pts_FGM),
                v4 = Math.floor(x.Three_pts_FGA),
                v5 = Math.floor(x.Free_throws_made),
                v6 = Math.floor(x.Free_throws_attempted);
			
            var rowMax1 = Math.max(v1, Math.max(v2, Math.max(v3, Math.max(v4, Math.max(v5,v6)))));
            var rowMin1 = Math.min(v1, Math.min(v2, Math.min(v3, Math.min(v4, Math.min(v5,v6)))));

            data1[0][1].push(v1);
            data1[1][1].push(v2);
            data1[2][1].push(v3);
            data1[3][1].push(v4);
            data1[4][1].push(v5);
            data1[5][1].push(v6); 
		 
            if (rowMax1 > max) max = rowMax1;
            if (rowMin1 < min) min = rowMin1;	
        });
  
        var chart = d3.box()
                      .whiskers(iqr(1.5))
                      .height(height)	
                      .domain([min, max])
                      .showLabels(labels);
                      
        d3.select("#Centre").select("svg").remove();

        var svg = d3.select("#Centre").append("svg")
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
        .text("Data from the team : " + elemID);
 
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.append("text") // and text1
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .style("font-size", "16px") 
		  .text("Goals attempted");		
	
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
        .append("text")            
        .attr("x", (width / 2) )
        .attr("y",  10 )
		.attr("dy", ".71em")
        .style("text-anchor", "middle")
		.style("font-size", "16px") 
        .text("Variables"); 
        

    // Returns a function to compute the interquartile range.
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
});

d3.csv("data/NBA_data.csv", function(error, csv) {

    var labels = true; // show the text labels beside individual boxplots?

    var margin = {top: 30, right: 100, bottom: 70, left: 100};
    var  width = 1500 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;
	
    var min = Infinity,
        max = -Infinity;
        var dataset = [];
        for (var i = 0; i < csv.length; i++){
                if (csv[i].Team == elemID){;
                    dataset.push(csv[i]);
                }
        }
        
        
        var col1 = ['Percent_Fields_goal_made','Percent_Three_pts_FG','Percent_FT'];

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
            var v1 = Math.floor(x.Percent_Fields_goal_made),
                v2 = Math.floor(x.Percent_Three_pts_FG),
                v3 = Math.floor(x.Percent_FT);
			
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
                      

        var svg = d3.select("#Centre").append("svg")
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
        .text("Data from the team : " + elemID);
 
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.append("text") // and text1
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .style("font-size", "16px") 
		  .text("Goals attempted");		
	
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
        .append("text")            
        .attr("x", (width / 2) )
        .attr("y",  10 )
		.attr("dy", ".71em")
        .style("text-anchor", "middle")
		.style("font-size", "16px") 
        .text("Variables"); 
        

    // Returns a function to compute the interquartile range.
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
});

d3.csv("data/NBA_data.csv", function(error, csv) {

    var labels = true; // show the text labels beside individual boxplots?

    var margin = {top: 30, right: 100, bottom: 70, left: 100};
    var  width = 1500 - margin.left - margin.right;
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
                      

        var svg = d3.select("#Centre").append("svg")
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
        .text("Data from the team : " + elemID);
 
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.append("text") // and text1
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .style("font-size", "16px") 
		  .text("Goals attempted");		
	
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
        .append("text")            
        .attr("x", (width / 2) )
        .attr("y",  10 )
		.attr("dy", ".71em")
        .style("text-anchor", "middle")
		.style("font-size", "16px") 
        .text("Variables"); 
        

    // Returns a function to compute the interquartile range.
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
});

}