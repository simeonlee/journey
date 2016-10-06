import React, { Component } from 'react'
import { Col, Grid, Row, Button, FieldGroup } from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'

export class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        
        <Jumbotron className="home-jumbotron">
          <h2 className="col-md-offset-1 col-md-4 jumbo-left-text">Your journey starts here.</h2>
          <p className="col-md-offset-1">Release your thoughts and </p>
          <p>lakjsdlfj;sdlkjal</p>
        </Jumbotron>
        <Jumbotron className="home-jumbotron">
          <p className="col-md-offset-1 col-md-7">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <h1 className="col-md-offset-1 jumbo-right-text">Sign Up!</h1>
        </Jumbotron>
        <Jumbotron className="home-jumbotron">
          <h2 className="col-md-offset-1 col-md-4 left-jumbo-1">Your journey starts here.</h2>
          <p className="col-md-offset-1">Write, Talk, Text - Journaling made easy.</p>
          <p>lakjsdlfj;sdlkjal</p>
        </Jumbotron>
        <Jumbotron className="home-jumbotron">
          <p className="col-md-offset-1 col-md-7">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <h1 className="col-md-offset-1 jumbo-right-text">Journey</h1>
        </Jumbotron>
      </div>
    )

    // return (
    //   <div>
    //     <div id="homepage-background col-md-12">
    //       <div className="home-top-content-container col-md-10 col-md-offset-1">
    //         <div>
    //           <div className="col-md-6">
    //             <h1>Home</h1>
    //           </div>
    //           <div className="col-md-6">
    //             <h1>Sign Up</h1>
    //             <p>
    //               It's Free!
    //             </p>
    //             <SignUp/>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // )
  }
}