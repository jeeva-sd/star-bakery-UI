import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment/moment';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { createOrder, editOrder } from '../../services';

const itemPrices = {
    Cake: 500,
    Cookies: 50,
    Muffins: 100
};

const OrderForm = ({ isOpen, onClose, edit = false, data = null }) => {
    const dispatch = useDispatch();

    const [validationErrors, setValidationErrors] = useState({});
    const [save, setSave] = useState(false);
    const [formData, setFormData] = useState({
        itemType: '',
        orderState: '',
        lastUpdateTime: '',
        branch: '',
        customer: '',
    });

    useEffect(() => {
        if (!data) return;
        setFormData({ ...data });
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setValidationErrors({ ...validationErrors, [name]: '' });
    };

    const cb = () => {
        setSave(false);
        onClose();
    };

    const handleOrder = orderData => {
        setSave(true);

        if (!edit) {
            dispatch(createOrder({ ...orderData, lastUpdateTime: moment().toISOString(), price: itemPrices[formData.itemType] }, cb));
        }
        else {
            dispatch(editOrder({ ...data, ...orderData, lastUpdateTime: moment().toISOString(), price: itemPrices[formData.itemType] }, cb));
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const errors = {};
        if (!formData.customer) {
            errors.customer = 'Customer name is required.';
        }
        if (!formData.itemType) {
            errors.itemType = 'Item type is required.';
        }
        if (!formData.branch) {
            errors.branch = 'Branch name is required.';
        }
        if (!formData.orderState) {
            errors.orderState = 'Order state is required.';
        }
        if (Object.keys(errors).length === 0) {
            handleOrder(formData);
        } else {
            setValidationErrors(errors);
        }
    };

    return (
        <Transition show={isOpen} as={React.Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={onClose}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    </Transition.Child>

                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <h2 className="text-xl font-semibold">{edit ? 'Edit Order' : 'Create New Order'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mt-4">
                                    <label htmlFor="customer" className="block text-gray-600 font-semibold">
                                        Customer Name
                                    </label>
                                    <input
                                        type="text"
                                        id="customer"
                                        name="customer"
                                        value={formData.customer}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-md ${validationErrors.customer ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {validationErrors.customer && (
                                        <p className="text-red-500">{validationErrors.customer}</p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="itemType" className="block text-gray-600 font-semibold">
                                        Item Type
                                    </label>
                                    <select
                                        id="itemType"
                                        name="itemType"
                                        value={formData.itemType}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-md ${validationErrors.itemType ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Select Item Type</option>
                                        <option value="Cake">Cake</option>
                                        <option value="Muffins">Muffins</option>
                                        <option value="Cookies">Cookies</option>
                                    </select>
                                    {validationErrors.itemType && (
                                        <p className="text-red-500">{validationErrors.itemType}</p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="branch" className="block text-gray-600 font-semibold">
                                        Branch Name
                                    </label>
                                    <input
                                        type="text"
                                        id="branch"
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-md ${validationErrors.branch ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {validationErrors.branch && (
                                        <p className="text-red-500">{validationErrors.branch}</p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="orderState" className="block text-gray-600 font-semibold">
                                        Order State
                                    </label>
                                    <select
                                        id="orderState"
                                        name="orderState"
                                        value={formData.orderState}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-md ${validationErrors.orderState ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Select Order State</option>
                                        <option value="Created">Created</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Canceled">Canceled</option>
                                    </select>
                                    {validationErrors.orderState && (
                                        <p className="text-red-500">{validationErrors.orderState}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={save}
                                    className={`mt-4 text-white px-4 py-2 rounded-md ${save ? 'bg-blue-200' : 'bg-blue-500'}`}
                                >
                                    {save ? (edit ? 'Updating' : 'Creating') : (edit ? 'Update' : 'Create')}
                                </button>
                            </form>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

OrderForm.propTypes = {
    order: PropTypes.any,
    isOpen: PropTypes.any,
    onClose: PropTypes.any,
    edit: PropTypes.any,
    data: PropTypes.any,
};

export default OrderForm;