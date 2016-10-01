import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 600,
      height: 120,
      data: []
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

    this.svg = d3.select(ReactDOM.findDOMNode(this))
      .append('svg');

    d3.select(ReactDOM.findDOMNode(this)).select('svg')
      .attr('width', this.state.width)
      .attr('height', this.state.height)
      .attr('class', 'calendar-svg')
      .style('padding', '36px');

    this.update();
    this.drawWeekdayLabels(); // add M W F to left side of calendar

    // resize event
    // var ns = Math.random();
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

    this.dayRects.append('title').text((d) => { return d; }); // add title to mouse cursor upon hover
    
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
      .transition().duration(200)
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
      .transition().duration(200)
      .style('opacity', 0)
      // .attr('width', 0)
      .remove();

    this.customizeDayRects();
  }

  customizeDayRects() {
    // var max = 0;

    // this.dayRects.append('title').text((d) => { return d; }); // add title to mouse cursor upon hover
    
    // var testData = this.generateTestData(this.dateRange); // generate dummy data of random counts for every day

    // for (var x in testData) {
    //   testData[x].count > max && (max = testData[x].count);
    // }

    // this.color = d3.scale.linear()
    //   .range(this.colorRange)
    //   .domain([0, max]);

    // this.daysOfChart = this.dayRects.data().map((day) => {
    //   return day.toDateString();
    // });

    // this.dayRects.filter((d) => {
    //   return this.daysOfChart.indexOf(d.toDateString()) > -1;
    // }).attr('fill', (d, i) => {
    //   return testData[d] ? this.color(testData[d].count) : '#ECECEC';
    // }); // assign color to each rect
  }

  redrawMonthLabels() {
    this.monthLabels = this.svg
      .selectAll('.month')
      .data(this.monthLabelData, d => d.displayText);

    // enter
    this.monthLabels
      .enter().append('text')
      .transition().duration(400)
      .attr('class', 'month-name')
      .text((d) => {
        return d.displayText;
      })
      .attr('x', (d, i) => {
        return d.monthLabelWeekIndex * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
      })
      .attr('y', 0); // affix to top

    // exit
    this.monthLabels
      .exit()
      .transition().duration(400)
      .style('opacity', 0)
      .remove();
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
      .subtract((this.state.width / (this.SQUARE_LENGTH + 2 * this.SQUARE_PADDING)), 'week')
      .startOf('week')
      .toDate();

    var now = moment().endOf('day').toDate();

    // Generate an array of date objects within the specified range
    this.dateRange = d3.time.days(startDate, now);
    // console.log(this.dateRange);

    this.firstDate = moment(this.dateRange[0]);

    var monthRange = d3.time.months(moment(this.startDate).startOf('month').add(1, 'month').toDate(), now); // ignores the first month if the 1st date is after the start of the month

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

  generateTestData(dateRange) {
    var data = {};
    // console.log(dateRange[0]);
    for (var i = Math.floor(dateRange.length / 5); i < dateRange.length; i++) {
      var date = dateRange[i];
      // console.log(date);
      data[date] = {
        date: date,
        count: Math.floor(Math.random() * (this.max + 1))
      }
      // console.log(data[date]);
    }
    console.log('testData', data);
    return data;
  }

}