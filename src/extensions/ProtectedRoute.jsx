// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ Component, ...rest }) => {
    // const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth.userInfo);

    // useEffect(() => {
    //     if (!isAuthenticated) navigate('/');
    // }, [isAuthenticated, navigate]);

    return isAuthenticated ? <Component {...rest} /> : <Navigate to='/' replace></Navigate>;
};

ProtectedRoute.propTypes = {
    Component: PropTypes.object.isRequired,
    rest: PropTypes.string.isRequired,
};

export default ProtectedRoute;
