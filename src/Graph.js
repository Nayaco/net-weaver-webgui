import React from 'react'
import * as d3 from 'd3'
import './Graph.css'
import database from './database.svg'
import cloud from './cloud.svg'
import { Modal } from 'react-bootstrap'

const SVGwidth = 800;
const SVGheight = 500;
const fontSize = 10;
const symbolSize = 40;
const padding = 10;

class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.svgID = this.props.svg
    this.state = {
      onSelectComponent: true,
      data: [
        {
          type: 'database',
        },
        {
          type: 'cloud',
        }
      ]
    }
  }
  componentDidMount() {
    // this.drawGraph()
  }

  initDefineSymbol () {
    let defs = this.container.append('svg:defs')
    
    defs.append('g')
        .attr('id', 'database')
        .attr('transform', 'scale(1.5),translate(0, 0)')
        .append('image')
        .attr('href', `${database}`)
    defs.append('g')
        .attr('id', 'cloud')
        .attr('transform', 'scale(1.5),translate(0, 0)')
        .append('image')
        .attr('href', `${cloud}`)
  }
  initNode () {
    this.nodes = this.container.selectAll('.node')
      .data(this.state.data).enter()
      .append('g')
      .attr('class', 'node')
      // .attr('transform', 'translate(20, 20)')
      .call(d3.drag()
        .on('drag', function (event, d) {
          d3.select(this).attr('transform', `translate(${event.x}, ${event.y})`)
        })
      )
      .on('click', function () {
      })

    this.drawNodeSymbol();
  }

  drawNodeSymbol () {
    this.nodes.filter(item => item.type == 'database')
      .append('use')
      .attr('href', '#database')
      .attr('x', function () {
        return -this.getBBox().width / 2
      })
      .attr('y', function () {
        return -this.getBBox().height / 2
      })
    this.nodes.filter(item => item.type == 'cloud')
      .append('use')
      .attr('href', '#cloud')
      .attr('x', function () {
        return -this.getBBox().width / 2
      })
      .attr('y', function () {
        return -this.getBBox().height / 2
      })
  }
  drawGraph()  {
    this.svg = d3.select(`#${this.svgID}`)
      .append('svg')
      .attr('id', `${this.svgID}canvas`)
      .attr('width', SVGwidth)
      .attr('height', SVGheight)
      .style('border', '1px solid black')
    this.container = this.svg.append('g')
    this.initDefineSymbol()
    this.initNode()
  }
  render() {
    return(
      <div id={this.svgID}>
        <Modal show={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
export default Graph