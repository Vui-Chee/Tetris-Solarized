import React from 'react';
import {isOutOfBounds} from '../../../reducers/blocksReducer/movement';
import DisappearingBlock from './DisappearingBlock';

class Block extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.x === this.props.x &&
      nextProps.y === this.props.y &&
      nextProps.color === this.props.color
    ) {
      return false;
    }
    return true;
  }

  render() {
    const {x, y, dim, color, fullRowFlag} = this.props;
    const colors = [
      '#839496',
      '#eee8d5',
      '#b58900',
      '#657b83',
      '#2aa198',
      '#268bd2',
      '#859900',
    ];

    const blockStyle = {
      position: 'absolute',
      width: `${dim}px`,
      height: `${dim}px`,
      top: x * dim + x,
      left: y * dim + y,
      background: colors[color],
      opacity: 1,
      border: 'solid 1px',
      borderColor: 'cyan',
    };

    let blockDom = (
      <div
        className="block"
        style={isOutOfBounds(x, y) || x < 0 ? {} : blockStyle}
      />
    );

    if (fullRowFlag) {
      blockDom = <DisappearingBlock x={x} y={y} />;
    }

    return blockDom;
  }
}

export default Block;
