import React from 'react';
import Styles from './grid.module.css';

const GridItem = ({ children, xs, sm, md, lg, xl }) => {
  const style = {
    '--sm': xs || sm,
    '--md': md || sm,
    '--lg': lg || md,
    '--xl': xl || lg,
  };

  let classNames = [Styles.gridItem];
  if (sm) classNames.push(Styles.gridItemSm);
  if (md) classNames.push(Styles.gridItemMd);
  if (lg) classNames.push(Styles.gridItemLg);
  if (xl) classNames.push(Styles.gridItemXl);

  return (
    <div className={classNames.join(' ')} style={style}>
      {children}
    </div>
  );
};

export default GridItem;
