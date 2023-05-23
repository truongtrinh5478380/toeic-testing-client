import "./ReadingCompreDetail.scss"
import { AiOutlineDoubleLeft } from "react-icons/ai"
import { useEffect, useState } from "react";

export default function ReadingCompreDetail({ englishTest, isEditMode, submitAns, selectedAns }) {
	const [ans, setAns] = useState([])
	const [result, setResult] = useState([])

	const onHandleChange = (e, id) => {
		let currentAns = [...ans]
		currentAns[id] = e.target.value
		setAns(currentAns);
		onSubmitAns(e.target.value)
	}

	useEffect(() => {
		if (selectedAns) {
			setAns([selectedAns])
		}
	}, [selectedAns])

	const onSubmitAns = (answer) => {
		if (submitAns) {
			submitAns(answer)
		}
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

	return (
		<div className="reading-text-comple-detail">
			{!isEditMode
				&& (<div className="btn-pre-next">
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
			<div className="paragraph">
				<p>
					{englishTest.paragraph}
				</p>
			</div>
			{englishTest.questions.map((test, index) => (
				<div key={index} className="que-ans">
					<div className="question">
						<p>{test.questionNumber}: {test.question}</p>
					</div>
					<form className="answer">
						{test.answers.map((answer, i) => (
							<div key={i} className="answer-elem">
								<input
									id={`question${i}_answer-${i}`}
									type="radio"
									name="answer"
									value={answer.cate}
									onChange={e => onHandleChange(e, index)}
									checked={(ans.length > 0 && ans[index]) === answer.cate}
								/>
								<label htmlFor={`question${i}_answer-${i}`}>{answer.name}</label>
							</div>
						))}
						<div className="result-check">{
							result.length > 0
								? (result[index] ?
									<p className="right-ans">Your answer is correct</p> :
									<p className="wrong-ans">Your answer is incorrect</p>)
								: null
						}</div>
					</form>
				</div>
			))}
			{(!isEditMode)
				&& (
					<div className="check">
						<button className="btn-check" onClick={checkAns}>Check</button>
					</div>
				)
			}
		</div>
	)
}