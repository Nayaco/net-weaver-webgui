import React from 'react'
import './LogBox.css'
import * as AU from 'ansi-up'
const ansi_up = new AU.AnsiUp

class LogBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      log: [],
      start_log: false,
    }
    this.started = false
  }
  static getDerivedStateFromProps(props, state) {
    if (props.project != state.project) 
      return ({
        log: [],
        start_log: props.start_log,
        project: props.project
      })
    else
      return ({
        start_log: props.start_log,
        project: props.project
      })
  }
  componentDidMount() {
    
  }
  render() {
    if(this.state.start_log && !this.started) {
      this.interval = setInterval(()=>{
        fetch(`/log?project=${this.state.project}&line_from=${this.state.log.length}`,
          {
            headers:{
              Accept: 'application/json; charset=utf-8'
            }
          }
        )
        .then((res)=>res.json())
        .then((data)=>{
          this.setState({
            log: [...this.state.log, ...data.log]
          })
        })
      },
      1000) 
      this.started = true
    } else if (!this.state.start_log && this.started){
      clearInterval(this.interval)
      this.started = false
    }
    return (
      <div id={'logbox'} className={'logbox-div'}>
        <ul className={'logbox-ul'}>
          {this.state.log.map((item, idx) => 
            <li key={idx}>
              {ansi_up.ansi_to_text(item)}
            </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default LogBox