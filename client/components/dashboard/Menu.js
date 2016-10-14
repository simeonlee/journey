import React, { Component } from 'react'

const Menu = ({selectDashboardType, selectedDashboardType, dashboardTypes}) => {
  var menuItems = Object.keys(dashboardTypes).map(type => {
    return (
      <div
        className={'menu-button menu-' + type + (type === selectedDashboardType ? ' selected' : '')}
        onClick={selectDashboardType}
        key={type}
      >
        <div 
          className={'menu-text menu-' + type + ' rotate'}
          onClick={selectDashboardType}
        >
          {dashboardTypes[type].display}
        </div>
      </div>
    )
  })

  return (
    <div className="menu">
      {menuItems}
    </div>
  )
}

export default Menu