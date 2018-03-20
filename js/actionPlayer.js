function selectPlayer(elemID){
    
    d3.csv("data/NBA_data.csv", function (error,data) {
        
        var dataset = [];
        for (var i = 0; i < data.length; i++){
                if (data[i].Name == elemID){;
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
        
        d3.select("#Centre").select("table").remove();
        
        tabulate(dataset, col);

    });

}