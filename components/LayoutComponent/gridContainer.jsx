
import React from 'react';
import Styles from './grid.module.css'

const GridContainer = ({ children }) => {
  return <div className={`${Styles.gridContainer}`}>{children}</div>;
};

export default GridContainer;
