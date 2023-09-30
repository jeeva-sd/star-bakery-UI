import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import moment from 'moment';

const MultiColumnChart = () => {
    const chartRef = useRef(null);
    const { list } = useSelector(state => state.order);

    useEffect(() => {
        if (chartRef.current && list.length > 0) {
            const categories = [];
            const seriesData = {
                Shipped: [],
                Delivered: [],
                Canceled: [],
            }; 

            list.forEach((item) => {
                const month = moment(item.lastUpdateTime).format('MMMM');
                if (!categories.includes(month)) {
                    categories.push(month);
                }

                const orderState = item.orderState;

                if (orderState === 'Shipped') {
                    const existingItem = seriesData.Shipped.find(
                        (entry) => entry.name === month
                    );
                    if (existingItem) {
                        existingItem.data += 1;
                    } else {
                        seriesData.Shipped.push({
                            name: month,
                            data: 1,
                        });
                    }
                } else if (orderState === 'Delivered') {
                    const existingItem = seriesData.Delivered.find(
                        (entry) => entry.name === month
                    );
                    if (existingItem) {
                        existingItem.data += 1;
                    } else {
                        seriesData.Delivered.push({
                            name: month,
                            data: 1,
                        });
                    }
                } else if (orderState === 'Canceled') {
                    const existingItem = seriesData.Canceled.find(
                        (entry) => entry.name === month
                    );
                    if (existingItem) {
                        existingItem.data += 1;
                    } else {
                        seriesData.Canceled.push({
                            name: month,
                            data: 1,
                        });
                    }
                }
            });

            categories.sort((a, b) => moment(a, 'MMMM').toDate() - moment(b, 'MMMM').toDate());

            Highcharts.chart(chartRef.current, {
                chart: {
                    type: 'column',
                },
                title: {
                    text: 'Monthly Orders by Order State',
                },
                xAxis: {
                    categories,
                },
                yAxis: {
                    title: {
                        text: 'Number of Orders',
                    },
                },
                legend: {
                    enabled: true,
                },
                credits: {
                    enabled: false,
                },
                series: Object.entries(seriesData).map(([orderState, data]) => ({
                    name: orderState,
                    data: data.map((entry) => entry.data),
                })),
            });
        }
    }, [list]);

    return <div ref={chartRef}></div>;
};

export default MultiColumnChart;
