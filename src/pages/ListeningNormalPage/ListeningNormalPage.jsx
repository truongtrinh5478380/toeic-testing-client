import { useEffect, useState } from "react";
import ListeningNormalDetail from "../../components/ListeningNormalDetail/ListeningNormalDetail";
import { useSearchParams } from "react-router-dom";
import { getExerciseById } from "../../services/auth";

export default function ListeningNormal() {
	const [searchParams, setSearchParams] = useSearchParams()

	const [init, setInit] = useState()

	useEffect(() => {
		(async () => {
			const id = searchParams.get('id')
			const readingCompreRes = await getExerciseById(id)
			setInit(readingCompreRes)
		})()
	}, [])
	return (
		<>{init ? <ListeningNormalDetail englishTest={init} /> : null}</>
	)
}