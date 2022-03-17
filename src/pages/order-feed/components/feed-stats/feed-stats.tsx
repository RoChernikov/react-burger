import styles from './feed-stats.module.scss';
import React, { FC } from 'react';
import StatusList from '../status-list/status-list';
import TotalStat from '../total-stat/total-stat';
import { IFeedStats } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const FeedStats: FC<IFeedStats> = ({
  total,
  totalToday,
  doneOrders,
  pendingOrders
}) => {
  return (
    <section className={styles.feedStats}>
      <div className={styles.feedStats__statusLists}>
        <StatusList title="Готовы:" orders={doneOrders} hightlight />
        <StatusList title="В работе:" orders={pendingOrders} />
      </div>
      <TotalStat title="Выполнено за все время:">
        {total.toLocaleString()}
      </TotalStat>
      <TotalStat title="Выполнено за сегодня:">{totalToday}</TotalStat>
    </section>
  );
};

export default FeedStats;
