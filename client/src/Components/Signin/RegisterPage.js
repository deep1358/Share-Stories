import React, { useState, useRef, useEffect, useContext } from "react";
import AuthService from "../../Services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "./SigninPage";
import "./SigninPage.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { AuthContext } from "../../Context/AuthContext";

axios.defaults.withCredentials = true;

function RegisterPage(props) {
	const [user, setUser] = useState({
		username: "",
		email: "",
		confirmPassword: "",
		password: "",
	});
	const [message, setMessage] = useState(null);
	let timerID = useRef(null);
	const history = useHistory();
	const [passwordShown, setPasswordShown] = useState(false);
	const [passwordShown1, setPasswordShown1] = useState(false);
	const authContext = useContext(AuthContext);

	useEffect(() => {
		return () => {
			clearTimeout(timerID);
		};
	}, []);

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

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const togglePasswordVisiblity1 = () => {
		setPasswordShown1(passwordShown1 ? false : true);
	};

	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const resetForm = () => {
		setUser({ username: "", password: "", confirmPassword: "", email: "" });
	};

	const onSubmit = e => {
		e.preventDefault();
		setMessage(null);
		AuthService.register(user).then(data => {
			const { message } = data;
			setMessage(message);
			if (!message.msgError) {
				notifySuccess(message);
				resetForm();
				timerID = setTimeout(() => {
					history.push("/signin");
				}, 5000);
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
			<h1>Register</h1>
			<div className="container login">
				<form
					action="/register"
					className="login-form"
					method="post"
					onSubmit={onSubmit}>
					<div className="login-form-username">
						<label htmlFor="username" className="">
							Username:
						</label>

						<div className="login-form-input">
							<i className="fa fa-user-o" aria-hidden="true"></i>
							<input
								type="text"
								name="username"
								onChange={onChange}
								placeholder="Enter Username"
								value={user.username}
								required
							/>
						</div>
					</div>
					<div className="login-form-password">
						<label htmlFor="email" className="">
							Email:
						</label>
						<div className="login-form-input">
							<i className="fa fa-envelope-o" aria-hidden="true"></i>
							<input
								type="email"
								name="email"
								onChange={onChange}
								placeholder="Enter Email"
								value={user.email}
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
								value={user.password}
								required
							/>
							<i
								className={passwordShown ? "fa fa-eye" : "fa fa-eye-slash"}
								onClick={togglePasswordVisiblity}
								aria-hidden="true"
								style={{ cursor: "pointer" }}></i>
						</div>
					</div>
					<div className="login-form-password">
						<label htmlFor="password" className="">
							Confirm Password:
						</label>
						<div className="login-form-input">
							<i className="fa fa-key" aria-hidden="true"></i>
							<input
								type={passwordShown1 ? "text" : "password"}
								name="confirmPassword"
								onChange={onChange}
								placeholder="Enter Confirm Password"
								value={user.confirmPassword}
								required
							/>
							<i
								className={passwordShown1 ? "fa fa-eye" : "fa fa-eye-slash"}
								onClick={togglePasswordVisiblity1}
								aria-hidden="true"
								style={{ cursor: "pointer" }}></i>
						</div>
					</div>
					<div className="login-form-button">
						<button className="" type="submit">
							Register
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
					<p>If not Have an Account?</p>
					<Link className="login-ask-link" to="/signin">
						SignIn
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

export default RegisterPage;
