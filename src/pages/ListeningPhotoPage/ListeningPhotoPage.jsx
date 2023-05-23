import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getExerciseById } from "../../services/auth"
import ListeningPhotoDetail from "../../components/ListeningPhotoDetail/ListeningPhotoDetail"

export default function ListeningPhoto() {
	const [searchParams, setSearchParams] = useSearchParams()

	const [init, setInit] = useState()

	useEffect(() => {
		(async () => {
			const id = searchParams.get('id')
			const readingCompreRes = await getExerciseById(id)
			setInit(readingCompreRes)
		})()
	}, [])

	return <>{init ? <ListeningPhotoDetail englishTest={init} /> : null}</>
}