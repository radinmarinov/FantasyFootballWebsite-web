import React, { Component } from 'react'
import Table from '../Table'
import callAPI from '../LeagueRecordsAPI'
class Home extends Component {
    constructor(props) {
        super(props);
        
        this.headerNames = ["Record", "Owner"];
        this.statsData = [
            'Most championships',
            'Most championship appearances',
            'Most top 3 finishes',
            'Highest regular season winning percentage',
            'Highest regular season and postseason winning percentage',
            'Highest postseason winning percentage',
            'Most regular season games won',
            'Most regular season and postseason games won',
            'Most postseason games won',
            'Most games won in a regular season',
            'Highest win percentage in a regular season',
            'Most games lost in a regular season',
            'Lowest win percentage in a regular season',
            'Most consolation championships',
            'Most consolation games won',
            'Highest consolation winning percentage',
            'Most last-place finishes',
            'Most points scored all time',
            'Most points scored per game all time',
            'Most points scored per game in a season',
            'Least points scored per game in a season',
            'Most points scored in a game',
            'Most seasons as regular season highest scorer'    ,            
            'Most seasons as regular season lowest scorer',
            'Most seasons as overall highest scorer',
            'Most seasons as overall lowest scorer',
            'Most seasons with most points against',
            'Most transactions all time',
            'Most transactions per season',
            'Most transactions in one season',
            'Most trades all time',
            'Most trades per season',
            'Most trades in one season'         
        ];
        this.state = {
            resultsData: null
        };
      }
    componentDidMount(){
        var results = callAPI("League Records", [], {});
        Promise.resolve(results).then((valueArray) => {
            var formattedValues = [];    
            Object.values(valueArray).forEach(element => {
              formattedValues.push(this.recordFormatter(element));
            });
            var zipped = this.statsData.map(function(e, i) {
                return [e, formattedValues[i]];
            });
            this.setState({ resultsData: zipped });
        });
    }

    recordFormatter(results){
        var lines = [];
        for (var i = 0; i < results.length; ++i) {
            var result = results[i];
            var name = result[0];
            var val = result[1];
            var formattedResult = name + ": " + val
            if (result.length==3) {
                var year = result[2];
                formattedResult = formattedResult + " (" + year + ")"
            }
            lines.push(formattedResult);
        }
        return lines.join(",\n");
    }
    render() {
        if (this.state.resultsData === null) {
            console.log("WAITING");
        }
        else {
            return (
            <div className="container">
            <h2>League Records</h2>
            <Table resultsData={this.state.resultsData} headerNames={this.headerNames}/>
            </div>
      )
        }
    }
  }  
export default Home;