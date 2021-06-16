import React, { useContext, useRef, useState } from "react";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SigninPage.css";
import axios from "axios";
import GoogleLogin from "react-google-login";

function SigninPage(props) {
	const [user, setUser] = useState({ email: "", password: "" });
	const [message, setMessage] = useState(null);
	const history = useHistory();
	const authContext = useContext(AuthContext);
	let timerID = useRef(null);

	const [passwordShown, setPasswordShown] = useState(false);

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const onChange = e => {
		e.preventDefault();
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const notifySuccess = message => {
		toast.success(message.msgBody, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};
	const notifyError = message => {
		toast.error(message.msgBody, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const onSubmit = e => {
		e.preventDefault();
		setMessage(null);
		AuthService.login(user).then(data => {
			const { isAuthenticated, user, message } = data;
			setMessage(message);
			if (isAuthenticated) {
				notifySuccess(message);
				authContext.setUser(user);
				authContext.setIsAuthenticated(isAuthenticated);
				timerID = setTimeout(() => {
					history.push("/mystories");
				}, 3000);
			} else {
				notifyError(message);
			}
		});
		setMessage(null);
	};

	const responseSuccessGoogle = response => {
		axios.defaults.withCredentials = true;
		axios({
			method: "POST",
			url: "/user/googleauth",
			data: { tokenId: response.tokenId },
		})
			.then(res => {
				authContext.setUser(res.data.user);
				authContext.setIsAuthenticated(res.data.isAuthenticated);
				history.push("/mystories");
			})
			.catch(err => console.log(err));
	};
	const responseFailureGoogle = response => {};

	return (
		<div className="login-body">
			<h1 style={{ top: "18%" }}>Sign In</h1>
			<div className="container login">
				<form onSubmit={onSubmit} className="login-form">
					<div className="login-form-username">
						<label htmlFor="email" className="">
							Email:
						</label>

						<div className="login-form-input">
							<i className="fa fa-user-o" aria-hidden="true"></i>
							<input
								type="email"
								name="email"
								onChange={onChange}
								placeholder="Enter Username"
								required
							/>
						</div>
					</div>

					<div className="login-form-password">
						<label htmlFor="password" className="">
							Password:
						</label>
						<div className="login-form-input">
							<i className="fa fa-key" aria-hidden="true"></i>
							<input
								type={passwordShown ? "text" : "password"}
								name="password"
								onChange={onChange}
								placeholder="Enter Password"
								required
							/>
							<i
								className={passwordShown ? "fa fa-eye" : "fa fa-eye-slash"}
								onClick={togglePasswordVisiblity}
								aria-hidden="true"
								style={{ cursor: "pointer" }}></i>
						</div>
					</div>

					<div className="login-form-button">
						<button className="" type="submit">
							Signin
						</button>
					</div>
					<div className="login-form-icons">
						<div className="or">
							<div className="line"></div>
							<p>Or</p>
							<div className="line"></div>
						</div>
						<div className="icons">
							<GoogleLogin
								clientId=process.env.REACT_APP_GOOGLE_CLIENT_ID
								buttonText="Login"
								onSuccess={responseSuccessGoogle}
								onFailure={responseFailureGoogle}
								cookiePolicy={"single_host_origin"}
							/>
						</div>
					</div>
				</form>
				<div className="login-ask">
					<p>If not Register?</p>
					<Link className="login-ask-link" to="/register">
						Register
					</Link>
				</div>
			</div>
			<ToastContainer
				style={{ width: "50%" }}
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
}

export default SigninPage;
