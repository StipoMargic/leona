import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import HeroComponent from "./components/HeroComponent";
import CategoriesComponent from "./components/CategoriesComponent";

function App() {
	return (
		<div className="container">
			<HeroComponent />
			<CategoriesComponent />
		</div>
	);
}

export default App;
