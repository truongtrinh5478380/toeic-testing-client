import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getExerciseById } from '../../services/auth'
import ReadingCompreDetail from '../../components/ReadingCompreDetail/ReadingCompreDetail'
export default function ReadingCompre() {

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
		init ? <ReadingCompreDetail englishTest={init} /> : <></>
	)
}