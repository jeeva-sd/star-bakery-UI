import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ Component, ...rest }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth.userInfo);

    useEffect(() => {
        if (!isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <Component {...rest} /> : <></>;
};

export default ProtectedRoute;
