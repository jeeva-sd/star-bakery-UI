import { http } from "../extensions";
import { setUserInfo, setLoginRequesting } from '../store/reducers/authReducer';
import { setRequesting, setOrders } from "../store/reducers/orderReducer";

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