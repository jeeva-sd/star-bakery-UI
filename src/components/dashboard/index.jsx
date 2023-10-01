import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import OrderCountOverTimeChart from './charts/TimeSeries';
import StatusChart from './charts/Status';

const Dashboard = () => {
    const { list, dateParams, isRequesting } = useSelector(state => state.order);

    const graphData = useMemo(() => {
        if (!list || list.length === 0) return [];

        const orders = {};
        const price = {};
        const cake = {};
        const cookie = {};
        const Muffin = {};

        const status = {};
        const branchCount = {};

        list.forEach((order) => {
            const lastUpdateTime = moment(order.lastUpdateTime).format('DD MMM YYYY');
            const { itemType } = order;

            if (!orders[lastUpdateTime]) orders[lastUpdateTime] = 0;
            if (!price[lastUpdateTime]) price[lastUpdateTime] = 0;

            if (!cake[lastUpdateTime]) cake[lastUpdateTime] = 0;
            if (!cookie[lastUpdateTime]) cookie[lastUpdateTime] = 0;
            if (!Muffin[lastUpdateTime]) Muffin[lastUpdateTime] = 0;

            if (!status[order.orderState]) status[order.orderState] = 0;
            if (!branchCount[order.branch]) branchCount[order.branch] = 0;

            if (itemType === 'Cake') cake[lastUpdateTime]++;
            else if (itemType === 'Cookies') cookie[lastUpdateTime]++;
            else if (itemType === 'Muffins') Muffin[lastUpdateTime]++;

            orders[lastUpdateTime]++;
            price[lastUpdateTime] += order.price;

            const startDate = moment(dateParams[0]);
            const endDate = moment(dateParams[1]);
            const dateToCheck = moment(lastUpdateTime);
            const isWithinRange = dateToCheck.isSame(startDate, 'day') || dateToCheck.isBetween(startDate, endDate, null, '[]');

            if (isWithinRange) {
                branchCount[order.branch]++;
                status[order.orderState]++;
            }
        });

        const orderData = [];
        const priceData = [];

        const cakeOrders = [];
        const cookieOrders = [];
        const MuffinOrders = [];

        const statusData = [
            {
                name: 'Created',
                y: Object.values(status).reduce((total, value) => total + value, 0),
                sliced: true,
                selected: true,
            },
            ['Shipped', status['Shipped']],
            ['Delivered', status['Delivered']],
            ['Canceled', status['Canceled']],
        ];

        const branchCountData = [];

        Object.keys(orders)
            .filter(e => {
                const startDate = moment(dateParams[0]);
                const endDate = moment(dateParams[1]);
                const dateToCheck = moment(e);

                const isWithinRange = dateToCheck.isSame(startDate, 'day') || dateToCheck.isBetween(startDate, endDate, null, '[]');
                return isWithinRange;
            })
            .sort((a, b) => new Date(a).valueOf() - new Date(b).valueOf())
            .forEach((timestamp) => {
                const date = moment(timestamp, 'DD MMM YYYY').unix() * 1000;
                orderData.push([date, orders[timestamp]]);
                priceData.push([date, price[timestamp]]);

                cakeOrders.push([date, cake[timestamp]]);
                cookieOrders.push([date, cookie[timestamp]]);
                MuffinOrders.push([date, Muffin[timestamp]]);
            });

        const graphData = { orderData, priceData, cakeOrders, cookieOrders, MuffinOrders, statusData, branchCountData };

        return graphData;
    }, [list, dateParams]);

    return (
        <div className='pt-28 bg-slate-100 flex flex-wrap justify-center'>
            <div className='w-full flex flex-wrap justify-center mx-5 gap-5 mb-5'>
                <div className='rounded-md bg-white p-5 shadow-md lg:w-5/12 md:w-5/12 w-11/12'>
                    <OrderCountOverTimeChart seriesData={graphData} type={'price'} isRequesting={isRequesting} />
                </div>
                <div className='rounded-md bg-white p-5 shadow-md lg:w-5/12 md:w-5/12 w-11/12'>
                    <StatusChart seriesData={graphData?.statusData} isRequesting={isRequesting} />
                </div>
            </div>

            <div className='mx-5 shadow-md flex flex-wrap bg-white p-5 mb-5 w-10/12 justify-center rounded-md'>
                <div className='w-full p-5'><OrderCountOverTimeChart seriesData={graphData} type={'order'} /></div>
            </div>
        </div>
    );
};

export default Dashboard;