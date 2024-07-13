import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import SocialComponent from '../components/SocialComponent';
import { Helmet } from 'react-helmet';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    title: "User Login Successful.",
                    showClass: {
                        popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                        `
                    },
                    hideClass: {
                        popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                        `
                    }
                });
                navigate(from, { replace: true });
            });
    };

    const handleValidateCaptcha = e => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6">
            <Helmet>
                <title>My Book | LogIn</title>
            </Helmet>
           <div className='flex '>
           <div >
              <img className='w-0 md:w-[500px] md:h-[800px]' src="https://img.freepik.com/free-vector/bike-guy-wattpad-book-cover_23-2149452163.jpg?t=st=1720860748~exp=1720864348~hmac=eac5ba0da4b21d89d52ab89a5d971988afec05ee3bc3cbb329f93c147a8d76ce&w=740" alt="" />
            </div>
            <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:max-w-md">
                <div className="md:flex">
                    <div className="w-full p-4 px-6 py-10">
                        <h2 className="text-3xl font-bold text-center mb-4">Login Now</h2>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input 
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input 
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full"
                                    required
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
                                    onBlur={handleValidateCaptcha}
                                    type="text"
                                    name="captcha"
                                    placeholder="Type the above captcha"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control mt-6">
                                <input
                                    disabled={disabled}
                                    className="btn btn-primary w-full"
                                    type="submit"
                                    value="Login"
                                />
                            </div>
                        </form>
                        <div className="mt-4 text-center">
                            <p className="text-sm">
                                New here? <Link to="/signup" className="text-blue-500">Create a new account</Link>
                            </p>
                        </div>
                        <div className="mt-4">
                            <SocialComponent />
                        </div>
                    </div>
                </div>
            </div>
           </div>
        </div>
    );
};

export default Login;
