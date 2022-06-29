import React from "react";
import pic from "../assets/naslovna.jpg";
import s1 from "../assets/slika1.jpg";
import s2 from "../assets/slika2.jpg";
import s3 from "../assets/ideja2.jpg";
import { Container, Row, Col } from "react-bootstrap";
const HeroComponent = () => {
	return (
		<Container>
			<Row>
				<Col
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						fontSize: "2rem",
					}}
				>
					<p style={{ textAlign: "center", fontStyle: "italic" }}>
						Zlatni nakit
						<br /> Sve na jednom mjestu
					</p>
				</Col>
				<Col>
					<img src={pic} className="hero-picture" />
				</Col>
			</Row>
			<Row
				style={{
					marginTop: 80,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Col>
					<img src={s2} className="hero-picture" />
				</Col>
				<Col>
					<img src={s1} className="hero-picture" />
				</Col>
				<Col>
					<img src={s3} className="hero-picture" style={{ height: 500 }} />
				</Col>
			</Row>
		</Container>
	);
};

export default HeroComponent;
