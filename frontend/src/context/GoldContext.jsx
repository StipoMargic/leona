import React, { createContext, useContext, useState, useEffect } from "react";

const GoldContext = createContext();
export const useGoldContext = () => useContext(GoldContext);

export const GoldProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch("http://localhost:4000/api/categories", requestOptions)
			.then((response) => response.json())
			.then((result) => setCategories([...result]))
			.catch((error) => console.log("error", error));
	}, []);

	useEffect(() => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch("http://localhost:4000/api/products", requestOptions)
			.then((response) => response.json())
			.then((result) => setProducts(...result))
			.catch((error) => console.log("error", error));
	}, []);
	return (
		<GoldContext.Provider value={{ products, categories }}>
			{children}
		</GoldContext.Provider>
	);
};

export default GoldContext;
