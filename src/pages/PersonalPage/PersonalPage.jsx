import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./PersonalPage.scss"
import { FaUserCircle } from "react-icons/fa"
import { GiTrophyCup } from "react-icons/gi"
import { Link } from 'react-router-dom';
import { getUser, updateUser } from '../../services/user';
import { useEffect, useState } from 'react';
import { getUserResult } from '../../services/history';


export default function PersonalPage() {
	const [infor, setInfor] = useState();
	const [refresh, setRefresh] = useState(false);
	const [history, setHistory] = useState(null);
	let increID = 0;
	const refreshApp = () => setRefresh(!refresh);
	useEffect(() => {
		const fetchUser = async () => {
			const loggingUser = await getUser();
			const userResultRes = await getUserResult(history);
			setHistory(userResultRes)
			setInfor(loggingUser);
		};
		fetchUser();
	}, [refresh]);

	const handleUpdateUserProfile = async (e) => {
		e.preventDefault();
		const updateUserRes = await updateUser(e.target.elements.fullname.value, e.target.elements.email.value, e.target.elements.gender.value, e.target.elements.phoneNumber.value, infor.username);
		if (updateUserRes) {
			alert("Update suscessfully !!")
		}
		refreshApp();
	}
	const handleChange = e => {
		const { value, name } = e.target
		setInfor(s => ({
			...s,
			[name]: value
		}))
	}
	return (
		<div className='person-page'>
			<div className='information' style={{ backgroundImage: "url(/images/OpenBook.svg)" }}>
				<div className='avatar'>
					<FaUserCircle />
				</div>
				<div className='username'>{infor ? infor.username : ""}</div>
				<div className='fullname'>{infor ? infor.fullname : ""}</div>
				{/* <img src={process.env.PUBLIC_URL + "images/OpenBook.svg"} alt="openbook" /> */}
			</div>
			<Tabs>
				<TabList>
					<Tab>
						<p>Update information</p>
					</Tab>
					<Tab>
						<p>Exam history</p>
					</Tab>
					{/* <Tab>
						<p>Rank</p>
					</Tab> */}
				</TabList>

				<TabPanel>
					<div className="panel-content">
						<h1>Information</h1>
						<form className='change-infor' onSubmit={handleUpdateUserProfile}>
							<div className='frm-child'>
								<label htmlFor='name'>Fullname: </label>
								<input type={"text"} name="fullname" value={infor ? infor.fullname : ""} onChange={handleChange} />
							</div>
							<div className='frm-child'>
								<label htmlFor='email'>Email: </label>
								<input type={"email"} name="email" value={infor ? infor.email : ""} onChange={handleChange} />
							</div>
							<div className='frm-child'>
								<label htmlFor='gender'>Gender: </label>
								<select name="gender">
									<option>Male</option>
									<option>Female</option>
									<option>Other</option>
								</select>
							</div>
							<div className='frm-child'>
								<label htmlFor='phoneNumber'>Phone Number: </label>
								<input type={"text"} name="phoneNumber" value={infor ? infor.phoneNumber : ""} onChange={handleChange} />
							</div>
							<div className='frm-child'>
								<button className='btn-update'>Update</button>
							</div>
						</form>
					</div>
				</TabPanel>
				<TabPanel>
					<div className="panel-content">
						<div className='exam-history'>
							<div>
								<h1>Exam history</h1>
								<table className='tb-exam'>
									<tr>
										<th>Serial</th>
										<th className='th-name'>Name</th>
										<th>Score</th>
										<th>Date</th>
									</tr>
									{
										history && history.map((his, i) => (
											<tr>
												<td>{increID = increID + 1}</td>
												<td>{his.topic.title}</td>
												<td>{his.point}</td>
												<td>{his.createdAt.slice(0, new Date().toISOString().indexOf("T"))}</td>
											</tr>
										))
									}
									{/* <tr>
										<td>2</td>
										<td>Test 1</td>
										<td>500</td>
										<td>16:25 15/03/2023</td>
									</tr> */}
								</table>
							</div>
						</div>
					</div>
				</TabPanel>
				{/* <TabPanel>
					<div className="panel-content">
						<div className='rank-tab'>
							<h1>Rank</h1>
							<div className='rank-cont'>
								<div className='rank-text'>
									<div className='your-rank'>
										<GiTrophyCup className="cup-icon" />
										<p>2418 place of 7109</p>
									</div>
									<div >
										<span>Great job! </span>
										<Link to={"/rankPage"} className="go-rank">Go to rank</Link>
										<span> page and compare your skills with those of your peers</span>
									</div>
								</div>
								<div>
									<img src={process.env.PUBLIC_URL + '/images/Rank.svg'} alt="rank" />
								</div>
							</div>
						</div>
					</div>
				</TabPanel> */}
			</Tabs>
		</div >
	)
}