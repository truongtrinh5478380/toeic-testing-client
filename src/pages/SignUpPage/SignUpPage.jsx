import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import './SignUpPage.scss'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/base-url";

export default function SignUpPage() {
	const navigate = useNavigate()
	const [isSuccess, setIsSuccess] = useState(false);
	const [formSignUp, setFormSignUp] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [errors, setErrors] = useState({});
	const validateSignUpForm = () => {
		let errors = {};
		if (!formSignUp.username) {
			errors.username = 'Username is required';
		} else if (formSignUp.username.length < 3) {
			errors.username = 'Username must be at least 3 characters'
		}
		if (!formSignUp.email) {
			errors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formSignUp.email)) {
			errors.email = 'Email is invalid';
		}
		if (!formSignUp.password) {
			errors.password = 'Password is required';
		} else if (formSignUp.password.length < 6) {
			errors.password = 'Password must be at least 8 characters long';
		}
		if (!formSignUp.confirmPassword) {
			errors.confirmPassword = 'Password is required';
		} else if (formSignUp.password !== formSignUp.confirmPassword) {
			errors.confirmPassword = 'Password incorrect';
		}
		setErrors(errors);
		return Object.keys(errors).length === 0;
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateSignUpForm()) {
			// Send data to server
			//TODO fetch api
			let res = await axios.post(`${BASE_URL}/auth/register`, {
				username: formSignUp.username, email: formSignUp.email, password: formSignUp.password
			})
			console.log('Data is valid');
			// console.log(formSignUp);
			console.log("res", res);
			if (res.status === 200 || 201) {
				setIsSuccess(true);
				navigate('/login')
			}

		}
	};
	useEffect(() => {
		if (isSuccess) {
			const timeoutId = setTimeout(() => {
				setIsSuccess(false);
			}, 3000);

			return () => {
				clearTimeout(timeoutId);
			}
		}
	}, [isSuccess]);
	//TODO: 
	const handleChange = (e) => {
		setFormSignUp({
			...formSignUp,
			[e.target.name]: e.target.value
		});
	};

	return (
		<>
			<div className="sign-up">
				<h1>Sign up</h1>

				<div className="signup-form">
					{isSuccess && <p>Registration successful!</p>}
					<form onSubmit={handleSubmit} className="signup-frm">
						<div className="inp-frm">
							<div className="wrap-inp-err">
								<input
									type={"text"}
									className="username"
									placeholder="Username"
									name="username"
									value={formSignUp.username}
									onChange={handleChange} />
								{errors.username && <div className="error">{errors.username}</div>}
							</div>
							<div className="wrap-inp-err">
								<input
									type={"email"}
									className="email"
									placeholder="Email"
									name="email"
									value={formSignUp.email}
									onChange={handleChange} />
								{errors.email && <div className="error">{errors.email}</div>}
							</div>
							<div className="wrap-inp-err">
								<input
									type={"password"}
									className="password"
									placeholder="Password"
									name="password"
									value={formSignUp.password}
									onChange={handleChange} />
								{errors.password && <div className="error">{errors.password}</div>}
							</div>
							<div className="wrap-inp-err">
								<input
									type={"password"}
									className="confirm-pass"
									placeholder="Confirm password"
									name="confirmPassword"
									value={formSignUp.confirmPassword}
									onChange={handleChange} />
								{errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
							</div>
						</div>
						<button type="submit" className="btn-signup">Create</button>
					</form>
					<div className="login">
						<p>Already have an account?</p>
						{/* <button className="btn-login">Login</button> */}
						<Link to={"/login"} className="btn-login">Login</Link>
					</div>
				</div>
				<div className="login-social-net">
					<div className="login-google">
						<span><FcGoogle /></span>
						<p>Continue with Google</p>
					</div>
					<div className="login-facebook">
						<span><FaFacebook /></span>
						<p>Continue with Facebook</p>
					</div>
				</div>
			</div>
		</>
	)
}