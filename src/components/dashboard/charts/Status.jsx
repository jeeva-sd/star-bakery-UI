import { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import PropTypes from 'prop-types';
Highcharts3D(Highcharts);

const StatusChart = ({ seriesData, isRequesting }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = Highcharts.chart(chartRef.current, {
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

            if (isRequesting) chart.showLoading();

            if (!isRequesting && !(seriesData?.length > 0)) {
                chart.renderer.text('No data for this range.', 230, 200)
                    .css({
                        color: '#718096',
                        fontSize: '16px'
                    })
                    .add();
            }
        }
    }, [seriesData, isRequesting]);

    return <div ref={chartRef} />;
};

StatusChart.propTypes = {
    seriesData: PropTypes.any,
    isRequesting: PropTypes.bool,
};

export default StatusChart;
