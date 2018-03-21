function selectPlayer(elemID){
    
    
    d3.csv("data/NBA_data.csv", function (error,data) {
        
        var dataset = [];
        for (var i = 0; i < data.length; i++){
                if (data[i].Name == elemID){;
                    dataset.push(data[i]);
                }
        }

        
        function tabulate(data, columns, label, units) {
            
            var table = d3.select('#Centre').append('table')
            var thead = table.append('thead')
            var	tbody = table.append('tbody');
            
            // append the header row
            var contentHead = ['About the player','Value','Units'];
            thead.append('tr')
                 .selectAll('th')
                 .data(contentHead).enter()
		         .append('th')
		         .text(function (column) { return column; });
                 
            var toAdd = [];
            for(i=0 ; i<columns.length ; i++){
                toAdd.push(data[0][columns[i]]);
            }

            // create a row for each object in the data
            var about = tbody.selectAll('tr')
                            .data(columns)
                            .enter()
                            .append('tr')   
                            .attr('id','line');
                            
            about.append('td').text(function(d,i){return label[i] ;});
            about.append('td').text(function(d){return data[0][d];});
            about.append('td').text(function(d,i){return units[i] ;});

            return table;
        }

        // render the table(s)
        var col = ['Name','Height','Weight','Age','Salary','Team','Position','Games_played','Minutes',
                           'Fields_goals_made','Fields_goal_attempted','Percent_Fields_goal_made','Three_pts_FGM','Three_pts_FGA','Percent_Three_pts_FG','Free_throws_made',
                           'Free_throws_attempted','Percent_FT','Off_rebond','Def_rebond','Total_rebond','Assits','Turnover','Steals','Blocks','Blocked_fields_goals_attempted',
                           'Personnal_fouls','Personnal_fouls_drawn','Points','Point_differential_of_the_score'];
                           
        var lab = ['Name','Height','Weight','Age','Salary','Team','Position','Games played','Minutes',
                           'Fields goals made','Fields goal attempted','Percent of fields goal made','Three points made','Three points attempted','Percent of three pts','Free throws made',
                           'Free throws attempted','Percent of free throw','Offensive rebond','Defensive rebond','Total rebond','Assits','Turnover','Steals','Blocks','Blocked fields goals attempted',
                           'Personnal fouls','Personnal fouls drawn','Points','Point differential of the score'];
                           
        var unit = ['-','m','kg','years old','$','-','-','games','minutes/game',
                           '/game','/game','%','/game','/game','%','/game',
                           '/game','%','/game','/game','/game','/game','/game','/game','/game','/game',
                           '/game','/game','/game','-'];                   
        
        d3.select("#Centre").select("table").remove();
        
        tabulate(dataset, col, lab, unit);

    });

}