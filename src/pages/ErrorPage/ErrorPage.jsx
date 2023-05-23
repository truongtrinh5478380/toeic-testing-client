import { useRouteError } from "react-router-dom";
import "./ErrorPage.scss"

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);
	return (
		<div id="error-page">
			{/* <h1>Oops!</h1>
			<p>Sorry, unexpected error has occured</p> */}
			<img src="images/error-page.jpg" alt="error-page" />
			{/* <p>
				<i>{error.statusText || error.message}</i>
			</p> */}
		</div>
	);
}