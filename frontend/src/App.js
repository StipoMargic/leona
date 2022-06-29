import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavbarComponent from "./components/NavbarComponent";
import HeroComponent from "./components/HeroComponent";
import FooterComponent from "./components/FooterComponent";

function App() {
	return (
		<div className="container">
			<HeroComponent />
		</div>
	);
}

export default App;
