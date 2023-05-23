import { Outlet } from "react-router-dom";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";


export default function MainLayout() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}