import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryProductsComponent = () => {
	const { name } = useParams();
	const [data, setData] = useState([]);

	useEffect(() => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch("http://localhost:4000/api/categories/test", requestOptions)
			.then((response) => response.json())
			.then((result) => setData([...result]))
			.catch((error) => console.log("error", error));
	}, [name]);

	return (
		<>
			<h1 className="mt-5 text-center">Dobrodošli na {name}</h1>
			{data == undefined || data.length === 0 ? <p>Nema proizvoda</p> : "LISTA"}
		</>
	);
};

export default CategoryProductsComponent;
