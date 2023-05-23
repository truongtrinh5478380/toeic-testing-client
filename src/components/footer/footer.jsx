import './footer.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiFillTwitterCircle } from 'react-icons/ai';
import { MdOutlineFacebook } from "react-icons/md";
export default function Footer() {

	return (
		<div className="footer" style={{ backgroundImage: "url('/images/vecteezy_cloud.png')", WebkitBackgroundSize: "contain", backgroundRepeat: "no-repeat" }}>
			<ul className='nav-footer'>
				<li>Tests</li>
				<li>Exercises</li>
				<li>Rank</li>
				<li>Contact us</li>
			</ul>
			<div className='search-network'>
				<div className='logo'>
					<span style={{ color: "#808285" }}>toeic</span>
					<span style={{ color: "#6088E0" }}>.test</span>
				</div>
				<div className="search-footer">
					<input className="inp-search" />
					<button className="btn-search"><AiOutlineSearch /></button>
				</div>
				<div className='social-network'>
					<span>
						<AiFillTwitterCircle />
					</span>
					<span>
						<MdOutlineFacebook />
					</span>
				</div>
			</div>
		</div>
	)
}