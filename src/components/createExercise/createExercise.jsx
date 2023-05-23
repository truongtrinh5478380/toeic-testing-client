import { useState } from "react"
import "./createExercise.scss"
import ListeningNormalDetail from "../ListeningNormalDetail/ListeningNormalDetail"
import ListeningPhotoDetail from "../ListeningPhotoDetail/ListeningPhotoDetail"
import ReadingCompreDetail from "../ReadingCompreDetail/ReadingCompreDetail"
import ReadingNormalDetail from "../ReadingNormalDetail/ReadingNormalDetail"
import { addExercise } from "../../services/auth"

const answerCate = [
	'A', 'B', 'C', 'D'
]

const listeningCategory = [
	'Photographs',
	'Question Responses',
	'Short Talks',
	'Conversations'
]

const readingCategory = [
	'Incomplete Sentences',
	'Text Completions',
	'Single And Multiple Passages'
]


export function CreateExercise() {
	const [exercise, setExercise] = useState({
		title: 'Title',
		questionCategory: "Question Responses",
		questions: [{
			question: "Your question?",
			answers: [
				{
					cate: "A",
					name: "Answer",
				},
			],
			correctAnswer: "A",
		}]

	})
	const [skill, setSkill] = useState('listening')

	const [pointer, setPointer] = useState({
		questionIndex: 0,
		answerIndex: 0
	})

	const normalListeningInitState = {
		question: "Your question?",
		answers: [
			{
				cate: "A",
				name: "Answer",
			},
		],
		correctAnswer: "A",
	}

	const photoListeningInitState = {
		answers: [
			{
				cate: "A",
				name: "Answer",
			},
		],
		correctAnswer: "A"
	}

	const readingCompreTestInitState = {
		question: "What is the main purpose of this memo?",
		answers: [
			{
				cate: "A",
				name: "Answer",
			},
		],
		correctAnswer: "B",
	}

	const readingNormalTestInitState = {
		question: "What is the main purpose of this memo?",
		answers: [
			{
				cate: "A",
				name: "Answer",
			},
		],
		correctAnswer: "B",
	}

	const handleSelectSkill = (e) => {
		setSkill(e.target.value)
		if (e.target.value === 'reading') {
			setExercise(
				{
					title: 'Title',
					questionCategory: "Text Completions",
					questions: [{
						question: "Your question?",
						answers: [
							{
								cate: "A",
								name: "Answer",
							},
						],
						correctAnswer: "A",
					}]
				}
			)
		} else {
			setExercise(
				{
					title: 'Title',
					questionCategory: "Question Responses",
					questions: [{
						question: "Your question?",
						answers: [
							{
								cate: "A",
								name: "Answer",
							},
						],
						correctAnswer: "A",
					}]

				}
			)
		}
	}

	const handleInputChange = e => {
		const { value, name } = e.target
		setExercise(s => ({
			...s,
			[name]: value
		}))
	}

	const handleSelectQuestion = (e) => {
		const { value } = e.target
		handleInputChange(e)
		handleAddQuestion(value, true)
	}

	const handleWriteQuestion = (e, index) => {
		const { value, name } = e.target

		let questions = [...exercise.questions]
		questions[index][name] = value

		setExercise(s => ({
			...s,
			questions
		}))
	}

	const handleAddQuestion = (category, isInit) => {
		if (isInit)
			setPointer(s => ({
				answerIndex: 0,
				questionIndex: 0
			}))
		else
			setPointer(s => ({
				answerIndex: 0,
				questionIndex: s.questionIndex++
			}))

		switch (category) {
			case 'Question Responses':
				return setExercise(s => ({
					...s,
					sound: "https://www.anhngumshoa.com/uploads/sound/2020/question_1_-_toeic_b.mp3",
					questions: isInit ? [normalListeningInitState] : [...s.questions, normalListeningInitState]
				}))

			case 'Short Talks':
				return setExercise(s => ({
					...s,
					sound: "https://www.anhngumshoa.com/uploads/sound/2020/question_1_-_toeic_b.mp3",
					questions: isInit ? [normalListeningInitState] : [...s.questions, normalListeningInitState]
				}))

			case 'Conversations':
				return setExercise(s => ({
					...s,
					sound: "https://www.anhngumshoa.com/uploads/sound/2020/question_1_-_toeic_b.mp3",
					questions: isInit ? [normalListeningInitState] : [...s.questions, normalListeningInitState]
				}))

			case 'Photographs':
				return setExercise(s => ({
					...s,
					sound: "https://www.anhngumshoa.com/uploads/sound/2020/question_1_-_toeic_b.mp3",
					image: "images/toeic_part1_1_1.jpg",
					questions: isInit ? [photoListeningInitState] : [...s.questions, photoListeningInitState]
				}))

			case 'Text Completions':
				return setExercise(s => ({
					...s,
					paragraph: 'Paragraph',
					questions: isInit ? [readingCompreTestInitState] : [...s.questions, readingCompreTestInitState]
				}))

			case 'Incomplete Sentences':
				return setExercise(s => ({
					...s,
					questions: isInit ? [readingNormalTestInitState] : [...s.questions, readingNormalTestInitState]
				}))

			case 'Single And Multiple Passages':
				return setExercise(s => ({
					...s,
					paragraph: 'Paragraph',
					questions: isInit ? [readingCompreTestInitState] : [...s.questions, readingCompreTestInitState]
				}))

			default:
				break;
		}
	}

	const handleAddAnswer = () => {
		const currentId = pointer.questionIndex
		if (pointer.answerIndex >= answerCate.length - 1) return;

		let questions = [...exercise.questions]
		questions[currentId].answers.push({
			cate: answerCate[pointer.answerIndex + 1],
			name: 'Answer'
		})

		setExercise(s => ({
			...s,
			questions
		}))

		setPointer(s => ({
			...s,
			answerIndex: s.answerIndex++
		}))
	}

	const handleAnswerChange = (e) => {
		const { value } = e.target
		const currentId = pointer.questionIndex

		let questions = [...exercise.questions]
		questions[currentId].answers[pointer.answerIndex].name = value

		setExercise(s => ({
			...s,
			questions
		}))
	}

	const renderFormInput = () => {
		const currentId = pointer.questionIndex

		switch (exercise.questionCategory) {
			case 'Question Responses':
				return (
					<>
						<div className="input-item">
							<label htmlFor="question">Sound</label>
							<input
								type="text"
								placeholder="sound"
								name="sound"
								value={exercise.sound}
								onChange={e => handleInputChange(e, currentId)}
							/>
						</div>
						<div className="input-item">
							<label htmlFor="question">Question</label>
							<input
								type="text"
								placeholder="question"
								name="question"
								value={exercise.questions[pointer.questionIndex].question}
								onChange={e => handleWriteQuestion(e, currentId)}
							/>
						</div>
					</>
				)

			case 'Short Talks':
				return (
					<>
						<div className="input-item">
							<label htmlFor="question">Sound</label>
							<input
								type="text"
								placeholder="sound"
								name="sound"
								value={exercise.sound}
								onChange={e => handleInputChange(e, currentId)}
							/>
						</div>
						<div className="input-item">
							<label htmlFor="question">Question</label>
							<input
								type="text"
								placeholder="question"
								name="question"
								value={exercise.questions[exercise.questions.length - 1].sound}
								onChange={e => handleWriteQuestion(e, currentId)}
							/>
						</div>
					</>
				)

			case 'Conversations':
				return (
					<>
						<div className="input-item">
							<label htmlFor="question">Sound</label>
							<input
								type="text"
								placeholder="sound"
								name="sound"
								value={exercise.sound}
								onChange={e => handleInputChange(e, currentId)}
							/>
						</div>
						<div className="input-item">
							<label htmlFor="question">Question</label>
							<input
								type="text"
								placeholder="question"
								name="question"
								value={exercise.questions[exercise.questions.length - 1].sound}
								onChange={e => handleWriteQuestion(e, currentId)}
							/>
						</div>
					</>
				)

			case 'Photographs':
				return (
					<>
						<div className="input-item">
							<label htmlFor="question">Sound</label>
							<input
								type="text"
								placeholder="sound"
								name="sound"
								value={exercise.questions[currentId].sound}
								onChange={e => handleWriteQuestion(e, currentId)}
							/>
						</div>
						<div className="input-item">
							<label htmlFor="image">Image</label>
							<input
								type="text"
								placeholder="image"
								name="image"
								value={exercise.image}
								onChange={e => handleInputChange(e, currentId)}
							/>
						</div>
					</>
				)

			case 'Text Completions':
				return (
					<>
						<div className="input-item">
							<label htmlFor="question">Question</label>
							<input
								type="text"
								placeholder="question"
								name="question"
								value={exercise.questions[currentId].question}
								onChange={e => handleWriteQuestion(e, currentId)}
							/>
						</div>
						<div className="input-item">
							<label htmlFor="title-topic">Paragraph:</label>
							<textarea type="text" name="paragraph" placeholder="Enter paragraph" value={exercise.paragraph} onChange={handleInputChange} />
						</div>
					</>
				)

			case 'Incomplete Sentences':
				return (
					<>
						<div className="input-item">
							<label htmlFor="question">Question</label>
							<input
								type="text"
								placeholder="question"
								name="question"
								value={exercise.questions[currentId].question}
								onChange={e => handleWriteQuestion(e, currentId)}
							/>
						</div>
					</>
				)

			case 'Single And Multiple Passages':
				return (
					<>
						<div className="input-item">
							<label htmlFor="question">Question</label>
							<input
								type="text"
								placeholder="question"
								name="question"
								value={exercise.questions[currentId].question}
								onChange={e => handleWriteQuestion(e, currentId)}
							/>
						</div>
						<div className="input-item">
							<label htmlFor="title-topic">Paragraph:</label>
							<textarea type="text" name="paragraph" placeholder="Enter paragraph" value={exercise.paragraph} onChange={handleInputChange} />
						</div>
					</>
				)

			default:
				break;
		}
	}

	const renderPaper = () => {
		switch (exercise.questionCategory) {
			case "Question Responses":
				return <ListeningNormalDetail englishTest={exercise} isEditMode />

			case "Short Talks":
				return <ListeningNormalDetail englishTest={exercise} isEditMode />

			case "Conversations":
				return <ListeningNormalDetail englishTest={exercise} isEditMode />

			case 'Photographs':
				return <ListeningPhotoDetail englishTest={exercise} isEditMode />

			case 'Text Completions':
				return <ReadingCompreDetail englishTest={exercise} isEditMode />

			case 'Incomplete Sentences':
				return <ReadingNormalDetail englishTest={exercise} isEditMode />

			case 'Single And Multiple Passages':
				return <ReadingCompreDetail englishTest={exercise} isEditMode />

			default:
				break;
		}
	}

	const onSubmit = async (e) => {
		e.preventDefault()

		const subRes = await addExercise(exercise);
		if (subRes) {
			alert("Add exercise suscessfully!!!")
		} else {
			alert("Can't add exercise")
		}
		console.log(exercise);
	}

	return (
		<div className="form-new-topic">
			<div className="topic-paper">
				<h1>{exercise.title}</h1>
				<p className="question-cate">{exercise.questionCategory}</p>
				{renderPaper()}
			</div>
			<form className="topic-form">
				<div className="input-item">
					<label htmlFor="title-topic">Exercise title:</label>
					<input type="text" name="title" placeholder="Enter title of topic" value={exercise.title} onChange={handleInputChange} />
				</div>
				<div className="input-item">
					<label htmlFor="question">Skill</label>
					<select value={skill} name="skill" onChange={e => handleSelectSkill(e)}>
						<option value="listening">Listening</option>
						<option value="reading">Reading</option>
					</select>
				</div>
				<div className="input-item">
					<label htmlFor="question">Question Category</label>
					<select value={exercise.questionCategory} name="questionCategory" onChange={handleSelectQuestion}>
						{skill === 'listening'
							? listeningCategory.map((val, index) => (
								<option key={index} value={val}>{val}</option>
							))
							: readingCategory.map((val, index) => (
								<option key={index} value={val}>{val}</option>
							))
						}
					</select>
				</div>
				<hr style={{ margin: '12px 0' }} />
				{renderFormInput()}
				<div className="input-item">
					<label htmlFor="answer">Answer content:</label>
					<input
						type="text"
						name="answer"
						value={exercise.questions[pointer.questionIndex].answers[pointer.answerIndex].name}
						placeholder="Enter answer"
						onChange={e => handleAnswerChange(e)}
					/>
				</div>
				<button className="add answer" type="button" onClick={() => handleAddAnswer()}>Add answer +</button>
				<hr style={{ margin: '12px 0' }} />
				<div className="input-item">
					<label htmlFor="correct-answer">Correct answer:</label>
					<input
						type="text"
						name="correctAnswer"
						placeholder="Enter correct answer"
						value={exercise.questions[pointer.questionIndex].correctAnswer}
						onChange={e => handleWriteQuestion(e, pointer.questionIndex)}
					/>
				</div>
				<button type="button" onClick={() => handleAddQuestion(exercise.questionCategory, false)}> Add Question</button>
				<hr style={{ margin: '12px 0' }} />
				<div className="save">
					<button onClick={onSubmit}>Save</button>
				</div>
			</form>
		</div>
	)
}