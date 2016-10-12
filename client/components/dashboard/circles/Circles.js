import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'

export default class Circles extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initD3();
  }

  // componentWillUnmount() {
  //   clearInterval(this.resizeTimer);
  // }

  render() {
    return (
      <div>
        <div className="dashboard-footer circles-footer">
          <div className="quote">
            <div className="footer-text quote-text">I use the Pensieve. One simply siphons the excess thoughts from one's mind, pours them into the basin, and examines them at one's leisure. It becomes easier to spot patterns and links, you understand, when they are in this form.</div>
            <div className="footer-text quote-attribution">- Albus Dumbledore, <span>Harry Potter and the Goblet of Fire</span></div>
          </div>
        </div>
      </div>
    )
  }
  
  initD3() {
    this.svg = d3.select(ReactDOM.findDOMNode(this))
      .insert('svg')
      .attr('class', 'circles-svg')
      .append('g');

    this.circlesGroup = this.svg.append('g');
    this.textsGroup = this.svg.append('g');

    // init pack layout
    this.pack = d3.layout.pack()
      .value(function(d) { return d.size; });

    // update layout and element positions
    this.update();

    // load data and draw chart
    this.load(this.props);

    // click event handler (zoom)
    d3.select(window).on('click', function() {
      this.zoom(this.data);
    }.bind(this));

    // resize event
    // var ns = Math.random();
    // d3.select(window).on('resize.' + ns, this.resizeHandler);
    d3.select(window).on('resize', () => {
      this.update();
      this.draw(this.props);
    });
  }

  update() {
    // set width, height and radius (get size from parent div)
    var parentNode = d3.select(ReactDOM.findDOMNode(this).parentElement);
    var parentWidth = parentNode[0][0].offsetWidth;
    this.w = this.h = this.r = parentWidth;

    // ranges
    this.x = d3.scale.linear().range([0, this.r]);
    this.y = d3.scale.linear().range([0, this.r]);

    // // Set Radius
    // this.r = (this.w < this.h) ? this.w : this.h;

    // // Ranges
    // this.x = d3.scale.linear().range([0, this.r]);
    // this.y = d3.scale.linear().range([0, this.r]);

    // set svg element's size and position
    d3.select(ReactDOM.findDOMNode(this)).select('svg')
      .attr('width', this.w)
      .attr('height', this.h)
      .select('g')
      .attr('transform', 'translate(' + (this.w - this.r) / 2 + ',' + (this.h - this.r) / 2 + ')');

    // run pack layout and update its size
    this.pack.size([this.r, this.r]);
    if (this.data) { this.nodes = this.pack.nodes(this.data); }
  }

  load(props) {
    d3.json(props.json, function(data) {
      this.data = data;
      this.nodes = this.pack.nodes(this.data);
      this.draw(props);
    }.bind(this));
  }

  // d3 layout (enter-update-exit pattern)
  draw(props) {
    var startDelay = props.startDelay || 0;
    var elementDelay = props.elementDelay || 50;

    var circles = this.circlesGroup.selectAll('circle')
      .data(this.nodes);

    // enter
    circles.enter().append('circle')
      .attr('class', function(d) {
        return d.children ? 'parent' : 'child';
      })
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .attr('r', function(d) { return 0; })
      .on ('click', function(d) {
        return this.zoom(this.data == d ? this.data : d);
      }.bind(this))
      .transition().duration(400);

    // update
    circles.transition().duration(400)
      .delay(function(d, i) {
        return startDelay + (i * elementDelay);
      })
      .attr('class', function(d) {
        return d.children ? 'parent' : 'child';
      })
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .attr('r', function(d) { return d.r; })

    // exit
    circles.exit().transition().duration(200)
      .attr('r', 0)
      .style('opacity', 0)
      .remove();

    // texts: enter - update - exit
    var texts = this.textsGroup
      .selectAll('text')
      .data(this.nodes);

    // enter
    texts.enter().append('text')
      .style('opacity', 0)
      .attr('x', function(d) { return d.x; })
      .attr('y', function(d) { return d.y; })
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .transition().duration(400)

    texts.transition().duration(400)
      .attr('class', function(d) {
        return d.children ? 'parent' : 'child';
      })
      .attr('x', function(d) { return d.x; })
      .attr('y', function(d) { return d.y; })
      .delay(function(d, i) {
        return startDelay + (i * elementDelay);
      })
      .style('opacity', function(d) {
        return d.r > 20 ? 1 : 0;
      })
      .text(function(d) {
        return d.name;
      });

    // exit
    texts.exit().transition().duration(200)
      .style('opacity', 0)
      .remove();
  }

  zoom(d, i) {
    var k = this.r / d.r / 2;
    this.x.domain([d.x - d.r, d.x + d.r]);
    this.y.domain([d.y - d.r, d.y + d.r]);

    var t = this.svg.transition()
      .duration(d3.event.altKey ? 7500 : 750);

    t.selectAll('circle')
      .attr('cx', function(d) { return this.x(d.x); }.bind(this))
      .attr('cy', function(d) { return this.y(d.y); }.bind(this))
      .attr('r', function(d) { return k * d.r; });

    t.selectAll('text')
      .attr('x', function(d) { return this.x(d.x); }.bind(this))
      .attr('y', function(d) { return this.y(d.y); }.bind(this))
      .text(function(d) { return d.name; })
      .style('opacity', function(d) {
        return k * d.r > 20 ? 1 : 0;
      });

    var node = d;
    d3.event.stopPropagation();
  }

  // resizeHandler() {
  //   clearInterval(this.resizeTimer);
  //   this.resizeTimer = setTimeout(() => {
  //     this.update();
  //     this.draw(this.props);
  //   }, 200);
  // }
}