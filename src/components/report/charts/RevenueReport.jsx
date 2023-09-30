import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import moment from 'moment';

const RevenueReport = () => {
    const chartRef = useRef(null);
    const { list } = useSelector(state => state.order);

    useEffect(() => {
        if (chartRef.current && list.length > 0) {
            const categories = [];
            const seriesData = {};

            list.forEach((item) => {
                const month = moment(item.lastUpdateTime).format('MMMM');
                if (!categories.includes(month)) {
                    categories.push(month);
                }

                if (!seriesData[item.itemType]) {
                    seriesData[item.itemType] = [];
                }

                const existingItem = seriesData[item.itemType].find(
                    (entry) => entry.name === month
                );

                if (existingItem) {
                    existingItem.data += item.price;
                } else {
                    seriesData[item.itemType].push({
                        name: month,
                        data: item.price,
                    });
                }
            });

            categories.sort((a, b) => moment(a, 'MMMM').month() - moment(b, 'MMMM').month());

            Highcharts.chart(chartRef.current, {
                chart: {
                    type: 'column',
                },
                title: {
                    text: 'Monthly Revenue by ItemType',
                },
                xAxis: {
                    categories,
                },
                yAxis: {
                    title: {
                        text: 'Revenue',
                    },
                },
                legend: {
                    enabled: true,
                },
                credits: {
                    enabled: false,
                },
                series: Object.entries(seriesData).map(([itemType, data]) => ({
                    name: itemType,
                    data: data.map((entry) => entry.data),
                })),
            });
        }
    }, [list]);

    return <div ref={chartRef}></div>;
};

export default RevenueReport;
