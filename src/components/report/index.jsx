import moment from 'moment';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import BranchChart from './charts/BranchReport';
import StatusReport from './charts/StatusReport';
import RevenueReport from './charts/RevenueReport';

const Report = () => {
  const { list, dateParams, isRequesting } = useSelector(state => state.order);

  const graphData = useMemo(() => {
    if (!list || list.length === 0) return [];

    let cake = 0;
    let cookie = 0;
    let Muffin = 0;

    const branchCount = {};

    list.forEach((order) => {
      const lastUpdateTime = moment(order.lastUpdateTime).format('DD MMM YYYY');
      const { itemType } = order;

      const startDate = moment(dateParams[0]);
      const endDate = moment(dateParams[1]);
      const dateToCheck = moment(lastUpdateTime);

      if (dateToCheck.isBetween(startDate, endDate)) {
        if (itemType === 'Cake') cake++;
        else if (itemType === 'Cookies') cookie++;
        else if (itemType === 'Muffins') Muffin++;

        if (!branchCount[order.branch]) branchCount[order.branch] = 0;
        branchCount[order.branch]++;
      }
    });

    const data = {
      cake, cookie, Muffin, branchCount
    };

    return data;
  }, [list, dateParams]);

  const { cake, cookie, Muffin } = graphData;

  return (
    <div className='pt-28 flex flex-wrap justify-center w-full bg-slate-50 gap-5 mb-5'>
      <div className='w-10/12 bg-white p-5 rounded-md shadow-md'>
        <BranchChart seriesData={graphData?.branchCount} isRequesting={isRequesting} />
      </div> 

      <div className='w-10/12 bg-white p-5 rounded-md shadow-md'>
        <StatusReport seriesData={{ Muffin, cake, cookie }} type={'food'} isRequesting={isRequesting} />
      </div>

      <div className='w-10/12 bg-white p-5 rounded-md shadow-md'>
        <RevenueReport seriesData={{ Muffin, cake, cookie }} type={'food'} isRequesting={isRequesting} />
      </div>
    </div>
  );
};

export default Report;