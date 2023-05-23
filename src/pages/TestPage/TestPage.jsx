import { useEffect, useState } from "react";
import "./TestPage.scss";
import { Link } from "react-router-dom";
import { getTopic } from "../../services/auth";
export default function TestPage() {
	const [topic, setTopic] = useState(null);
	useEffect(() => {
		(async () => {
			const topicRes = await getTopic()
			setTopic(topicRes)
		})()
	}, [])

	return (
		<div className="test-page">
			<h1>Test</h1>
			<table className="tb-test">
				{
					topic && topic.map((list, ind) => (
						<tr>
							<Link to={`/testDetail?id=${list._id}`}>
								<td>{list.title}</td>
							</Link>
						</tr>
					))
				}
			</table>
		</div>
	)
}