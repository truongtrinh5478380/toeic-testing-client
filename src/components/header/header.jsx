import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import "./header.scss";
import { MdExpandMore } from "react-icons/md"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/auth";

const Container = styled.div`
	box-sizing: border-box;
	background-color: #F4F7FF;
	box-shadow: inset 0 -10px 10px -10px #EBEEF9;
`

export default function Header() {
	const { user, signOut } = useAuth()

	return (
		<div className="header">
			<Container>
				<div className="row">
					<div className="search-form">
						<input className="inp-search" />
						<button className="btn-search"><AiOutlineSearch /></button>
					</div>
					{!user ? (
						<div className="signup-login">
							<Link to={"/signup"} className="sign-up">Sign up</Link>
							<Link className="login" to={"/login"}>Login</Link>
						</div>
					) : (
						<div className="personal-logout">
							<Link to={"/personalPage"} className="personal-page">My Account</Link>
							&nbsp;
							<a href="#" className="logout" onClick={signOut}> Logout </a>
						</div>
					)}

				</div>
			</Container>
			<div className="row logo-nav">
				<Link to={"/"} className="logo" >
					<span style={{ color: "#808285" }}>toeic</span>
					<span style={{ color: "#6088E0" }}>.test</span>
				</Link>
				<div className="nav">
					{user?.role === "user"
						? (
							<div className="manager">
								<Link to={'testPage'} className="nav-item">Tests</Link>
								<div className="drop-nav">
									<div className="nav-item">Exercises <MdExpandMore />
									</div>
									<div className="drop-content">
										<div className="drop-item">
											<Link className="item" to={'listeningPage'}>Listening</Link>
										</div>
										<div className="drop-item">
											<Link className="item" to={'readingPage'}>Reading</Link>
										</div>
									</div>
								</div>
								<Link to={"rankPage"} className="nav-item">Rank</Link>
								<Link to={"contactPage"} className="nav-item">Contact us</Link>
							</div>
						) :
						""}
					{user?.role === "teacher"
						? (
							<div className="manager">
								<Link to={"managerTopic"} className="nav-item">Manager Topic</Link>
								<Link to={"managerExercise"} className="nav-item">Manager Exercises</Link>
							</div>
						)
						: null
					}
					{/* <div className="nav-item">Contact us</div> */}
				</div>
			</div>
		</div>
	)
}