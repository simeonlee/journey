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
      width: (window.innerWidth / 2),
      height: 120,
      data: [],
      dayDictionary: {}
    }

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    this.colorRange = ['#ECECEC', '#6C7A89'];

    this.dayRects;
    this.SQUARE_LENGTH = 16;
    this.SQUARE_PADDING = 2;
    this.MONTH_LABEL_PADDING = 6;

    this.tooltip;
    this.tooltipEnabled = true;

    this.max = 5;

  }

  componentDidMount() {
    this.setDates();
    this.countData = this.generateTestData(this.dateRange); // generate dummy data of random counts for every day
    this.initD3();
  }

  render() {
    return (
      <div className="calendar"></div>
    )
  }

  initD3() {
    this.setWidth();

    // Define the div for the tooltip
    this.tooltip = d3.select(ReactDOM.findDOMNode(this)).append('div')
      .attr('class', 'calendar-tooltip')
      .style('opacity', 0);

    this.svg = d3.select(ReactDOM.findDOMNode(this))
      .append('svg')
      .attr('width', this.state.width)
      .attr('height', this.state.height)
      .attr('class', 'calendar-svg')
      .style('padding', '36px');

    // this.svg.call(this.tip);

    this.monthLabels = this.svg
      .selectAll('.month')
      .data(this.monthLabelData, d => d.displayText);

    // first enter
    this.monthLabels
      .enter().append('text')
      .attr('class', 'month-name')
      .transition().duration(400)
      .text((d) => { return d.displayText; })
      .attr('x', (d, i) => { return d.monthLabelWeekIndex * (this.SQUARE_LENGTH + this.SQUARE_PADDING); })
      .attr('y', 0); // affix to top

    this.update();
    this.drawWeekdayLabels(); // add M W F to left side of calendar

    d3.select(window).on('resize', () => {
      this.update();
    });
  }

  drawWeekdayLabels() {
    this.days.forEach((day, index) => {
      if (index % 2) {
        this.svg.append('text')
          .attr('class', 'day-initial')
          .attr('transform', 'translate(-8,' + (this.SQUARE_LENGTH + this.SQUARE_PADDING) * (index + 1) + ')')
          .style('text-anchor', 'middle')
          .attr('dy', '2')
          .text(day);
      }
    });
  }

  update() {
    this.setWidth();
    this.svg.attr('width', this.state.width);
    this.setDates();
    this.redrawDayRects();
    this.redrawMonthLabels();
  }

  redrawDayRects() {
    this.dayRects = this.svg
      .selectAll('.day-cell')
      .data(this.dateRange, d => d.toDateString()); // array of days for the last year

    var color = d3.scale.linear()
      .range(this.colorRange)
      .domain([0, this.max]);

    // update
    this.dayRects
      .attr('class', 'day-cell')
      .attr('width', this.SQUARE_LENGTH)
      .attr('height', this.SQUARE_LENGTH)
      .attr('fill', (d, i) => { return this.countData[d] ? color(this.countData[d].count) : '#ECECEC'; }) // assign color to each rect
      .attr('x', (d, i) => {
        var cellDate = moment(d);
        var result = cellDate.week() - this.firstDate.week() + (this.firstDate.weeksInYear() * (cellDate.weekYear() - this.firstDate.weekYear()));
        return result * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
      })
      .attr('y', (d, i) => { return this.MONTH_LABEL_PADDING + d.getDay() * (this.SQUARE_LENGTH + this.SQUARE_PADDING); });

    // enter
    this.dayRects
      .enter().append('rect')
      .attr('class', 'day-cell')
      .style('opacity', 0)
      .attr('width', this.SQUARE_LENGTH)
      .attr('height', this.SQUARE_LENGTH)
      .attr('fill', (d, i) => { return this.countData[d] ? color(this.countData[d].count) : '#ECECEC'; }) // assign color to each rect
      .transition().duration(400)
      .style('opacity', 1)
      .attr('x', (d, i) => {
        var cellDate = moment(d);
        var result = cellDate.week() - this.firstDate.week() + (this.firstDate.weeksInYear() * (cellDate.weekYear() - this.firstDate.weekYear()));
        return result * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
      })
      .attr('y', (d, i) => { return this.MONTH_LABEL_PADDING + d.getDay() * (this.SQUARE_LENGTH + this.SQUARE_PADDING); });

    // exit
    this.dayRects
      .exit()
      .transition().duration(400)
      .style('opacity', 0)
      .remove();


    // Logic for tooltips - display nouns and adjectives for each day
    this.dayRects
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
                return (parseInt(event.pageX - document.getElementsByClassName('calendar-svg')[0].getBoundingClientRect().left)) + 'px';
              })
              .style('top', () => { // TODO: re-calibrate for svg moving around on-screen
                // if cut off by top of screen, show tooltip below cursor
                // else show tooltip above cursor
                // multiplication by 1.1 adds padding to space from cursor
                var optimal = event.pageY - document.getElementsByClassName('calendar-svg')[0].getBoundingClientRect().top;
                if (optimal < 0) {
                  return (event.pageY * 1.1) + 'px';
                } else {
                  return optimal + 'px'
                }
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
          .transition().duration(500)
          .style('opacity', 0); // make disappear
      });
  }

  redrawMonthLabels() {
    // update
    this.monthLabels
      .data(this.monthLabelData, d => d.displayText)
      .attr('x', (d, i) => { return d.monthLabelWeekIndex * (this.SQUARE_LENGTH + this.SQUARE_PADDING); });

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
    var startDate = moment().startOf('day')
      .subtract((this.state.width / (this.SQUARE_LENGTH + 3 * this.SQUARE_PADDING)), 'week')
      .startOf('week')
      .toDate();

    var now = moment().endOf('day').toDate();

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

  // retrieveDayDictionary(date) {
    
  // }

  // // Retrieve real data from database
  // retrieveData() { 
    
  //   axios.get('/api/journal', {
  //       params: {
  //         date: date
  //       }
  //     })
  //     .then((response) => {
  //       var data = response.data;
  //       // console.log(data);

  //       var gratitudes = data.gratitudes ? data.gratitudes.split(',') : ['', '', ''];
  //       var outlooks = data.outlooks ? data.outlooks.split(',') : ['', '', ''];
  //       var affirmations = data.affirmations ? data.affirmations : '';
  //       var amazings = data.amazings ? data.amazings.split(',') : ['', '', ''];
  //       var reflections = data.reflections ? data.reflections.split(',') : ['', '', ''];

  //       this.setState({
  //         gratitudes,
  //         outlooks,
  //         affirmations,
  //         amazings,
  //         reflections
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

}