import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services';
import { useNavigate } from 'react-router';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isRequesting, userInfo } = useSelector(state => state.auth);

    const [username, setUsername] = useState('demo user');
    const [password, setPassword] = useState('1234');
    const [error, setError] = useState('');

    useEffect(() => {
        userInfo?.isAuthenticated ? navigate('/home/dashboard') : null;
    }, [userInfo, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        dispatch(loginUser({ username, password }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 space-y-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center">Login</h2>
                {error && <div className="text-red-500">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-gray-600">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={`w-full px-4 py-2 rounded-md focus:ring focus:ring-indigo-300 ${isRequesting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                    }`}
                                disabled={isRequesting}
                            >
                                {isRequesting ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
