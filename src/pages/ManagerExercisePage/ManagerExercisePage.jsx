import "./ManagerExercisePage.scss"
import { BsTrash } from "react-icons/bs"
import { AiOutlineEdit } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getExercise } from "../../services/exercise";
export default function ManagerExercise() {
	const [exercise, setExercise] = useState(null);
	let inCreID = 0
	useEffect(() => {
		(async () => {
			const exerciseRes = await getExercise()
			setExercise(exerciseRes)
		})()
	}, [])
	return (
		<div className="manager-exercise">
			<div className="view-edit-del-exercise">
				<div className="title">Exercise</div>
				<table >
					<tr>
						<th>Serial</th>
						<th>Category</th>
						<th>Name</th>
						<th>Date</th>
						<th>Action</th>
					</tr>
					{
						exercise && exercise.map((list, ind) => (
							<tr>
								<td>{inCreID = inCreID + 1}</td>
								<td>{list.questionCategory}</td>
								<td>{list.title}</td>
								<td>{list.createdAt.slice(0, new Date().toISOString().indexOf("T"))}</td>
								<td className="action-exercise">
									<div className="view-exercise">View</div>
									<div className="edit-exercise"><AiOutlineEdit /></div>
									<div className="delete-exercise"><BsTrash /></div>
								</td>
							</tr>
						))
					}
				</table>
			</div>
			<div className="new-exercise">
				<Link to={"/createExercise"}>New Exercise</Link>

			</div>
		</div>
	)
}
export function newExercise() {
	return (
		<div className="form-new-exercise">
			<form>
				<input type="text" placeholder="Enter title of exercise" />
				<input type="text" placeholder="Enter question" />
				<input type="text" placeholder="Enter answer" />
				<div className="add answer">Add answer +</div>
				<input type="text" placeholder="Enter correct answer" />
			</form>
		</div>
	)
}