import React from "react";
import pic from "../assets/onama.jpg";
import { Container, Row, Col } from "react-bootstrap";

const AboutComponent = () => {
	return (
		<Container>
			<Row style={{ marginTop: "3rem" }}>
				<Col>
					<p>
						<strong>Gold </strong> je hrvatski brand visokokvalitetnog zlatnog
						nakita koji je dizajniran da bi se nosio uz osmijeh. Iz našeg
						impresivnog proizvodnog pogona u srcu Splita nastaje Gold nakit – od
						početne skice pa sve do završne obrade. Sinergijom suvremenih
						tehnologija i tradicionalnih vještina majstora zlatara velika
						važnost se pridaje kvaliteti, a u svaki detalj utrošeno je puno
						rada, truda i ljubavi. Ovim putem Vam sa zadovoljstvom predstavljamo
						jedan dio iz našeg velikog asortimana raznovrsnog, modernog i
						klasičnoga vrhunskog nakita, izrađenoga od zlata, u kombinaciji sa
						dragim, poludragim kamenjem, biserima i koraljima. Kroz protekle
						godine rada, svojom ponudom, kvalitetom i cijenom, zhvaljujući
						pažljivo biranim dobavljačima iz zemlje i inozemstva, kao i
						višegodišnjem vlastitom iskustvu u izradi nakita, stekli smo zapažen
						ugled kod naših klijenata, koji se zahvaljujući njihovom
						zadovoljstvu redovito vraćaju. Također pružamo usluge popravka
						zlatnog nakita te otkupa i zamijene starog zlata po iznimno
						prihvatljivim cijenama. Naše iskustvo i dugovječnost u poslovanju
						zlatnim nakitom garancija su naše kvalitete. Također izrađujemo
						nakit po naružbi te da smo u mogućnosti na taj način izaći u susret
						svim vašim željama. Posjetite nas bez obaveze i uvjerite se u našu
						bogatu ponudu i povoljne cijene.
					</p>
				</Col>
				<Col>
					<img
						src={pic}
						style={{ width: 420, marginLeft: "3rem" }}
						className="contact-picture"
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default AboutComponent;
