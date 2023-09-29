import  { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d'; 
Highcharts3D(Highcharts);

// eslint-disable-next-line react/prop-types
const StatusChart = ({seriesData}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            Highcharts.chart(chartRef.current, {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0,
                    },
                },
                title: {
                    text: 'ORDER STATUS',
                    align: 'center',
                },
                accessibility: {
                    point: {
                        valueSuffix: '%',
                    },
                },
                credits: { enabled: false },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}',
                        },
                    },
                },
                series: [{
                    type: 'pie',
                    name: 'count',
                    data: seriesData
                }],
            });
        }
    }, [seriesData]);

    return <div ref={chartRef} />;
};

export default StatusChart;
