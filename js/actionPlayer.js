function addDataPlayerFan(){
    d3.csv("data/NBA_data.csv", function(data){
                                                        d3.select("#blocNavElementList").selectAll("p")
                                                          .data(data)
                                                          .enter()
                                                          .append("p")
                                                          .text(function(d){return d.Name;})
                                                          .attr("onclick",function(d){return "selectPlayer('" + d.Name +"',0);";})
                                                          .style("margin", "0")  
                                                          .style("font-size", "15px");
                                                    });
}

function addDataPlayerPro(){
    d3.csv("data/NBA_data.csv", function(data){
                                                        d3.select("#blocNavElementList").selectAll("p")
                                                          .data(data)
                                                          .enter()
                                                          .append("p")
                                                          .text(function(d){return d.Name;})
                                                          .attr("onclick",function(d){return "selectPlayer('" + d.Name +"',1);";})
                                                          .style("margin", "0")  
                                                          .style("font-size", "15px");
                                                    });
}

function selectPlayer(elemID,pro){
    
    d3.select("#Centre").select("#wrong").remove();
    
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
        
        //if we are in pro mode
        var col_pro = ['Name','Height','Weight','Age','Salary','Team','Position','Games_played','Minutes',
                           'Fields_goals_made','Fields_goal_attempted','Percent_Fields_goal_made','Three_pts_FGM','Three_pts_FGA','Percent_Three_pts_FG','Free_throws_made',
                           'Free_throws_attempted','Percent_FT','Off_rebond','Def_rebond','Total_rebond','Assits','Turnover','Steals','Blocks','Blocked_fields_goals_attempted',
                           'Personnal_fouls','Personnal_fouls_drawn','Points','Point_differential_of_the_score'];
                           
        var lab_pro = ['Name','Height','Weight','Age','Salary','Team','Position','Games played','Minutes',
                           'Fields goals made','Fields goal attempted','Percent of fields goal made','Three points made','Three points attempted','Percent of three pts','Free throws made',
                           'Free throws attempted','Percent of free throw','Offensive rebond','Defensive rebond','Total rebond','Assits','Turnover','Steals','Blocks','Blocked fields goals attempted',
                           'Personnal fouls','Personnal fouls drawn','Points','Point differential of the score'];
                           
        var unit_pro = ['-','m','kg','years old','$','-','-','games','minutes/game',
                           '/game','/game','%','/game','/game','%','/game',
                           '/game','%','/game','/game','/game','/game','/game','/game','/game','/game',
                           '/game','/game','/game','-'];
                           
        //if we are in fan mode
        var col_fan = ['Name','Height','Weight','Age','Salary','Team','Position','Games_played','Minutes',
                           'Fields_goals_made','Three_pts_FGM','Free_throws_made',
                           'Total_rebond','Assits','Turnover','Steals','Blocks',
                           'Personnal_fouls','Points'];
                           
        var lab_fan = ['Name','Height','Weight','Age','Salary','Team','Position','Games played','Minutes',
                           'Fields goals made','Three points made','Free throws made',
                           'Total rebond','Assits','Turnover','Steals','Blocks',
                           'Personnal fouls','Points'];
                           
        var unit_fan = ['-','m','kg','years old','$','-','-','games','minutes/game',
                           '/game','/game','/game',
                           '/game','/game','/game','/game','/game',
                           '/game','/game'];
                           
        
        //erase all the previous search
        d3.select("#Centre").select("table").remove();
        
        
        if(pro == 1){
            tabulate(dataset, col_pro, lab_pro, unit_pro);
        }else{
            tabulate(dataset, col_fan, lab_fan, unit_fan);
        }

    });

}