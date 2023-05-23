import "./ListeningPhotoDetail.scss"
import { AiOutlineDoubleLeft } from "react-icons/ai"
import { useEffect, useState } from "react"

export default function ListeningPhotoDetail({ englishTest, isEditMode, submitAns, selectedAns }) {
	const [ans, setAns] = useState([])
	const [result, setResult] = useState([])

	useEffect(() => {
		if (selectedAns) {
			setAns([selectedAns])
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
		<div className="listening-photo-detail">
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
			<div className="question-exer">
				<div className="title-exer">
					<p>{englishTest.title}</p>
				</div>
				<div className="img-exer">
					<img src={englishTest.image} alt="imgExer" />
				</div>
				<div className="sound-exer">
					<audio src={englishTest.sound} controls="play"></audio>
				</div>
				{englishTest.questions.map((test, index) => (
					<form className="answer-exer">
						{test.answers.map((answer, i) => (
							<div key={i} className="elem-answer">
								<input
									id={`answer-${index}${i}`}
									type="radio"
									name="answer"
									value={answer.cate}
									onChange={e => onHandleChange(e, index)}
									checked={ans[index] === answer.cate}
								/>
								<label htmlFor={`answer-${index}${i}`}>{answer.name}</label>
							</div>
						))}
						<div className="result-check">{
							result.length > 0
								? (result[index] ? <p className="right-ans">Your answer is correct</p> :
									<p className="wrong-ans">Your answer is incorrect</p>)
								: null
						}</div>
					</form>
				))
				}
			</div>
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