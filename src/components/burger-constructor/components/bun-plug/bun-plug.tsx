import styles from './bun-plug.module.scss';
import React, { FC } from 'react';
import { IBunBlug } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const BunPlug: FC<IBunBlug> = ({ children, position, border }) => (
  <div
    className={
      position === 'top'
        ? `${styles.plug} ${styles.plug_pos_top}`
        : position === 'bottom'
        ? `${styles.plug} ${styles.plug_pos_bottom}`
        : `${styles.plug}`
    }
    style={{ borderColor: `${border}` }}>
    {children}
  </div>
);

export default BunPlug;
