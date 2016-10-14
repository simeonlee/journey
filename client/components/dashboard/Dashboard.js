import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import Menu from './Menu'
import Header from './Header'
import Circles from './circles/Circles'
import Calendar from './calendar/Calendar'
import WordCloud from './wordcloud/WordCloud'
import ScatterChart from './scatterchart/ScatterChart'
import ActivityFeed from './activityFeed/ActivityFeed'
import Composition from './composition/Composition'
import axios from 'axios'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyWidth: window.innerWidth,
      bodyHeight: window.innerHeight - 60,
      startDelay: 20, // for pensieve
      data: {
        circlesUrl: './data/sample.json', // for pensieve
        wordCloudUrl: './data/wordCloudSample.js',
        elementDelay: 10, // for pensieve
        cumulativeUserJournalData: {} // for pensieve and composition
      },
      selectedDashboardType: 'activityfeed',
      dashboardTypes: {
        activityfeed: {
          display: 'History',
          title: 'Steps taken in your journey',
          subtitle: 'Time travel to'
        },
        scatterchart: {
          display: 'Hours',
          title: 'Interactions by time',
          subtitle: 'Time travel to'
        },
        calendar: {
          display: 'Calendar',
          title: 'Entries in the last year',
          subtitle: 'Calendar settings'
        },
        // pensieve: {
        //   display: 'Pensieve',
        //   title: 'Pensieve',
        //   subtitle: 'Time travel to'
        // },
        composition: {
          display: 'Composition',
          title: 'Your cumulative composition',
          subtitle: 'Time travel to'
        },
        // budget: {
        //   display: 'Budget',
        //   title: 'Your emotional budget',
        //   subtitle: 'Time travel to'
        // },
        // forecast: {
        //   display: 'Forecast',
        //   title: 'Your journey predictions',
        //   subtitle: 'Time travel to'
        // },
        // visionboard: {
        //   display: 'Vision Board',
        //   title: 'Your journey imagery',
        //   subtitle: 'Time travel to'
        // },
      },
      // currentDashboardTitle: 'Entries in the last year',
      // currentDashboardSubtitle: 'Calendar settings',
    };

    this.askServerToRunAnalytics(false); // don't override limiter - wait 12 hours before analysis
    this.aggregateCumulativeUserJournalData();
  }

  componentDidMount() {
    var dashboardBody = document.getElementsByClassName('dashboard-body')[0];
    var bodyWidth = dashboardBody.clientWidth;
    var bodyHeight = dashboardBody.clientHeight;
    this.setState({ bodyWidth, bodyHeight });

    d3.select(window).on('resize', () => {
      var dashboardBody = document.getElementsByClassName('dashboard-body')[0];
      var bodyWidth = dashboardBody.clientWidth;
      var bodyHeight = dashboardBody.clientHeight;
      this.setState({ bodyWidth, bodyHeight });
    });
  }

  aggregateCumulativeUserJournalData() {
    axios.get('/api/cumulative-analytics', {
        params: {
          aggregate: true // set this flag to true to have the server aggregate and format our data
        }
      })
      .then(response => {
        var { data } = this.state;
        data.cumulativeUserJournalData = response.data;
        this.setState({ data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  selectDashboardType(e) {
    var menuItem = e.target.className.split(' ')[1];
    var selectedDashboardType = menuItem.slice(menuItem.indexOf('-') + 1); // get type 'calendar' from 'menu-calendar' class name
    var currentDashboardTitle = this.state.dashboardTypes[selectedDashboardType].title;
    var currentDashboardSubtitle = this.state.dashboardTypes[selectedDashboardType].subtitle;
    this.setState({ selectedDashboardType, currentDashboardTitle, currentDashboardSubtitle });
  }

  askServerToRunAnalytics(override) {
    // Send request to server to run some analytics on user's journal for later retrieval
    axios.post('/api/analytics', {
        override: override || false
      })
      .then(response => {
        // console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  overrideApiRateLimiter() {
    this.askServerToRunAnalytics(true); // override limiter
  }

  render() {
    var dashboard = (() => {
      switch(this.state.selectedDashboardType) {
        case 'calendar':
          return (
            <Calendar
              width={this.state.bodyWidth}
              height={this.state.bodyHeight}
            />
          );
        case 'scatterchart':
          return (
            <ScatterChart />
          );
        case 'pensieve':
          return (
            <Circles
              startDelay={this.state.startDelay}
              elementDelay={this.state.data.elementDelay}
              json={this.state.data.circlesUrl}
              data={this.state.data.cumulativeUserJournalData}
            />
          );
        case 'activityfeed':
          return (
            <ActivityFeed />
          );
        case 'composition':
          return (
            <Composition
              width={this.state.bodyWidth}
              height={this.state.bodyHeight}
              data={this.state.data.cumulativeUserJournalData}
            />
          );
        default:
          return (
            <Calendar />
          );
      }
    })();

    return (
      <div className="dashboard">
        <Menu 
          selectDashboardType={this.selectDashboardType.bind(this)}
          selectedDashboardType={this.state.selectedDashboardType}
          dashboardTypes={this.state.dashboardTypes}
        />
        <div className="dashboard-body">
          {dashboard}
        </div>
        <div
          className="journey-btn journey-btn-secondary journey-btn-sm analyze-btn"
          onClick={this.overrideApiRateLimiter.bind(this)}
        >
          Analyze
        </div>
      </div>
    )
  }
}

/*
<Header 
  title={this.state.currentDashboardTitle}
  subtitle={this.state.currentDashboardSubtitle}
/>
 */