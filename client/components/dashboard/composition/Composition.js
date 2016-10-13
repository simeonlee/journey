import React from 'react'
import { Treemap } from 'recharts'

const COLORS = [
  '#9FBCD7', // PRINCE BLUE
  '#87D37C', // GOSSIP
  '#E9D460', // CONFETTI
  '#F1A9A0', // WAX FLOWER
  '#DCC6E0', // SNUFF
  '#BDC3C7', // SILVER SAND
];

const CustomizedContent = (props) => {
  const { root, depth, x, y, width, height, index, payload, colors, rank, name } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? colors[Math.floor(index / root.children.length * 6)] : 'none',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {
        depth === 1 ?
        <text
          x={x + 10}
          y={y + 26}
          fill="#fff"
          fontSize={16}
          fillOpacity={0.9}
          className="treemap-element-label"
        >
          {name}
        </text>
        : null
      }
      {
        depth === 2 ?
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
          className="treemap-group-label"
        >
          {name}
        </text>
        : null
      }
    </g>
  );
};

const Composition = ({ width, height, data }) => {
  return (
    <div className="composition">
      <Treemap
        className="composition-treemap"
        width={width}
        height={height}
        data={data}
        dataKey="size"
        ratio={4/3}
        stroke="#fff"
        fill="#8884d8"
        content={<CustomizedContent colors={COLORS}/>}
      />
    </div>
  )
}

export default Composition

/*
{
  depth === 1 ?
  <text
    x={x + 4}
    y={y + 18}
    fill="#fff"
    fontSize={16}
    fillOpacity={0.9}
  >
    {index + 1}
  </text>
  : null
}
 */