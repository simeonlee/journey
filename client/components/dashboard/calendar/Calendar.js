import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import moment from 'moment'
import 'moment-range'
import axios from 'axios'
import scatterChartDummyData from './data/dummyDataForHourlyScatterChart.js'

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height,
      countData: {},
      // data: [],
      dayDictionary: {}
    }
    this.SQUARE_PADDING = 3;
    this.SQUARE_LENGTH = (this.state.width - (8 * this.SQUARE_PADDING)) / 7; // 8 pads around 7 squares in a row
    this.colorRange = ['#FFFFFF', '#4183D7']; // white to royal blue scale
    this.max = 13; // max number of interactions possible in a day - used for ranging our color
    this.dayRectExpanded = false; // set to true when we have something expanded to fill the page
  }

  componentDidMount() {
    this.setDates();
    this.initD3();

    axios.get('/api/entries', {
      params: {
        limit: 100
      }
    })
    .then(entries => {
      var data = entries.data;
      var countData = {}
      for (var i = 0; i < data.length; i++) {
        countData[moment(data[i].datetime).toDate()] = data[i];
        countData[moment(data[i].datetime).toDate()].count = data[i].eveningCount + data[i].morningCount;
      }
      this.setState({ countData });
      this.update();
    })
  }

  render() {
    var svgStyle = {
      padding: this.SQUARE_PADDING + 'px',
    };
    
    return (
      <div className="calendar">
        <svg
          className="calendar-svg"
          viewBox={'0 ' + this.SQUARE_LENGTH + ' ' + this.state.width + ' ' + this.state.height} // x, y, width, height
          width={this.state.width}
          height={this.state.height}
          style={svgStyle}
        >
          <g
            className="calendar-group"
          ></g>
        </svg>
      </div>
    )
  }

  initD3() {
    this.setWidth();
    this.update();
    d3.select(window).on('resize', () => {
      this.update();
    });
  }

  update() {
    this.setWidth();
    this.setDates();
    this.redrawDayRects();
  }

  redrawDayRects() {
    var color = d3.scale.linear() // function to determine color for each day's rect based on journaling intensity
      .range(this.colorRange)
      .domain([0, this.max]);

    this.days = d3.select('.calendar-group')
      .selectAll('g')
        .attr('class', 'day-groups')
        .data(this.dateRange, d => d.toDateString()); // array of days for the last year

    // Group enter
    this.days
      .enter().append('g')
        .style('opacity', 0)
        .attr('width', this.SQUARE_LENGTH)
        .attr('height', this.SQUARE_LENGTH)
        .transition().duration(400)
        .style('opacity', 1)
        .attr('transform', d => {
          var x = d.getDay() * (this.SQUARE_LENGTH + this.SQUARE_PADDING); // .getDay() returns day of week 0 - 6... subtract 7 to get in quadrant II around origin (0,0)
          var cellDate = moment(d);
          var result = cellDate.week() - this.firstDate.week() + (this.firstDate.weeksInYear() * (cellDate.weekYear() - this.firstDate.weekYear()));
          var y = result * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
          return 'translate(' + x + ',' + y + ')';
        });

    // Group exit
    this.days
      .exit()
      .transition().duration(400)
      .style('opacity', 0)
      .remove();

    this.days
      .append('rect')
        .attr('class', 'day-rects')
        .attr('width', this.SQUARE_LENGTH)
        .attr('height', this.SQUARE_LENGTH)
        .attr('fill', d => { return this.state.countData[d] ? color(this.state.countData[d].count) : '#fff'; }); // assign color to each rect

    this.days
      .append('text')
        .text(d => { return moment(d).format('MMMM D'); })
        .style('font-size', '8px')
        .style('font-family', 'Cinzel')
        .attr('x', '8px')
        .attr('y', '12px');


    
        
    /* BEGIN THINGS AND FEELINGS CODE */

    var firstLineY = 5;
    var lineIncrement = 4;

    // console.log(this.SQUARE_LENGTH); // 87.375

    var things = this.days
      .append('g')
        .attr('transform', 'translate(8, 20)')

    things
      .append('text')
        .text('Things')
        .style('font-size', '4px')
        .style('font-weight', '400');

    things.each((date, i) => { // do this for each group
      axios.get('/api/analytics', {
          params: {
            date: moment(date).toISOString()
          }
        })
      .then(({data}) => {
        if (data.dictionary) {
          var dictionary = JSON.parse(data.dictionary);
          var nouns = dictionary['#TYPES#']['NOUN'];
          var adjectives = dictionary['#TYPES#']['ADJ'];

          var index = 0;

          Object.keys(nouns).forEach((noun, i) => {
            things
              .filter((d, i) => { // select the right cell
                return d === date;
              })
              .append('text')
                .text(noun.toLowerCase())
                .style('font-size', '3px')
                .attr('y', firstLineY + (i * lineIncrement) + 'px');
          })
        } else {
          return 'No entries for this day';
        }
      });
    })

    var feelings = this.days
      .append('g')
        .attr('transform', 'translate(' + this.SQUARE_LENGTH / 2 + ', 20)') // move the feelings over to the right

    feelings
      .append('text')
        .text('Feelings')
        .style('font-size', '4px')
        .style('font-weight', '400')

    feelings.each((date, i) => { // do this for each group
      axios.get('/api/analytics', {
          params: {
            date: moment(date).toISOString()
          }
        })
      .then(({data}) => {
        if (data.dictionary) {
          var dictionary = JSON.parse(data.dictionary);
          var nouns = dictionary['#TYPES#']['NOUN'];
          var adjectives = dictionary['#TYPES#']['ADJ'];

          var index = 0;

          Object.keys(adjectives).forEach((adjective, i) => {
            feelings
              .filter((d, i) => { // select the right cell
                return d === date;
              })
              .append('text')
                .text(adjective.toLowerCase())
                .style('font-size', '3px')
                .attr('y', firstLineY + (i * lineIncrement) + 'px');
          })
        } else {
          return 'No entries for this day';
        }
      });
    })

    // Below prototype methods allow our selected square to move forward and backward of other squares
    // http://bl.ocks.org/eesur/4e0a69d57d3bfc8a82c2
    // https://github.com/wbkd/d3-extended
    d3.selection.prototype.moveToFront = function() {  
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };
    d3.selection.prototype.moveToBack = function() {  
      return this.each(function() { 
        var firstChild = this.parentNode.firstChild; 
        if (firstChild) { 
            this.parentNode.insertBefore(this, firstChild); 
        } 
      });
    };

    this.days
      .on('click', clickedDate => {
        var active = this.dayRectExpanded ? false : true; // flag to determine if rect is expanded currently or not
        var duration = 400; // transition duration

        // Expand the selected rect to the middle of the calendar
        this.days
          .filter((d, i) => { 
            return d === clickedDate;
          })
          .moveToFront()
          .transition().duration(duration)
          .attr('transform', d => {


            
            // If we are expanding a rect, move to (1, 1) coordinates of calendar
            var originalTranslateX = d.getDay() * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
            var expandedTranslateX = this.SQUARE_LENGTH + this.SQUARE_PADDING;
            var translateX = active ? expandedTranslateX : originalTranslateX;

            var cellDate = moment(d);
            var result = cellDate.week() - this.firstDate.week() + (this.firstDate.weeksInYear() * (cellDate.weekYear() - this.firstDate.weekYear()));
            var originalY = result * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
            var expandedY = this.SQUARE_LENGTH + this.SQUARE_PADDING;
            var translateY = active ? expandedY : originalY;

            // Multiply scale by however many times it takes to be the proportion to SVG that we desire
            // Specifically, expand to fill up 5 days worth but 4 paddings worth of space
            var expandedScaleX = ((this.SQUARE_LENGTH * 5 + this.SQUARE_PADDING * 4) / this.SQUARE_LENGTH);
            var expandedScaleY = ((this.SQUARE_LENGTH * 5 + this.SQUARE_PADDING * 4) / this.SQUARE_LENGTH);

            var scaleX = active ? expandedScaleX : 1;
            var scaleY = active ? expandedScaleY : 1;

            return 'translate(' + translateX + ',' + translateY + ') scale(' + scaleX + ',' + scaleY + ')';
          });

        // When you click on other squares when there is an expanded square, transition the squares back to normal
        this.days
          .filter((d, i) => { 
            return d !== clickedDate;
          })
          .moveToBack()
          .transition().duration(duration)
          .attr('transform', d => {
            var translateX = d.getDay() * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
            var cellDate = moment(d);
            var result = cellDate.week() - this.firstDate.week() + (this.firstDate.weeksInYear() * (cellDate.weekYear() - this.firstDate.weekYear()));
            var translateY = result * (this.SQUARE_LENGTH + this.SQUARE_PADDING);

            var scaleX = 1;
            var scaleY = 1;

            return 'translate(' + translateX + ',' + translateY + ') scale(' + scaleX + ',' + scaleY + ')';
          });

        // Toggle our flag
        this.dayRectExpanded = active;
      })
  }

  setWidth() {
    // Set width (get size from parent div)
    var parentNode = d3.select(ReactDOM.findDOMNode(this).parentElement);
    this.setState({ width: parentNode[0][0].offsetWidth });
  }

  setDates() {
    /**
     * Divide this.state.width by 'SQUARE_LENGTH' and 'SQUARE_PADDING' to get
     * how many weeks there should be with plenty of negative space left
     */
    var numRows = 0;
    var calendarHeight = this.SQUARE_PADDING;
    while ((calendarHeight + this.SQUARE_LENGTH + this.SQUARE_PADDING) < this.state.height) {
      numRows++;
      calendarHeight += (this.SQUARE_LENGTH + this.SQUARE_PADDING);
    }
    var startDate = moment().startOf('day')
      .subtract(numRows, 'week')
      .startOf('week')
      .toDate();
    var now = moment().endOf('week').toDate();
    this.dateRange = d3.time.days(startDate, now); // Generate an array of date objects within the specified range
    this.firstDate = moment(this.dateRange[0]);
  }

  // Generate fake data for testing
  // generateTestData(dateRange) {
  //   var data = {};
  //   for (var i = Math.floor(dateRange.length / 5); i < dateRange.length; i++) {
  //     var date = dateRange[i];
  //     data[date] = {
  //       date: date,
  //       count: 0
  //     }
  //   }
  //   return data;
  // }
}