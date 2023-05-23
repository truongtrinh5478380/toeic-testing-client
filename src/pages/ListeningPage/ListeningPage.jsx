import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import "./Listening.scss"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getExerciseByCategory } from "../../services/auth"
export default function ListeningPage() {

	const [conversations, setCoversations] = useState(null)
	const [photographs, setPhotographs] = useState(null)
	const [shortTalks, setShortTalks] = useState(null)
	const [questionResponses, setQuestionResponses] = useState(null)
	useEffect(() => {
		(async () => {
			const conversationRes = await getExerciseByCategory("Conversations")
			setCoversations(conversationRes)
			const photographRes = await getExerciseByCategory("Photographs")
			setPhotographs(photographRes)
			const shortTalkRes = await getExerciseByCategory("Short Talks")
			setShortTalks(shortTalkRes)
			const questionResponseRes = await getExerciseByCategory("Question Responses")
			setQuestionResponses(questionResponseRes)
		})()

	}, [])

	return (
		<div className="listening-page">
			<h1>Listening</h1>
			<Tabs className="listen-tabs">
				<TabList>
					<Tab>Photographs</Tab>
					<Tab>Question Responses</Tab>
					<Tab>Short Talks</Tab>
					<Tab>Conversations</Tab>
				</TabList>

				<TabPanel>
					<div className="photo tab">
						{photographs && photographs.map((photo, index) => (
							<Link to={`/listeningPhoTo?id=${photo._id}`} className="photo detail">
								<p>{index + 1}</p>
								<p className="photo title">{photo.title}</p>
							</Link>
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<div className="ques-res tab">
						{questionResponses && questionResponses.map((ques, ind) => (
							<Link to={`/listeningNormal?id=${ques._id}`} className="ques-res detail">
								<p>{ind}</p>
								<p className="ques-res title">{ques.title}</p>
							</Link>
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<div className="short-talk tab">
						{shortTalks && shortTalks.map((talk, i) => (
							<Link to={`/listeningNormal?id=${talk._id}`} className="short-talk detail">
								<p>{i}</p>
								<p className="short-talk title">{talk.title}</p>
							</Link>
						))}
					</div>
				</TabPanel>
				<TabPanel>
					<div className="conversations tab">
						{conversations && conversations.map((conv, i) => (
							<Link to={`/listeningNormal?id=${conv._id}`} className="conversations detail">
								<p>{i}</p>
								<p className="conversations title">{conv.title}</p>
							</Link>
						))}
					</div>
				</TabPanel>
			</Tabs>
		</div>
	)
}