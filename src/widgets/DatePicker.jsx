import { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { SlCalender } from 'react-icons/sl';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateDateParams } from '../store/reducers/orderReducer';

const DatePicker = ({ hasReport }) => {
    const dispatch = useDispatch();

    const today = moment();
    const startDay = moment().month(4).date(1).startOf('day');

    const [dateRange, setDateRange] = useState([startDay.toDate(), today.toDate()]);
    const [startDate, endDate] = dateRange;

    return (
        <div className="relative">
            <SlCalender className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 z-30" />
            <ReactDatePicker
                disabled={hasReport}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setDateRange(update);
                    console.log(update, 'update');
                    dispatch(updateDateParams(update));
                }}
                withPortal
                className={`border pl-12 bg-gray-50 shadow-inner border-gray-100 ${hasReport ? 'cursor-not-allowed' : 'cursor-pointer'} rounded-md p-2 w-64 focus:outline-none`}
            />
        </div>
    );
};

DatePicker.propTypes = {
    hasReport: PropTypes.any,
};

export default DatePicker;
