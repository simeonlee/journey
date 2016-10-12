import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import moment from 'moment'
import 'moment-range'
import axios from 'axios'

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height,
      data: [],
      dayDictionary: {}
    }

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    this.colorRange = ['#ECECEC', '#6C7A89'];

    this.SQUARE_PADDING = 3;
    this.SQUARE_LENGTH = (this.state.width - (9 * this.SQUARE_PADDING)) / 8; // 9 pads around 8 squares in a row

    this.max = 5;
    this.dayRectExpanded = false; // set to true when we have something expanded to fill the page
  }

  componentDidMount() {
    this.setDates();
    this.countData = this.generateTestData(this.dateRange); // generate dummy data of random counts for every day
    this.initD3();
  }

  render() {
    var svgStyle = {
      padding: this.SQUARE_PADDING + 'px',
    };
    
    return (
      <div className="calendar">
        <svg
          className="calendar-svg"
          // preserveAspectRatio="xMidYMid meet"
          // preserveAspectRatio="none"
          // viewBox="0 0 750 750" // x, y, width, height
          width={this.state.width}
          height={this.state.height}
          style={svgStyle}
        ></svg>
      </div>
    )
  }

  initD3() {
    this.setWidth();



    // Define the div for the tooltip
    this.tooltip = d3.select(ReactDOM.findDOMNode(this)).append('div')
      .attr('class', 'calendar-tooltip')
      .style('opacity', 0);

    // console.log(this.svg);
    // this.svg = d3.select(ReactDOM.findDOMNode(this))
      // .append('svg')
      // .attr('width', this.state.width)
      // .attr('height', this.state.height)
      // .attr('class', 'calendar-svg')
      // .style('padding', this.SQUARE_PADDING + 'px');

    // this.monthLabels = this.svg
    //   .selectAll('.month')
    //   .data(this.monthLabelData, d => d.displayText);

    // first enter
    // this.monthLabels
    //   .enter().append('text')
    //   .attr('class', 'month-name')
    //   .transition().duration(400)
    //   .text((d) => { return d.displayText; })
    //   .attr('x', 0) // affix to top
    //   .attr('y', (d, i) => { return d.monthLabelWeekIndex * (this.SQUARE_LENGTH + this.SQUARE_PADDING); });

    this.update();
    // this.drawWeekdayLabels(); // add M W F to left side of calendar

    d3.select(window).on('resize', () => {
      this.update();
    });
  }

  // drawWeekdayLabels() {
  //   this.weekdays.forEach((day, index) => {
  //     if (index % 2) {
  //       this.svg.append('text')
  //         .attr('class', 'day-initial')
  //         .attr('transform', 'translate(-8,' + (this.SQUARE_LENGTH + this.SQUARE_PADDING) * (index + 1) + ')')
  //         .style('text-anchor', 'middle')
  //         .attr('dy', '2')
  //         .text(day);
  //     }
  //   });
  // }

  update() {
    this.setWidth();
    // this.svg.attr('width', this.state.width);
    this.setDates();
    this.redrawDayRects();
    // this.redrawMonthLabels();
  }

  redrawDayRects() {
    var color = d3.scale.linear() // function to determine color for each day's rect based on journaling intensity
      .range(this.colorRange)
      .domain([0, this.max]);

    this.days = d3.select('.calendar-svg')
      .selectAll('g')
        .data(this.dateRange, d => d.toDateString()) // array of days for the last year

    this.days
      .enter().append('g')
        .style('opacity', 0)
        .attr('width', this.SQUARE_LENGTH)
        .attr('height', this.SQUARE_LENGTH)
        .transition().duration(400)
        .style('opacity', 1)
        .attr('transform', d => {
          var x = d.getDay() * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
          var cellDate = moment(d);
          var result = cellDate.week() - this.firstDate.week() + (this.firstDate.weeksInYear() * (cellDate.weekYear() - this.firstDate.weekYear()));
          var y = result * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
          return 'translate(' + x + ',' + y + ')';
        });

    this.days
      .append('rect')
        .attr('class', 'day-rect')
        .attr('width', this.SQUARE_LENGTH)
        .attr('height', this.SQUARE_LENGTH)
        .attr('fill', (d, i) => { return this.countData[d] ? color(this.countData[d].count) : '#ECECEC'; }); // assign color to each rect


    this.days
      .append('text')
        .text((d) => { return moment(d).format('MMMM D'); })
        .style('font-size', '10px')
        .style('font-family', 'Cinzel')
        .attr('x', '4px')
        .attr('y', '12px');
        // .attr('x', (d, i) => { return d.getDay() * (this.SQUARE_LENGTH + this.SQUARE_PADDING); })
        // .attr('y', (d, i) => {
        //   var cellDate = moment(d);
        //   var result = cellDate.week() - this.firstDate.week() + (this.firstDate.weeksInYear() * (cellDate.weekYear() - this.firstDate.weekYear()));
        //   return result * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
        // });
        // .attr('x', function(d) { return x(d.value) - 3; })
        // .attr('y', barHeight / 2)
        // .attr('dy', '.35em')

        // .attr('transform', function(d, i) { return 'translate(0,' + i * barHeight + ')'; });

    // this.dayRects = this.svg
    //   .selectAll('.day-rect')
    //   .data(this.dateRange, d => d.toDateString()); // array of days for the last year



    // update
    // this.dayRects
      // .attr('class', 'day-rect')
      // .attr('width', this.SQUARE_LENGTH)
      // .attr('height', this.SQUARE_LENGTH)
      // .attr('fill', (d, i) => { return this.countData[d] ? color(this.countData[d].count) : '#ECECEC'; }) // assign color to each rect
      // .attr('y', (d, i) => {
      //   var cellDate = moment(d);
      //   var result = cellDate.week() - this.firstDate.week() + (this.firstDate.weeksInYear() * (cellDate.weekYear() - this.firstDate.weekYear()));
      //   return result * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
      // })
      // .attr('x', (d, i) => { return d.getDay() * (this.SQUARE_LENGTH + this.SQUARE_PADDING); });

    // enter
    // this.dayRects
      // .enter().append('rect')
      // .attr('class', 'day-rect')
      // .style('opacity', 0)
      // .attr('width', this.SQUARE_LENGTH)
      // .attr('height', this.SQUARE_LENGTH)
      // .attr('fill', (d, i) => { return this.countData[d] ? color(this.countData[d].count) : '#ECECEC'; }) // assign color to each rect
      // .transition().duration(400)
      // .style('opacity', 1)
      // .attr('y', (d, i) => {
      //   var cellDate = moment(d);
      //   var result = cellDate.week() - this.firstDate.week() + (this.firstDate.weeksInYear() * (cellDate.weekYear() - this.firstDate.weekYear()));
      //   return result * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
      // })
      // .attr('x', (d, i) => { return d.getDay() * (this.SQUARE_LENGTH + this.SQUARE_PADDING); });

    // exit
    this.days
      .exit()
      .transition().duration(400)
      .style('opacity', 0)
      .remove();

    // Logic for tooltips - display nouns and adjectives for each day
    this.days
      .on('mouseover', (d, i) => {
        var event = d3.event;
        var width = 200;
        var height = 100; // default height if no content for that day
        var focusDate = moment(d).toISOString();
        axios.get('/api/analytics', {
            params: {
              date: focusDate
            }
          })
          .then(({data}) => {

            // Change height dynamically for amount of content in dictionary
            if (data.dictionary) {
              var dictionary = JSON.parse(data.dictionary);
              var nouns = dictionary['#TYPES#']['NOUN'];
              var adjectives = dictionary['#TYPES#']['ADJ'];
              var nounCount = Object.keys(nouns).length;
              var adjCount = Object.keys(adjectives).length;
              height = 60 + (Math.max(nounCount, adjCount) * 20); // May need to recalibrate
            }

            this.tooltip
              .transition().duration(200)
              .style('opacity', .9); // make appear
            this.tooltip
              .style('width', width + 'px')
              .style('height', height + 'px')
              .style('left', () => {
                var leftOffset = document.getElementsByClassName('calendar-svg')[0].getBoundingClientRect().left;
                return (event.pageX - leftOffset - width / 2) + 'px';
              })
              .style('top', () => {
                // Show tooltip above cursor
                // Multiplication by 1.2 adds padding to space from cursor
                var topOffset = document.getElementsByClassName('calendar-svg')[0].getBoundingClientRect().top;
                return (event.pageY - topOffset - height * 1.2) + 'px';
                // TODO: If tooltip cut off by top of screen, show tooltip below cursor
              })
              .html(() => {
                var title = '<div class="tooltip-title">' + moment(d).format('MMMM D') + '</div>';
                if (data.date && data.date === focusDate) {
                  return title +
                    '<div class="tooltip-category things"><div class="tooltip-subtitle">Things</div>' +
                    Object.keys(dictionary['#TYPES#']['NOUN']).map(noun => {
                      return '<div class="tooltip-list-item">' + noun + '</div>';
                    }).join('') + '</div>' +
                    '<div class="tooltip-category feelings"><div class="tooltip-subtitle">Feelings</div>' +
                    Object.keys(dictionary['#TYPES#']['ADJ']).map(adj => {
                      return '<div class="tooltip-list-item">' + adj + '</div>';
                    }).join('') + '</div>';
                } else {
                  return title +
                    '<div class="tooltip-error">No entries for this day</div>';
                }
              });
            });
      })
      .on('mouseout', (d, i) => {   
        this.tooltip
          .transition().duration(100)
          .style('opacity', 0); // make disappear
      });

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

    // .on('mouseover', function(d) {
    //   d3.select(this).moveToFront();
    // })
    // .on('click', function(d) {
    //   d3.select(this).moveToBack();
    // })

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

  // redrawMonthLabels() {
    // update
    // this.monthLabels
    //   .data(this.monthLabelData, d => d.displayText)
    //   .attr('x', (d, i) => { return d.monthLabelWeekIndex * (this.SQUARE_LENGTH + this.SQUARE_PADDING); });

    /** 
     * TODO:
     * Enter pattern for the month labels create duplicates
     * Need to figure out how to remove old labels
     */

    // enter
    // this.monthLabels
    //   .enter().append('text')
    //   .transition().duration(400)
    //   .attr('class', 'month-name')
    //   .text((d) => { return d.displayText; })
    //   .attr('x', (d, i) => { return d.monthLabelWeekIndex * (this.SQUARE_LENGTH + this.SQUARE_PADDING); })
    //   .attr('y', 0); // affix to top

    // exit
    // this.monthLabels
    //   .exit()
    //   .transition().duration(400)
    //   .style('opacity', 0)
    //   .remove();
  // }

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

    // Generate an array of date objects within the specified range
    this.dateRange = d3.time.days(startDate, now);

    this.firstDate = moment(this.dateRange[0]);

    var monthRange = d3.time.months(moment(startDate).startOf('month').add(1, 'month').toDate(), now); // ignores the first month if the 1st date is after the start of the month

    this.monthLabelData = monthRange.map((d) => {
      var monthLabelWeekIndex = 0;
      this.dateRange.find(function(element, index) {
        monthLabelWeekIndex = index;
        return moment(d).isSame(element, 'month') && moment(d).isSame(element, 'year');
      });
      return {
        monthLabelWeekIndex: Math.floor(monthLabelWeekIndex / 7),
        displayText: this.months[d.getMonth()]
      }
    });
  }

  // Generate fake data for testing
  generateTestData(dateRange) {
    var data = {};
    for (var i = Math.floor(dateRange.length / 5); i < dateRange.length; i++) {
      var date = dateRange[i];
      data[date] = {
        date: date,
        count: Math.floor(Math.random() * (this.max + 1))
      }
    }
    return data;
  }
}