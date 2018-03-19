function selectTeam(elemID){
	
    //Affichage du boxplot avec les goals
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
                      
        d3.select("#Centre").selectAll("svg").remove();

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
		  .text("Number of throws per match played");		
	
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
        .text("Statistics of the team"); 
        

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
    
    
    //Boxplot avec la donnée Salaire
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
		.style("font-size", "16px") 
        .text("Players' Salary"); 
        

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
    
    //Boxplot avec la donnée Age
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
        .text("Ages from the team: " + elemID);
 
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
		.style("font-size", "16px") 
        .text("Players' age"); 
        

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
    
    //Boxplot avec la donnée Taille
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
        .text("Height from the team: " + elemID);
 
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
		.style("font-size", "16px") 
        .text("Players' Height"); 
        

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
    
    //Boxplot avec la donnée Poids
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
        .text("Weight from the team: " + elemID);
 
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
		.style("font-size", "16px") 
        .text("Players' Weight"); 
        

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