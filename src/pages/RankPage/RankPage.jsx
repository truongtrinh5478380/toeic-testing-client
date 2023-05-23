import { useEffect, useState } from "react"
import "./RankPage.scss"
import { FaUserCircle } from "react-icons/fa"
import { getRanking } from "../../services/history"
export default function RankPage() {
	const [rank, setRank] = useState([])
	let increId = 0;

	useEffect(() => {
		(async () => {
			const rankRes = await getRanking();
			if(rankRes) setRank(rankRes)
		})();
	}, [])
	return (
		<div className="rank-page">
			<h1> Rank </h1>
			<div className="top-winner" style={{ backgroundImage: "url(/images/Tribune.svg)" }}>
				<p>Top winners of the week</p>
				<div className="name-winner">
					<div className="no-2">
						<FaUserCircle className="user-icon" />
						<p>{rank.length > 1 ? rank[1].user[0].username : ""}</p>
					</div>
					<div className="no-1">
						<FaUserCircle className="user-icon" />
						<p>{rank.length > 0 ? rank[0].user[0].username : ""}</p>
					</div>
					<div className="no-3">
						<FaUserCircle className="user-icon" />
						<p>{rank.length > 2 ? rank[2].user[0].username : ""}</p>
					</div>
				</div>
			</div>
			<div className="rank-table">
				<p className="title-tb">Rank Table</p>
				<table className="tb-rank">
					<tr>
						<th>Place</th>
						<th>Name</th>
						<th>Score</th>
					</tr>
					{rank && rank.map((r, i) => (
						<tr>
							<td>{increId = increId + 1}</td>
							<td className="td-user">
								<FaUserCircle className="user-icon" />
								<p>{r.user[0].username}</p>
							</td>
							<td>{r.totalPoints}</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	)
}