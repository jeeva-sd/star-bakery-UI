import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

const BarLeader = ({ seriesData, type }) => {
    const sortedData = Object.entries(seriesData)
        .sort((a, b) => b[1] - a[1]).slice(0, 10)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    const chartOptions = {
        chart: {
            type: 'column',
        },
        title: {
            text: type === 'food' ? 'ITEM' : 'TOP 10 BRANCHES',
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: type === 'food' ? Object.keys(seriesData) : Object.keys(sortedData),
            title: {
                text: type === 'food' ? 'Item Type  ' : 'Branch Name',
            },
        },
        credits: { enabled: false },
        yAxis: {
            title: {
                text: 'Orders',
            },
        },
        series: [
            {
                name: 'Value',
                data: type === 'food' ? Object.values(seriesData) : Object.values(sortedData),
            },
        ],
        plotOptions: {
            column: {
                colorByPoint: true,
            },
        },
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};

BarLeader.propTypes = {
    seriesData: PropTypes.object.isRequired,
    type: PropTypes.string,
};

export default BarLeader;
