import React from "react";
import pic from "../assets/Picture1.jpg";
import { Container, Row, Col } from "react-bootstrap";

const ContactComponent = () => {
	return (
		<Container>
			<Row style={{ marginTop: "3rem" }}>
				<Col>
					<img src={pic} className="contact-picture" />
				</Col>
				<Col>
					<h2 style={{ marginBottom: "15rem" }}>POSJETITE NAS! </h2>
					<h6>ZLATARNA GOLD</h6>
					<p>Put Brodarice 5,Split</p> <p> Tel: +385 99 5444 059 </p>
					<p>Pon-Ned (Mon.-Sun.) 09:00 - 20:00H (09:00 AM - 08:00 PM)</p>
				</Col>
			</Row>
		</Container>
	);
};

export default ContactComponent;
