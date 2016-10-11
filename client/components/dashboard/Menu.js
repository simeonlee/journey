import React, { Component } from 'react'

const Menu = ({selectDashboardType, selectedDashboardType, dashboardTypes}) => {
  var menuItems = Object.keys(dashboardTypes).map(type => {
    return (
      <div
        className={'menu-item menu-' + type + (type === selectedDashboardType ? ' selected' : '')}
        onClick={selectDashboardType}
        key={type}
      >
        {dashboardTypes[type].display}
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