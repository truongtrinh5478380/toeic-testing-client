import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "./ReadingPage.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExerciseByCategory } from "../../services/auth";

export default function ReadingPage() {
	const [incompleteSentences, setIncompleteSentences] = useState(null)
	const [textCompletions, setTextCompletions] = useState(null)
	const [passages, setPassages] = useState(null)

	useEffect(() => {
		(async () => {
			const incompleteSentencesRes = await getExerciseByCategory("Incomplete Sentences")
			setIncompleteSentences(incompleteSentencesRes)
			const textCompletionsRes = await getExerciseByCategory("Text Completions")
			setTextCompletions(textCompletionsRes)
			const passagesRes = await getExerciseByCategory("Single And Multiple Passages")
			setPassages(passagesRes)

		})()

	}, [])


	console.log(textCompletions);
	return (
		<div className="reading-page">
			<h1>Reading</h1>
			<Tabs className="reading-tabs">
				<TabList>
					<Tab>Incomplete Sentences</Tab>
					<Tab>Text Completions</Tab>
					<Tab>Single And Multiple Passages</Tab>
				</TabList>
				<TabPanel>
					<div className="incomple-sen tab">
						{incompleteSentences && incompleteSentences.map((incomple, index) =>
						(
							<Link to={`/readingNormal?id=${incomple._id}`} className="incomple-sen detail">
								<p>{index + 1}</p>
								<p className="incomple-sen title">{incomple.title}</p>
							</Link>
						))}

					</div>
				</TabPanel>
				<TabPanel>
					<div className="text-comple tab">
						{textCompletions && textCompletions.map((textCom, ind) => (
							<Link to={`/readingCompre?id=${textCom._id}`} className="text-comple detail">
								<p>{ind}</p>
								<p className="text-comple title">{textCom.title}</p>
							</Link>
						))}

					</div>
				</TabPanel>
				<TabPanel>
					<div className="passages tab">
						{passages && passages.map((pass, i) => (
							<Link to={`/readingCompre?id=${pass._id}`} className="passages detail">
								<p>{i}</p>
								<p className="passages title">{pass.title}</p>
							</Link>
						))}

					</div>
				</TabPanel>
			</Tabs>
		</div>
	)
}