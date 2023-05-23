import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import './LoginPage.scss'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export default function LoginPage() {
	const navigate = useNavigate()
	const { signIn, user } = useAuth()

	const [formLogin, setFormLogin] = useState({
		username: '',
		password: ''
	});

	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user])

	const validateLoginForm = () => {
		let errors = {};
		if (!formLogin.username) {
			errors.username = 'Username is required';
		} else if (formLogin.username.length < 3) {
			errors.username = 'Username must be at least 3 characters long';
		}
		if (!formLogin.password) {
			errors.password = 'Password is required';
		} else if (formLogin.password.length < 6) {
			errors.password = 'Password must be at least 8 characters long';
		}
		setErrors(errors);

		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateLoginForm()) {
			signIn(formLogin.username, formLogin.password)
		}
	};

	const handleChange = (e) => {
		setFormLogin({
			...formLogin,
			[e.target.name]: e.target.value
		});
	};



	return (
		<>
			<div className="login">
				<h1>Login</h1>
				<div className="login-form">
					<form className="login-frm" onSubmit={handleSubmit}>
						<input
							type={"text"}
							className="username"
							name="username"
							placeholder="Username"
							value={formLogin.username}
							onChange={handleChange} />
						{errors.username && <div className="error">{errors.username}</div>}
						<input
							type={"password"}
							className="password"
							name="password"
							placeholder="Password"
							value={formLogin.password}
							onChange={handleChange}
						/>
						{errors.password && <div className="error">{errors.password}</div>}

						{/* <p className="forget-pass">Forget password?</p> */}
						<button type="submit" className="btn-sub-login">Login</button>
					</form>
					<div className="sign-up">
						<p>Don't have account yet?</p>
						{/* <button className="btn-signup">Sign up</button> */}
						<Link to={"/signup"} className="btn-signup">Sign up</Link>
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
