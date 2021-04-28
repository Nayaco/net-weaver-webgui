import { json } from 'd3';
import React from 'react'
import './App.css';
import { Graph } from "react-d3-graph";
// import Graph from './Graph';
import LogBox from './LogBox';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      project_temp: 'test',
      project: 'test',
      start_log: false,
      disable: false,
    }
    this.data = [
          {
            id: 0,
            type: 'database',
            x: 10, y: 10,
          },
          {
            id: 1,
            type: 'cloud',
            x: 10, y: 10,
          }
        ]
  }
  setProject = (e)=> {
    e.preventDefault();
    this.setState({
      project_temp: e.target.value
    })
  }
  startLedger = (e)=> {
    e.preventDefault();
    let project_name = this.state.project_temp
    this.setState({
      project: this.state.project_temp,
      start_log: true,
      disable: true,
    })
    fetch(`/generate`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
              project: project_name,
              peers: [
                  {
                      nodes: 1,
                      index: 1
                  },
                  {
                      nodes: 1,
                      index: 2
                  }
              ],
              channels: [
                  {
                      index: 1,
                      peerorgs: [1, 2]
                  }
              ]
            })
          }
        )
    .then((res)=>res.json())
    .then((data)=>{
      this.setState({
        ...this.state, 
        start_log: false,
        disable: false,
      })
    })
  }
  render() {
    const data = {
      nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
      links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" },
      ],
    };
    
    // the graph configuration, just override the ones you need
    const myConfig = {
      nodeHighlightBehavior: true,
      node: {
        color: "lightgreen",
        size: 200,
        highlightStrokeColor: "blue",
      },
      link: {
        highlightColor: "lightblue",
      },
    };
    
    const onClickNode = function(nodeId) {
      window.alert(`Clicked node ${nodeId}`);
    };
    
    const onClickLink = function(source, target) {
      window.alert(`Clicked link between ${source} and ${target}`);
    };
    return (
      <div className='App'>
        <Graph
          id="graph-id" // id is mandatory
          data={data}
          config={myConfig}
          onClickNode={onClickNode}
          onClickLink={onClickLink}
        />
        {/* <Graph svg='home' data={this.data}/> */}
        {/* <form>
          <label>Project Name</label>
          <input type="text" value={this.state.project_temp} onChange={this.setProject}/>
          <button onClick={this.startLedger} disabled={this.state.disable}>Generate</button>
        </form> */}
        {/* <LogBox start_log={this.state.start_log} project={this.state.project}/> */}
      </div>
    )
  }
}

export default App;
