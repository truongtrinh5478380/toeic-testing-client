import { createBrowserRouter } from "react-router-dom";
import TestDetail from "./components/TestDetail/TestDetail";
import MainLayout from "./layouts/MainLayout";
import ContactPage from "./pages/ContactPage/ContactPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import ListeningPage from "./pages/ListeningPage/ListeningPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PersonalPage from "./pages/PersonalPage/PersonalPage";
import RankPage from "./pages/RankPage/RankPage";
import ReadingPage from "./pages/ReadingPage/ReadingPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import TestPage from "./pages/TestPage/TestPage";
import ManagerTopic from "./pages/ManagerTopicPage/ManagerTopicPage";
import { CreateTopic } from "./components/createTopic/createTopic";
import { CreateExercise } from "./components/createExercise/createExercise";
import ManagerExercise from "./pages/ManagerExercisePage/ManagerExercisePage";
import ListeningPhoto from "./pages/ListeningPhotoPage/ListeningPhotoPage";
import ListeningNormal from "./pages/ListeningNormalPage/ListeningNormalPage";
import ReadingNormal from "./pages/ReadingNormalPage/ReadingNormalPage";
import ReadingCompre from "./pages/ReadingComprePage/ReadingComprePage";


const webRouter = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "",
				element: <HomePage />,
			},
			{
				path: 'login',
				element: <LoginPage />
			},
			{
				path: 'signup',
				element: <SignUpPage />,
			},
			{
				path: 'testpage',
				element: <TestPage />
			},
			{
				path: 'listeningPage',
				element: <ListeningPage />
			},
			{
				path: 'readingPage',
				element: <ReadingPage />
			},
			{
				path: 'contactPage',
				element: <ContactPage />
			},
			{
				path: 'rankPage',
				element: <RankPage />
			},
			{
				path: 'personalPage',
				element: <PersonalPage />
			},
			{
				path: 'listeningPhoTo',
				element: <ListeningPhoto />
			},
			{
				path: 'listeningNormal',
				element: <ListeningNormal />
			},
			{
				path: 'readingNormal',
				element: <ReadingNormal />
			},
			{
				path: 'readingCompre',
				element: <ReadingCompre />
			},
			{
				path: 'testDetail',
				element: <TestDetail />
			},
			{
				path: 'managerTopic',
				element: <ManagerTopic />
			},
			{
				path: 'managerExercise',
				element: <ManagerExercise />
			},
			{
				path: 'createTopic',
				element: <CreateTopic />
			},
			{
				path: 'createExercise',
				element: <CreateExercise />
			},
		]
	},

])

export default webRouter