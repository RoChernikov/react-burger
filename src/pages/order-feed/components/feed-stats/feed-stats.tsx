import styles from './feed-stats.module.css';
import React, { FC } from 'react';
import StatusList from '../status-list/status-list';
import TotalStat from '../total-stat/total-stat';
//--------------------------------------------------------------------------------
const number = 28752; //-------------hardcode

const FeedStats: FC = () => {
  return (
    <section className={styles.feedStats}>
      <div className={styles.statusLists}>
        <StatusList title="Готовы:" hightlight />
        <StatusList title="В работе:" />
      </div>
      <TotalStat title="Выполнено за все время:">
        {number.toLocaleString()}
      </TotalStat>
      <TotalStat title="Выполнено за сегодня:">138</TotalStat>
    </section>
  );
};

export default FeedStats;
