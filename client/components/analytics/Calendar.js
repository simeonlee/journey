import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 900,
      height: 120,
      data: []
    }

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    this.dayRects;
    this.SQUARE_LENGTH = 16;
    this.SQUARE_PADDING = 2;
    this.MONTH_LABEL_PADDING = 6;
    // this.cellSize = 17;

    this.tooltip;
    this.tooltipEnabled = true;
    
    this.colorRange = ['#ECECEC', '#6C7A89'];

    this.percent = d3.format(".1%");
    this.format = d3.time.format("%Y-%m-%d");
  }

  componentDidMount() {
    this.setWidth();
    this.setDates();
    this.initD3();
  }

  componentWillUnmount() {
    clearInterval(this.resizeTimer);
  }

  render() {
    return (
      <div className="calendar"></div>
    )
  }

  setWidth() {
    // Set width (get size from parent div)
    var parentNode = d3.select(ReactDOM.findDOMNode(this).parentElement);
    this.setState({ width: parentNode[0][0].offsetWidth });
  }

  generateTestData(dateRange) {
    var data = {};
    for (var i = dateRange.length / 5; i < dateRange.length; i++) {
      data[dateRange[i]] = { count: Math.floor(Math.random() * 4) }
    }
    console.log(data);
    return data;
  }

  setDates() {
    /**
     * Divide this.state.width by 'SQUARE_LENGTH' and 'SQUARE_PADDING' to get
     * how many weeks there should be with plenty of negative space left
     */
    this.startDate = moment().startOf('day')
      .subtract((this.state.width / (this.SQUARE_LENGTH + 2 * this.SQUARE_PADDING)), 'week')
      .toDate();

    this.now = moment().endOf('day').toDate();

    // Generate an array of date objects within the specified range
    this.dateRange = d3.time.days(this.startDate, this.now); 
    console.log(this.dateRange);

    // Generate dummy data of random counts for every day
    this.setState.data = this.generateTestData(this.dateRange);

    this.firstDate = moment(this.dateRange[0]);

    this.monthRange = d3.time.months(moment(this.startDate).startOf('month').add(1, 'month').toDate(), this.now); // ignores the first month if the 1st date is after the start of the month

    this.monthLabelData = this.monthRange.map((d) => {
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

  initD3() {
    this.svg = d3.select(ReactDOM.findDOMNode(this))
      .append('svg');

    d3.select(ReactDOM.findDOMNode(this)).select('svg')
      .attr('width', this.state.width)
      .attr('height', this.state.height)
      .attr('class', 'calendar-svg')
      .style('padding', '36px');








    this.dayRects = this.svg.selectAll('.day-cell')
      .data(this.dateRange); // array of days for the last year

    // console.log(this.dayRects.data());

    // enter
    this.dayRects.enter().append('rect')
      .attr('class', 'day-cell')
      .attr('width', this.SQUARE_LENGTH)
      .attr('height', this.SQUARE_LENGTH)
      // .attr('x', (d) => { return d3.time.weekOfYear(d) * this.cellSize; })
      // .attr('y', (d) => { return d.getDay() * this.cellSize; });
      .attr('x', (d, i) => {
        var cellDate = moment(d);
        var result = cellDate.week() - this.firstDate.week() + (this.firstDate.weeksInYear() * (cellDate.weekYear() - this.firstDate.weekYear()));
        return result * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
      })
      .attr('y', (d, i) => { return this.MONTH_LABEL_PADDING + d.getDay() * (this.SQUARE_LENGTH + this.SQUARE_PADDING); })
      .transition().duration(400);


    this.dayRects.append('title')
      .text((d) => { return d; });


    // this.max = d3.max(this.svg.selectAll('.day-cell').data(), function (d) { return d.count; }); // max data value
    this.max = d3.max(this.state.data, function(d) {
      console.log(d);
      return d.count;
    }); // max data value
    console.log('max', this.max);

    // color range
    var colorRange = this.colorRange;

    this.color = d3.scale.linear()
      .range(colorRange)
      .domain([0, this.max]);

    this.daysOfChart = this.dayRects.data().map((day) => {
      return day.toDateString();
    });

    // This code makes sure only the number of squares required shows up in calendar
    this.dayRects.filter((d) => {
      return this.daysOfChart.indexOf(d.toDateString()) > -1;
    }).attr('fill', (d, i) => {
      // return this.color(this.dayRects.data()[i].count);
      console.log(this.state.data);
      console.log(d);
      console.log(i);
      // console.log(this.state.data[d]);
      if (this.state.data[d]) {
        console.log(this.state.data[d].count);
        console.log(this.color(this.state.data[d].count));
        return this.color(this.state.data[d].count);
      } else {
        return '#ECECEC';
      }
    });

    


    this.monthLabels = this.svg.selectAll('.month')
      .data(this.monthLabelData);

    // enter
    this.monthLabels.enter().append('text')
      .attr('class', 'month-name')
      .text((d) => {
        return d.displayText;
      })
      .attr('x', (d, i) => {
        return d.monthLabelWeekIndex * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
      })
      .attr('y', 0) // affix to top
      .transition().duration(400);

    this.update();
 

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

    this.resizeHandler = function() {
      clearInterval(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        console.log(this);
        this.update();
        // this.draw(this.props);
      }, 200);
    }

    // resize event
    var ns = Math.random();
    d3.select(window).on('resize.' + ns, () => {
      this.setWidth();
      this.setDates();
      this.update();
    });

  }

  update() {
    // this.setWidth();
    // this.setDates();

    d3.select(ReactDOM.findDOMNode(this)).select('svg')
      .attr('width', this.state.width);
      // .attr('height', this.state.height)
      // .attr('class', 'calendar-heatmap')
      // .style('padding', '36px');

    this.redrawDayRects();
    this.redrawMonthLabels();
  }

  redrawDayRects() {
    this.daysOfChart = this.dayRects.data().map((day) => {
      return day.toDateString();
    });

    // This code makes sure only the number of squares required shows up in calendar
    this.dayRects.filter((d) => {
      return this.daysOfChart.indexOf(d.toDateString()) > -1;
    });
    
    // update
    this.dayRects
      .data(this.dateRange) // array of days for the last year
      .transition().duration(400)
      .delay((d, i) => {
        return this.props.startDelay + (i * this.props.elementDelay);
      })
      .attr('x', (d, i) => {
        var cellDate = moment(d);
        var result = cellDate.week() - this.firstDate.week() + (this.firstDate.weeksInYear() * (cellDate.weekYear() - this.firstDate.weekYear()));
        return result * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
      })
      .attr('y', (d, i) => { return this.MONTH_LABEL_PADDING + d.getDay() * (this.SQUARE_LENGTH + this.SQUARE_PADDING); });

    // exit
    this.dayRects.exit().transition().duration(200)
      .attr('width', 0)
      .style('opacity', 0)
      .remove();
  }

  redrawMonthLabels() {
    console.log(this.monthLabelData);

    // update
    this.monthLabels
      .data(this.monthLabelData)
      .transition().duration(400)
      .style('opacity', 0)
      .transition().duration(400)
      .style('opacity', 1)
      .delay((d, i) => {
        return this.props.startDelay + (i * this.props.elementDelay);
      })
      .text((d) => {
        return d.displayText;
      })
      .attr('x', (d, i) => {
        return d.monthLabelWeekIndex * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
      })
      .attr('y', 0); // affix to top

    // exit
    this.monthLabels.exit().transition().duration(400)
      .style('opacity', 0)
      .remove();
  }
}



// BOSTOCK
// this.svg = d3.select(ReactDOM.findDOMNode(this)).selectAll('svg')
//   .data(d3.range(2016, 2017))
//   .enter().append('svg')
//     .attr('width', this.state.width)
//     .attr('height', this.state.height)
//     // .attr('class', 'RdYlGn')
//   .append('g')
//     .attr('transform', 'translate(' + ((this.state.width - this.cellSize * 53) / 2) + ',' + (this.state.height - this.cellSize * 7 - 1) + ')');



// this.dayRects = this.svg.selectAll('.day')
  // .data((d) => { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  // .enter().append('rect')
    // .attr('class', 'day')
    // .attr('width', this.cellSize)
    // .attr('height', this.cellSize)
    // .attr('fill', 'gray')
    // .attr('x', (d) => { return d3.time.weekOfYear(d) * this.cellSize; })
    // .attr('y', (d) => { return d.getDay() * this.cellSize; })
    // .datum(this.format);

// this.svg.append('text')
//   .attr('transform', 'translate(-6,' + this.cellSize * 3.5 + ')rotate(-90)')
//   .style('text-anchor', 'middle')
//   .text((d) => { return d; });


// monthPath(t0) {
//   var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0);
//   var d0 = t0.getDay();
//   var w0 = d3.time.weekOfYear(t0);
//   var d1 = t1.getDay();
//   var w1 = d3.time.weekOfYear(t1);
//   return "M" + (w0 + 1) * this.cellSize + "," + d0 * this.cellSize
//     + "H" + w0 * this.cellSize + "V" + 7 * this.cellSize
//     + "H" + w1 * this.cellSize + "V" + (d1 + 1) * this.cellSize
//     + "H" + (w1 + 1) * this.cellSize + "V" + 0
//     + "H" + (w0 + 1) * this.cellSize + "Z";
// }


// this.color = d3.scale.quantize()
//   .domain([-.05, .05])
//   .range(d3.range(11).map((d) => { return 'q' + d + '-11'; }));


// if (typeof onClick === 'function') {
//   this.dayRects.on('click', function(d) {
//     var count = this.countForDate(d);
//     onClick({ date: d, count: count });
//   })
// }

// this.countForDate(d) {
//   var count = 0;
//   var match = this.dayRects.data().find(function(element, index) {
//     return moment(element.date).isSame(d, 'day');
//   });
//   if (match) {
//     count = match.count;
//   }
//   return count;
// }


// this.svg.selectAll('.month')
//   .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
//   .enter().append('path')
//     .attr('class', 'month')
//     .attr('d', this.monthPath);

// d3.csv('dji.csv', function(error, csv) {
//   if (error) throw error;

//   var data = d3.next()
//     .key(function(d) { return d.Date; })
//     .rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
//     .map(csv);

//   this.rect.filter(function(d) { return d in data; })
//     .attr('class', function(d) { return 'day ' + this.color(data[d]); })
//     .select('title')
//       .text(function(d) { return d + ': ' + this.percent(data[d]); });
// })
