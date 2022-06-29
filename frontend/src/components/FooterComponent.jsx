import React from "react";
import pic from "../assets/logo.png";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa";
const FooterComponent = () => {
	return (
		<Container style={{ marginTop: "10rem" }}>
			<Row>
				<Col
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<img src={pic} style={{ transform: "scale(1.5)" }} />
				</Col>
				<Col>
					<h4>Kontakt informacije</h4>
					<p>OIB: 93066636005</p>
					<p>Put Brodarice 5,Split</p> <p> Tel: +385 99 5444 059 </p>
					<p>Pon-Ned (Mon.-Sun.) 09:00 - 20:00H (09:00 AM - 08:00 PM)</p>
					<p>goldshop@gold.hr</p>
					<div style={{ marginBottom: 20 }}>
						<FaFacebook size={30} style={{ marginRight: 20 }} />
						<FaInstagram size={30} />
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default FooterComponent;
