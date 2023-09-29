import { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

// eslint-disable-next-line react/prop-types
const OrderCountOverTimeChart = ({ seriesData, type }) => {
    const chartRef = useRef(null);

    // eslint-disable-next-line react/prop-types
    const { orderData, priceData, cakeOrders, cookieOrders, MuffinOrders } = seriesData;

    useEffect(() => {
        if (chartRef && chartRef.current) {
            Highcharts.chart(chartRef.current, {
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: type === 'order' ? 'ORDERS' : 'REVENUE',
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        day: '%b %e, %Y',
                    },
                },
                yAxis: {
                    title: {
                        text: 'Number of Orders',
                    },
                },
                legend: {
                    enabled: type !== 'order' ? false : true
                },
                tooltip: {
                    dateTimeLabelFormats: {
                        day: '%b %e, %Y',
                    },
                },
                credits: { enabled: false },
                plotOptions: {
                    area: {
                        fillColor: type !== 'order' && {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        stacking: 'normal',
                        marker: {
                            radius: 1
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                series: [
                    {
                        type: 'area',
                        name: type === 'order' ? 'Total Orders' : 'Price',
                        data: type === 'order' ? orderData : priceData,
                    },
                    {
                        type: 'area',
                        name: 'Cookies',
                        data: cookieOrders,
                    },
                    {
                        type: 'area',
                        name: 'Muffins',
                        data: MuffinOrders,
                    },
                    {
                        type: 'area',
                        name: 'Cakes',
                        data: cakeOrders,
                    },
                ].slice(0, type !== 'order' ? 1 : 5),
            });
        }
    }, [type, MuffinOrders, cakeOrders, cookieOrders, orderData, priceData]);

    return <div ref={chartRef} />;
};

export default OrderCountOverTimeChart;
