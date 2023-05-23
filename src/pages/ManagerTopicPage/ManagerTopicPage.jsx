import "./ManagerTopicPage.scss"
import { BsTrash } from "react-icons/bs"
import { AiOutlineEdit } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getTopic } from "../../services/auth";
export default function ManagerTopic() {
	const [topic, setTopic] = useState(null);
	let inCreID = 0
	useEffect(() => {
		(async () => {
			const topicRes = await getTopic()
			setTopic(topicRes)
		})()
	}, [])
	const topicName = {
		number: "1",
		name: "Practice Test 1 - TOEIC Reading, Listening test",
		date: "2022-03-25"
	}
	return (
		<div className="manager-topic">
			<div className="view-edit-del-topic">
				<div className="title">Topic</div>
				<table >
					<tr>
						<th>Serial</th>
						<th>Name</th>
						<th>Date</th>
						<th>Action</th>
					</tr>
					{
						topic && topic.map((list, ind) => (
							<tr>
								<td>{inCreID = inCreID + 1}</td>
								<td className="topic-name">{list.title}</td>
								<td>{list.createdAt.slice(0, new Date().toISOString().indexOf("T"))}</td>
								<td className="action-topic">
									<div className="view-topic">View</div>
									<div className="edit-topic"><AiOutlineEdit /></div>
									<div className="delete-topic"><BsTrash /></div>
								</td>
							</tr>
						))
					}
				</table>
			</div>
			<div className="new-topic">
				<Link to={"/createTopic"}>New Topic</Link>

			</div>
		</div>
	)
}
export function newTopic() {
	return (
		<div className="form-new-topic">
			<form>
				<input type="text" placeholder="Enter title of topic" />
				<input type="text" placeholder="Enter question" />
				<input type="text" placeholder="Enter answer" />
				<div className="add answer">Add answer +</div>
				<input type="text" placeholder="Enter correct answer" />
			</form>
		</div>
	)
}