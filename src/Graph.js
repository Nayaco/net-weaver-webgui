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
      // data: {
      //   nodes: [
      //     {
      //       id: 0,
      //       type: 'database',
      //       x: 0, y: 0,
      //     },
      //     {
      //       id: 1
      //       type: 'cloud',
      //       x: 0, y: 0,
      //     }
      //   ],
      //   lines: [
      //     {source:1, target:0}
      //   ]
      // }
    }
    if (!this.data) {
      this.data = this.props.data
    } else {
      this.data = this.data.length == this.props.data.length ? this.data : this.props.data
    }
    this.links = [
      {source:1, target:0}
    ]
  }
  
  componentDidMount() {
    this.drawGraph()
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
    console.log(this.data)
    this.nodes = this.container.selectAll('.node')
      .data(this.data).enter()
      .append('g')
      .attr('class', 'node')
      .attr('id', (d, i)=>`node-${d.id}`)
      .attr('transform', (d)=>`translate(${d.x}, ${d.y})`)
      .call(d3.drag()
      .on('drag', function(event, d) {
          [d.x, d.y] = [event.x, event.y]
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

  drawLines() {
    const genLinkPath = (d)=> {
      let sx = this.data[d.source].x;
      let tx = this.data[d.target].x;
      let sy = this.data[d.source].y;
      let ty = this.data[d.target].y;
      return 'M' + sx + ',' + sy +
        ' L' + tx + ',' + ty
    }
    if (this.lines) {
      this.lines.selectAll('.link')
        .attr(
          'd', link => genLinkPath(link),
        )
    } else {
      this.lines = this.container.append('g')
      this.lines.selectAll('.link')
        .data(this.links)
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr(
          'd', link => genLinkPath(link),
        ).attr(
          'id', (link, i) => 'link-' + i
        )
    }
    
  }

  drawGraph() {
    this.svg = d3.select(`#${this.svgID}`)
      .append('svg')
      .attr('id', `${this.svgID}canvas`)
      .attr('width', SVGwidth)
      .attr('height', SVGheight)
      .style('border', '1px solid black')
    this.container = this.svg.append('g')
    this.container.attr('id', 'canvas-container')
    this.initDefineSymbol()
    this.initNode()
    this.drawLines()
  }
  render() {
    
    return(
      <div id={this.svgID}>
        {/* <Modal show={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal> */}
      </div>
    )
  }
}
export default Graph