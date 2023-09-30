import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ Component, ...rest }) => {
    const { isAuthenticated } = useSelector((state) => state.auth.userInfo);
    return isAuthenticated ? <Component {...rest} /> : <Navigate to='/' replace></Navigate>;
};

ProtectedRoute.propTypes = {
    Component: PropTypes.any,
    rest: PropTypes.string,
};

export default ProtectedRoute;
