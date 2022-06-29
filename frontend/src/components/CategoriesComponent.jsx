import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useGoldContext } from "../context/GoldContext";
const CategoriesComponent = () => {
	const { categories } = useGoldContext();
	if (categories == undefined) {
		return <h1>loading</h1>;
	}
	return (
		<>
			<Container>
				<Row>
					{categories.length > 0 &&
						categories.slice(0, 3).map((category) => (
							<Col className="mt-5" key={category.name}>
								<figure className="snip1577">
									<img
										src={`http://localhost:4000/images/${category.imageURL}`}
										alt="sample99"
									/>
									<figcaption>
										<h4>{category.name}</h4>
									</figcaption>
								</figure>
							</Col>
						))}
				</Row>
			</Container>
		</>
	);
};

export default CategoriesComponent;
