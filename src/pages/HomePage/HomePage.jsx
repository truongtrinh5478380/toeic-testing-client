import { Outlet } from "react-router-dom";
import "./HomePage.scss";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaUserCircle } from "react-icons/fa"
import { GiTrophyCup } from "react-icons/gi"
import { useEffect } from "react";

// import { useSelector, useDispatch } from "react-redux";

// import counterAction from "../../redux/actions/counterAction";
// import loginAction from "../../redux/actions/loginAction";
export default function HomePage() {

	// const counter = useSelector(state => state.counterReducer)
	// const isLogin = useSelector(state => state.loginReducer)
	// const dispatch = useDispatch()
	// console.log(isLogin);

	let topics = [
		{ name: "Topic 1", color: "#D0E3FF" },
		{ name: "Topic 2", color: "#E5DBFF" },
		{ name: "Topic 3", color: "#D4F7FF" },
		{ name: "Topic 4", color: "#E5DBFF" },
		{ name: "Topic 5", color: "#D4F7FF" },
		{ name: "Topic 6", color: "#D0E3FF" },
	];
	let readingExer = [
		{ name: "Text Completions", color: "#fed1ff", image: "/images/Dictionary.svg" },
		{ name: "Incomplete Sentences", color: "#d1daff", image: "/images/Dictionary.svg" },
		{ name: "Single And Multiple Passages", color: "#f0ffd1", image: "/images/Dictionary.svg" },
	];
	let listeningExer = [
		{ name: "Photographs", color: "#f0ffd1", image: "/images/Grammar.svg" },
		{ name: "Question Responses", color: "#d1fff0", image: "/images/Grammar.svg" },
		{ name: "Short Talks", color: "#ffe4d1", image: "/images/Grammar.svg" },
		{ name: "Conversations", color: "#ffe4d1", image: "/images/Grammar.svg" },
	];
	let topWinners = [
		{
			avatar: "",
			name: "Oinas",
			top: "1",
		},
		{
			avatar: "",
			name: "Natapon",
			top: "2",
		},
		{
			avatar: "",
			name: "Torsten",
			top: "3",
		},
	];
	let introduceElem = [
		{
			name: "Cost-effective",
			image: "/images/listen-img.svg",
			className: "cost grid-elem",
		},
		{
			name: "Flexibility",
			image: "/images/Dictionary.svg",
			className: "flexibility grid-elem",
		},
		{
			name: "Instant results",
			image: "/images/note.svg",
			className: "instant-result grid-elem",
		},
		{
			name: "Secure and reliable",
			image: "/images/reading.svg",
			className: "secure grid-elem",
		},
		{
			name: "High precision",
			image: "/images/listen-img.svg",
			className: "precision grid-elem",
		},
		{
			name: "Convenient and easy",
			image: "/images/Grammar.svg",
			className: "easy grid-elem",
		},
		{
			name: "High efficiency",
			image: "/images/Grammar.svg",
			className: "efficiency grid-elem",
		},
		{
			name: "Save time",
			image: "/images/reading.svg",
			className: "time grid-elem",
		},
		{
			name: "Practice tests available",
			image: "/images/note.svg",
			className: "available grid-elem",
		},
	]

	// useEffect(() => {
	// 	(async () => {
	// 		let res = await fetch("http://localhost:9999/api/v1/trips/getAll");
	// 		let data = await res.json();
	// 		console.log(data);
	// 	})()
	// })

	return (
		<>
			<div>

				<div className="home-page">
					{/* <h1>Home page {isLogin}</h1>
					<div className="slider"></div>
					<button onClick={() => dispatch(loginAction.setTrue)}>tang</button>
					<button onClick={() => dispatch(loginAction.setFalse)}>giam</button> */}
					<div className="slider">
						<div className="title">
							<p className="bg-title">Learn English one exercise at a time!</p>
							<p className="med-title">Get access to the largest collection of multiple-choice English language questions worldwide!</p>
							<p className="sm-title">Each time you visit English.best a new question is waiting for you. How many questions can you answer correctly? Compete with other learners and make new friends!</p>
							<Link to={"/testPage"}>Start here</Link>
						</div>
						<div className="img-slider">
							<img src={process.env.PUBLIC_URL + '/images/slider.svg'} alt="Slider" />
						</div>

					</div>
					<div className="introduce-elem">
						<div className="title">Why should you test your toeic ability online?</div>
						<div className="introduce">
							{introduceElem.map((intro, index) => (
								<div className={intro.className}>
									<img src={process.env.PUBLIC_URL + intro.image} alt={intro.className} />
									<div >{intro.name}</div>
								</div>
							))
							}
						</div>
					</div>
					<div className="tests-elem">
						<div className="title-more">
							<p className="title">Tests</p>
							<Link to={"testpage"} className="btn-more">See more <AiOutlineArrowRight /></Link>
							{/* <button className="btn-more">See more <AiOutlineArrowRight /></button> */}
						</div>

						<div className="topics">
							{topics.map((tp, index) => (
								<div className="topic" style={{ backgroundColor: tp.color }}>{tp.name}</div>
							))}
						</div>

					</div>
					<div className="exercise-elem">
						<p className="title">Exercise</p>
						<Tabs >
							<TabList >
								<Tab>Reading</Tab>
								<Tab>Listening</Tab>
							</TabList>

							<TabPanel >
								{
									readingExer.map((read, index) => (
										<div className="exer">
											<img src={process.env.PUBLIC_URL + read.image} alt="listen-img" />
											<div className="reading" style={{ backgroundColor: read.color }}>{read.name}</div>
										</div>
									))
								}
								<Link to={"readingpage"} className="btn-more">See more <AiOutlineArrowRight /></Link>
							</TabPanel>
							<TabPanel>
								{
									listeningExer.map((listen, index) => (
										<div className="exer read-exer">
											<img src={process.env.PUBLIC_URL + listen.image} alt="reading-img" />
											<div className="listening" style={{ backgroundColor: listen.color }}>{listen.name}</div>
										</div>
									))
								}
								<Link to={"listeingpage"} className="btn-more" >See more <AiOutlineArrowRight /></Link>
							</TabPanel>
						</Tabs>
					</div>
					<div className="ranks-elem">
						<img className="trophy-img" src={'/images/trophy.jpg'} alt="trophy" />
						<div>
							<p className="title">How competitive are you?</p>
							<p className="ranks-content">Let’s face reality: We live in a highly competitive world. All aspects of our performance are constantly
								measured and quantified which is why we always want to know how «good» we are. English.best provides you with
								a safe environment in which you can evaluate your level of English and compare your skills with those of your
								peers. For example, if you take our assessment test you can see if your score is below or above
								average within learners from your own country as well as across the globe.</p>
							<h2>Top winners of the week</h2>
							<div className="top-winners">
								{topWinners.map((topWinner, index) => (
									<div className="top">
										<div className="avatar">
											<FaUserCircle />
										</div>
										<div className="name-order">
											<div className="name">{topWinner.name}</div>
											<div className="order"><GiTrophyCup className="cup-icon" />{topWinner.top} place</div>
										</div>
									</div>
								))}
							</div>
							<Link to={"rankPage"} className="btn-rank">Go to rank</Link>
						</div>
					</div>
					<div className="contact-elem">
						<p>Leave us a message</p>
						<div className="contact-form">
							<input type={"text"} className="name" placeholder="Name" />
							<input type={"email"} className="email" placeholder="Email" />
							<input type={"text"} className="subject" placeholder="Subject" />
							<textarea className="content-mess" name="postContent" rows={4} cols={40} placeholder="Write message" />
							<button className="btn-sub">Send</button>
						</div>
					</div>
				</div>

			</div>
			<div id="detail">
				<Outlet />
			</div>
		</>


	)

}