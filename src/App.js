import { json } from 'd3';
import React from 'react'
import './App.css';

import Graph from './Graph';
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
    return (
      <div className='App'>
        <Graph svg='home'/>
        {/* <form>
          <label>Project Name</label>
          <input type="text" value={this.state.project_temp} onChange={this.setProject}/>
          <button onClick={this.startLedger} disabled={this.state.disable}>Generate</button>
        </form> */}
        <LogBox start_log={this.state.start_log} project={this.state.project}/>
      </div>
    )
  }
}

export default App;
