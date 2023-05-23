import { useEffect, useState } from "react"
import ReadingNormalDetail from "../../components/ReadingNormalDetail/ReadingNormalDetail"
import { useSearchParams } from 'react-router-dom'
import { getExerciseById } from "../../services/auth"

export default function ReadingNormal() {
	const [searchParams, setSearchParams] = useSearchParams()

	const [init, setInit] = useState()

	useEffect(() => {
		(async () => {
			const id = searchParams.get('id')
			const readingCompreRes = await getExerciseById(id)
			console.log(readingCompreRes);
			setInit(readingCompreRes)
		})()
	}, [])
	return (
		init ? <ReadingNormalDetail englishTest={init} /> : <></>
	)
}