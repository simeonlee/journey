import React, { Component } from 'react'
import BasicInteraction from './BasicInteraction'

export default class Timeline extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="timeline">
        <BasicInteraction />
        <BasicInteraction />
        <BasicInteraction />
        <BasicInteraction />
        <BasicInteraction />
      </div>
    )
  }
}