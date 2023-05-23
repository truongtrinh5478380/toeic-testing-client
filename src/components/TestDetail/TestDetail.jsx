import { useEffect, useState } from "react";
import ListeningNormalDetail from "../ListeningNormalDetail/ListeningNormalDetail";
import "./TestDetail.scss"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { getTopicById, submitTest } from "../../services/auth";
import ListeningPhotoDetail from "../ListeningPhotoDetail/ListeningPhotoDetail";
import ReadingCompreDetail from "../ReadingCompreDetail/ReadingCompreDetail";
import ReadingNormalDetail from "../ReadingNormalDetail/ReadingNormalDetail";
import CountdownTimer from "../countDown/CountDown";

export default function TestDetail() {
	const [isShowScore, setIsShowScore] = useState(false);
	const [score, setScore] = useState(0)

	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const [exercise, setExercise] = useState()
	const [exerciseIndex, setExerciseIndex] = useState(0)

	const [init, setInit] = useState()
	const [answers, setAnswers] = useState([])

	const [countdown, setCountdown] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0
	});
	const [elapsedTime, setElapsedTime] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0
	});

	const [isRunning, setIsRunning] = useState(true);

	useEffect(() => {
		const targetTime = new Date().getTime() + 2 * 60 * 60 * 1000;

		const interval = setInterval(() => {
			if (!isRunning) {
				clearInterval(interval);
				return;
			}

			const now = new Date().getTime();
			const distance = targetTime - now;

			if (distance <= 0) {
				clearInterval(interval);
				// Countdown is over, do something here
			} else {
				const hours = Math.floor(distance / (1000 * 60 * 60));
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);

				setCountdown({ hours, minutes, seconds });
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [isRunning]);

	const submitAnswer = (answer) => {
		let currentAnswers = [...answers]
		currentAnswers[exerciseIndex] = answer
		setAnswers(currentAnswers)
	}

	const selectQuestion = (exer, index) => {
		setExercise(exer)
		setExerciseIndex(index)
	}

	const handleStop = () => {
		setIsRunning(false);

		const { hours, minutes, seconds } = countdown;
		setElapsedTime({
			hours: 2 - hours - 1,
			minutes: 60 - minutes - 1,
			seconds: 60 - seconds - 1
		});
	};

	const handleSubmit = async () => {
		setIsShowScore(true)
		handleStop()

		let numberOfQ = 0
		let correctListeningCount = 0
		let correctReadingCount = 0
		init.sections.forEach(s =>
			s.forEach(e => {
				e.questions.forEach((q) => {
					if (q.correctAnswer === answers[numberOfQ]) {
						if (((answers.length) / 2) <= numberOfQ) {
							correctReadingCount++
						} else {
							correctListeningCount++
						}
					}
				})
				numberOfQ++
			}))

		const payload = {
			"topicId": init._id,
			"listening": correctListeningCount,
			"reading": correctReadingCount
		}

		const result = await submitTest(payload)
		setScore(result.point)
	}

	const renderPaper = () => {
		switch (exercise?.questionCategory) {
			case "Question Responses":
				return <ListeningNormalDetail
					englishTest={exercise}
					isEditMode={true}
					submitAns={submitAnswer}
					selectedAns={answers[exerciseIndex].length === 0 ? undefined : answers[exerciseIndex]}
				/>

			case "Short Talks":
				return <ListeningNormalDetail
					englishTest={exercise}
					isEditMode={true}
					submitAns={submitAnswer}
					selectedAns={answers[exerciseIndex].length === 0 ? undefined : answers[exerciseIndex]}
				/>

			case "Conversations":
				return <ListeningNormalDetail
					englishTest={exercise}
					isEditMode={true}
					submitAns={submitAnswer}
					selectedAns={answers[exerciseIndex].length === 0 ? undefined : answers[exerciseIndex]}
				/>
			case 'Photographs':
				return <ListeningPhotoDetail
					englishTest={exercise}
					isEditMode={true}
					submitAns={submitAnswer}
					selectedAns={answers[exerciseIndex].length === 0 ? undefined : answers[exerciseIndex]}
				/>

			case 'Text Completions':
				return <ReadingCompreDetail
					englishTest={exercise}
					isEditMode={true}
					submitAns={submitAnswer}
					selectedAns={answers[exerciseIndex].length === 0 ? undefined : answers[exerciseIndex]}
				/>

			case 'Incomplete Sentences':
				return <ReadingNormalDetail
					englishTest={exercise}
					isEditMode={true}
					submitAns={submitAnswer}
					selectedAns={answers[exerciseIndex].length === 0 ? undefined : answers[exerciseIndex]}
				/>

			case 'Single And Multiple Passages':
				return <ReadingCompreDetail
					englishTest={exercise}
					isEditMode={true}
					submitAns={submitAnswer}
					selectedAns={answers[exerciseIndex].length === 0 ? undefined : answers[exerciseIndex]}
				/>
			default:
				return null;
		}
	}

	useEffect(() => {
		(async () => {
			const id = searchParams.get('id')
			const readingCompreRes = await getTopicById(id)
			if (!readingCompreRes || readingCompreRes.sections.length === 0 || readingCompreRes.sections[0].length === 0)
				navigate('/')

			let numberOfQ = 0
			readingCompreRes.sections.forEach(s => s.forEach(e => {
				numberOfQ++
			}))
			setInit(readingCompreRes)
			setExercise(readingCompreRes.sections[0][0])
			setAnswers(new Array(numberOfQ).fill(""))
		})()
	}, [])

	if (!init) return null;

	return (
		<div className="test-detail">
			<div className="title">
				<p>{init.title}</p>
			</div>
			<div className="main-test">
				<div className="paper">
					{renderPaper()}
				</div>
				<div className="box-sentences">
					<div className="head-box">
						<p className="time"><CountdownTimer countdown={countdown} /></p>
						<button
							className="submit-test"
							onClick={() => handleSubmit()}
						>Submit</button>
					</div>
					<div className="main-box">
						{init.sections.map((section, sId, sA) => {
							return (
								<>
									{section.map((exer, eId) => {
										const qId = (sA.length) * sId + eId
										return (
											<div
												className={`
												${exer._id === exercise._id ? "sentence-elem--active sentence-elem" : "sentence-elem"} 
												${answers[qId].length > 0 ? "sentence-elem--visited" : ""}
												`}
												onClick={() => selectQuestion(exer, qId)}
											>
												<p>{qId + 1}</p>
											</div>
										)
									})}
								</>
							)
						})}

					</div>
				</div>
			</div>
			{isShowScore && (
				<div className="show-score">
					<div className="score">
						<h1>Your score is {score}</h1>
						<p>Time: {elapsedTime.hours}:{elapsedTime.minutes}:{elapsedTime.seconds}</p>
						<p className="date">Date: {new Date().toISOString().slice(0, new Date().toISOString().indexOf("T"))}</p>
						<Link to={"/testPage"} className="exit">OK</Link>
					</div>
				</div>
			)}
		</div>
	)
}