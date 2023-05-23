import "./ListeningNormalDetail.scss"
import { AiOutlineDoubleLeft } from "react-icons/ai"
import { useEffect, useState } from "react";

export default function ListeningNormalDetail({ englishTest, isEditMode, submitAns, selectedAns }) {
	const [ans, setAns] = useState([])
	const [result, setResult] = useState([])

	useEffect(() => {
		if (selectedAns) {
			setAns([selectedAns])
		} else {
			setAns([])
		}
	}, [selectedAns])

	const onHandleChange = (e, id) => {
		let currentAns = [...ans]
		currentAns[id] = e.target.value
		setAns(currentAns);
		onSubmitAns(e.target.value)
	}

	const checkAns = () => {
		let rs = []
		englishTest.questions.forEach((q, i) => {
			q.correctAnswer === ans[i]
				? rs.push(true)
				: rs.push(false)
		})
		setResult(rs)
	}

	const onSubmitAns = (answer) => {
		if (submitAns) {
			submitAns(answer)
		}
	}

	return (
		<div className="listening-normal-detail">
			{!isEditMode
				&& (
					<div className="btn-pre-next">
						<div className="pre">
							<button>
								<AiOutlineDoubleLeft className="pre-icon" />
							</button>
						</div>
						<div className="next">
							<button>Next exercise</button>
						</div>
					</div>
				)
			}
			<div className="sound">
				<audio src={englishTest.sound} controls="play"></audio>
			</div>
			{englishTest.questions.map((test, index) => (
				<div key={index} className="que-ans">
					<div className="question">
						<p>{test.question}</p>
					</div>
					<form className="answer">
						{test.answers.map((answer, i) => (
							<div key={i} className="answer-elem">
								<input
									id={`question${index}_answer-${i}`}
									type="radio"
									name="answer"
									value={answer.cate}
									onChange={e => onHandleChange(e, index)}
									checked={ans[index] === answer.cate}
								/>
								<label htmlFor={`question${index}_answer-${i}`}>{answer.name}</label>
							</div>
						))}
					</form>
					<div className="result-check">{
						result.length > 0
							? (result[index] ? <p className="right-ans">Your answer is correct</p> :
								<p className="wrong-ans">Your answer is incorrect</p>)
							: null
					}</div>
				</div>
			))}
			{(!isEditMode)
				&& (
					<div className="check">
						<div className="result-check"></div>
						<button onClick={checkAns} className="btn-check">Check</button>
					</div>
				)
			}
		</div>
	)
}