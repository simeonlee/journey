import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          date: new Date(),
          count: 2
        },
        {
          date: new Date(),
          count: 2
        },
      ]
    }
  }

  componentDidMount() {
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

  initD3() {
    // set width (get size from parent div)
    // var parentNode = d3.select(ReactDOM.findDOMNode(this).parentElement);
    // this.width = parentNode[0][0].offsetWidth;
    // this.width = 990;
    // this.height = 200;
    // this.cellSize = 17;
    // this.update = function() {
      var parentNode = d3.select(ReactDOM.findDOMNode(this).parentElement);
      this.width = parentNode[0][0].offsetWidth;
      this.height = 200;

      this.SQUARE_LENGTH = 16;
      this.SQUARE_PADDING = 2;
      this.MONTH_LABEL_PADDING = 6;

      /**
       * Divide this.width by 'SQUARE_LENGTH' and 'SQUARE_PADDING' to get
       * how many weeks there should be with plenty of negative space left
       */
      this.yearAgo = moment().startOf('day')
        .subtract((this.width / (this.SQUARE_LENGTH + 2 * this.SQUARE_PADDING)), 'week')
        .toDate();

      console.log(this.yearAgo);

      this.dateRange = d3.time.days(this.yearAgo, this.now); // generates an array of date objects within the specified range
      this.monthRange = d3.time.months(moment(this.yearAgo).startOf('month').add(1, 'month').toDate(), this.now); // ignores the first month if the 1st date is after the start of the month
      this.firstDate = moment(this.dateRange[0]);
      this.now = moment().endOf('day').toDate();

      // NON-BOSTOCK
      this.svg = d3.select(ReactDOM.findDOMNode(this))
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('class', 'calendar-heatmap')
        .style('padding', '36px');



      // // set width, height and radius (get size from parent div)
      // var parentNode = d3.select(ReactDOM.findDOMNode(this).parentElement);
      // var parentWidth = parentNode[0][0].offsetWidth;
      // this.w = this.h = this.r = parentWidth;

      // ranges
      // this.x = d3.scale.linear().range([0, this.r]);
      // this.y = d3.scale.linear().range([0, this.r]);

      // // Set Radius
      // this.r = (this.w < this.h) ? this.w : this.h;

      // // Ranges
      // this.x = d3.scale.linear().range([0, this.r]);
      // this.y = d3.scale.linear().range([0, this.r]);

      // set svg element's size and position
      // d3.select(ReactDOM.findDOMNode(this)).select('svg')
      //   .attr('width', this.w)
      //   .attr('height', this.h)
      //   .select('g')
      //   .attr('transform', 'translate(' + (this.w - this.r) / 2 + ',' + (this.h - this.r) / 2 + ')');

      // run pack layout and update its size
      // this.pack.size([this.r, this.r]);
      // if (this.data) { this.nodes = this.pack.nodes(this.data); }
    // }


    // this.update();
    // at size 16, one week is approximately equal to 18 pixel widths in window size


    var colorRange = this.colorRange = ['#D8E6E7', '#218380'];
    this.tooltipEnabled = true;

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    

    // /**
    //  * Divide this.width by 'SQUARE_LENGTH' and 'SQUARE_PADDING' to get
    //  * how many weeks there should be with plenty of negative space left
    //  */
    // this.yearAgo = moment().startOf('day')
    //   .subtract((this.width / (this.SQUARE_LENGTH + 2 * this.SQUARE_PADDING)), 'week')
    //   .toDate();

    // this.dateRange = d3.time.days(this.yearAgo, this.now); // generates an array of date objects within the specified range
    // this.monthRange = d3.time.months(moment(this.yearAgo).startOf('month').add(1, 'month').toDate(), this.now); // ignores the first month if the 1st date is after the start of the month
    // this.firstDate = moment(this.dateRange[0]);

    this.tooltip;
    this.dayRects;

    // drawChart();

    // function drawChart() {
    // }

    // return chart;

    this.percent = d3.format(".1%");
    this.format = d3.time.format("%Y-%m-%d");

    // BOSTOCK
    // this.svg = d3.select(ReactDOM.findDOMNode(this)).selectAll('svg')
    //   .data(d3.range(2016, 2017))
    //   .enter().append('svg')
    //     .attr('width', this.width)
    //     .attr('height', this.height)
    //     // .attr('class', 'RdYlGn')
    //   .append('g')
    //     .attr('transform', 'translate(' + ((this.width - this.cellSize * 53) / 2) + ',' + (this.height - this.cellSize * 7 - 1) + ')');



    // this.svg.append('text')
    //   .attr('transform', 'translate(-6,' + this.cellSize * 3.5 + ')rotate(-90)')
    //   .style('text-anchor', 'middle')
    //   .text((d) => { return d; });





    this.dayRects = this.svg.selectAll('.day-cell')
      .data(this.dateRange); // array of days for the last year

    this.dayRects.enter().append('rect')
      .attr('class', 'day-cell')
      .attr('width', this.SQUARE_LENGTH)
      .attr('height', this.SQUARE_LENGTH)
      .attr('fill', 'gray')
      // .attr('x', (d) => { return d3.time.weekOfYear(d) * this.cellSize; })
      // .attr('y', (d) => { return d.getDay() * this.cellSize; });
      .attr('x', (d, i) => {
        var cellDate = moment(d);
        var result = cellDate.week() - this.firstDate.week() + (this.firstDate.weeksInYear() * (cellDate.weekYear() - this.firstDate.weekYear()));
        return result * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
      })
      .attr('y', (d, i) => { return this.MONTH_LABEL_PADDING + d.getDay() * (this.SQUARE_LENGTH + this.SQUARE_PADDING); });


    this.max = d3.max(this.svg.selectAll('.day-cell').data(), function (d) { return d.count; }); // max data value

    // color range
    this.color = d3.scale.linear()
      .range(colorRange)
      .domain([0, this.max]);


    // this.color = d3.scale.quantize()
    //   .domain([-.05, .05])
    //   .range(d3.range(11).map((d) => { return 'q' + d + '-11'; }));


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

    this.dayRects.append('title')
      .text((d) => { return d; });





    this.daysOfChart = this.dayRects.data().map((day) => {
      return day.toDateString();
    });


    // This code makes sure only the number of squares required shows up in calendar
    this.dayRects.filter((d) => {
      return this.daysOfChart.indexOf(d.toDateString()) > -1;
    }).attr('fill', (d, i) => {
      return this.color(this.dayRects.data()[i].count);
    });

    // if (typeof onClick === 'function') {
    //   this.dayRects.on('click', function(d) {
    //     var count = this.countForDate(d);
    //     onClick({ date: d, count: count });
    //   })
    // }

    this.monthLabels = this.svg.selectAll('.month')
      .data(this.monthRange)
      .enter().append('text')
      .attr('class', 'month-name')
      .text((d) => {
        return this.months[d.getMonth()];
      })
      .attr('x', (d, i) => {
        var matchIndex = 0;
        this.dateRange.find(function(element, index) {
          matchIndex = index;
          return moment(d).isSame(element, 'month') && moment(d).isSame(element, 'year');
        });

        return Math.floor(matchIndex / 7) * (this.SQUARE_LENGTH + this.SQUARE_PADDING);
      })
      .attr('y', 0); // affix to top

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
        this.update();
        // this.draw(this.props);
      }, 200);
    }

    // resize event
    var ns = Math.random();
    d3.select(window).on('resize.' + ns, this.resizeHandler);


    

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

  }

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

}