import React, { Component } from 'react'
import Table from '../Table'
import callAPI from '../LeagueRecordsAPI'


class Team extends Component {    
    constructor(props) {
        super(props);
        this.managers = [
            "Radin",
            "Christian",
            "Fahad",
            "Timothy",
            "matt",
            "Corey",
            "Rohan",
            "Jake",
            "Anand",
            "Kenny",
            "Nikhil",
            "Zach"
        ];
        this.stats = [
            'Overall Stats and Rankings',
            'Finishes',
            'Activity',
            'Best Against',
            'Worst Against',
        ];
        this.headerNamesOverall = ["Wins", "Losses", "Win Pct", "Win Pct Rank", "Avg. Points Scored", "Avg. Points Against","Avg. Points Scored Rank", "Avg. Points Against Rank"];
        this.headerNamesFinishes = ["Championships", "Second Place", "Third Place", "Consolation Champ.", "Playoff Appearances", "Seasons"];
        this.headerNamesActivity = ["Avg. Transactions", "Avg. Trades", "Avg. Transactions Rank", "Avg. Trades Rank"];
        this.headerNamesOpponent = ["Opponent", "Wins", "Losses", "Win Pct."];
        this.state = {
            manager: this.managers[Math.floor(Math.random()*this.managers.length)],
            resultsData: null         
        };
      }

    componentDidMount(){
        var results = callAPI("Team", [], {"manager": this.state.manager});
        Promise.resolve(results).then((valueArray) => {
            var formattedValues = [];    
             for (var [key, value] of Object.entries(valueArray)) {
                formattedValues.push(this.recordFormatter(key, value));
              }
             this.setState({ resultsData: formattedValues });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.manager !== this.state.manager){
            var results = callAPI("Team", [], {"manager": this.state.manager});
            Promise.resolve(results).then((valueArray) => {
                var formattedValues = [];    
                 for (var [key, value] of Object.entries(valueArray)) {
                    formattedValues.push(this.recordFormatter(key, value));
                  }
                 this.setState({ resultsData: formattedValues });
            });
        }
    }

    recordFormatter(key, value){
        if (key == "Finishes") {
            value[0] = value[0].map(function(val, i) {
                    return val === null ? 0 : val;
                })
        }
        return value
    }
    render() {
        if (this.state.resultsData === null) {
            console.log("WAITING");
        }
        else {
            return (
            <div className="container">
            <h2>Team Stats</h2>
            <select
            onChange={(e) => this.setState({ manager: e.target.value})}
            defaultValue={this.state.manager}
            >
            {this.managers.map((option, idx) => (
                <option key={idx}>{option}</option>
            ))}
            </select>
            <h4>Overall Stats</h4>
            <Table resultsData={this.state.resultsData[0]} headerNames={this.headerNamesOverall}/>
            <h4>Finishes</h4>
            <Table resultsData={this.state.resultsData[1]} headerNames={this.headerNamesFinishes}/>
            <h4>Best Record Against</h4>
            <Table resultsData={this.state.resultsData[3]} headerNames={this.headerNamesOpponent}/>
            <h4>Worst Record Against</h4>
            <Table resultsData={this.state.resultsData[4]} headerNames={this.headerNamesOpponent}/>
            <h4>Activity</h4>
            <Table resultsData={this.state.resultsData[2]} headerNames={this.headerNamesActivity}/>
            </div>
      )
        }
    }
  }  
//<Table statsData={this.state.statsData} resultsData={this.state.resultsData} headerNames={this.state.headerNames}/>
export default Team;