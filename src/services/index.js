import { toast } from 'react-toastify';
import { http } from "../extensions";
import { setUserInfo, setLoginRequesting } from '../store/reducers/authReducer';
import { setRequesting, setOrders, addOrder, updateOrder } from "../store/reducers/orderReducer";

export const loginUser = credentials => async (dispatch) => {
    try {
        dispatch(setLoginRequesting());

        const { data } = await http.post(`auth/login`, credentials);
        http.setAuthToken(data?.token);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch(setUserInfo(data));
    } catch (error) {
        dispatch(setUserInfo());
        console.log('Error fetching posts:', error);
    }
};

export const fetchOrders = () => async (dispatch) => {
    try {
        dispatch(setRequesting());

        const { data } = await http.get(`order`);
        dispatch(setOrders(data));
    } catch (error) {
        console.log('Error fetching posts:', error);
    }
};

export const createOrder = (order, cb) => async (dispatch) => {
    try {
        const { data } = await http.post(`order`, order);
        if (data) {
            cb();
            dispatch(addOrder(data));
            toast.info('Order Created!', { position: toast.POSITION.TOP_RIGHT });
        }
    } catch (error) {
        cb();
        console.log('Error fetching posts:', error);
    }
};

export const editOrder = (order, cb) => async (dispatch) => {
    try {
        const { data } = await http.put(`order/${order._id}`, order);
        if (data) {
            cb();
            dispatch(updateOrder(order));
            toast.info('Order Updated!', { position: toast.POSITION.TOP_RIGHT });
        }
    } catch (error) {
        cb();
        console.log('Error fetching posts:', error);
    }
};