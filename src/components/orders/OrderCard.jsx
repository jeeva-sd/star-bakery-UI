import { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import OrderForm from './OrderForm';

const OrderCard = ({ order }) => {
    const { itemType, orderState, customer, lastUpdateTime } = order;

    const [show, setShow] = useState(false);

    return (
        <div className="border border-gray-200 shadow rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold">{itemType}</div>
                <div className={`px-2 py-1 rounded-md ${getOrderStateColor(orderState)}`}>
                    {orderState}
                </div>
            </div>
            <div className="text-sm text-gray-600">Customer: {customer}</div>
            <div className="text-sm text-gray-600">Last Update: {moment(lastUpdateTime).format('DD MMM YYYY')}</div>
            <button className="text-blue-500 underline mt-2" onClick={() => setShow(true)}>Edit</button>

            <OrderForm isOpen={show} onClose={() => setShow(false)} onSubmit={setShow} edit={true} data={order} />
        </div>
    );
};

const getOrderStateColor = (orderState) => {
    const colorMap = {
        Created: 'bg-yellow-200 text-yellow-800',
        Shipped: 'bg-blue-200 text-blue-800',
        Delivered: 'bg-green-200 text-green-800',
        Canceled: 'bg-red-200 text-red-800',
    };

    return colorMap[orderState] || 'bg-gray-200 text-gray-800';
};

OrderCard.propTypes = {
    order: PropTypes.any,
};

export default OrderCard;
