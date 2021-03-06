import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent";
import NavbarComponent from "./components/NavbarComponent";
import LogoutComponent from "./components/LogoutComponent";
import ContactComponent from "./components/ContactComponent";
import AboutComponent from "./components/AboutComponent";
import FooterComponent from "./components/FooterComponent";
import { GoldProvider } from "./context/GoldContext";
import CategoryProductsComponent from "./components/CategoryProductsComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<GoldProvider>
				<NavbarComponent />
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/register" element={<RegisterComponent />} />
					<Route path="/logout" element={<LogoutComponent />} />
					<Route
						path="/categories/:name"
						element={<CategoryProductsComponent />}
					/>
					<Route path="/contact" element={<ContactComponent />} />
					<Route path="/about" element={<AboutComponent />} />
				</Routes>
				<FooterComponent />
			</GoldProvider>
		</BrowserRouter>
	</React.StrictMode>
);
