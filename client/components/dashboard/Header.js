import React, { Component } from 'react'
import { Glyphicon } from 'react-bootstrap';

const Header = ({title, subtitle}) => {
  return (
    <div className="header">
      <div className="header-title">{title}</div>
      <div className="header-subtitle">{subtitle}<Glyphicon glyph="triangle-bottom" /></div>
    </div>
  )
}

export default Header