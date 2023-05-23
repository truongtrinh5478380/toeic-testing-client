import "./ContactPage.scss"
export default function ContactPage() {
	return (
		<div className="contact">
			<h1>Contact us</h1>
			<div className="contact-form">
				<input type={"text"} className="name" placeholder="Name" />
				<input type={"email"} className="email" placeholder="Email" />
				<input type={"text"} className="subject" placeholder="Subject" />
				<textarea className="content-mess" name="postContent" rows={4} cols={40} placeholder="Write message" />
				<button className="btn-sub">Send</button>
			</div>
		</div>
	)
}