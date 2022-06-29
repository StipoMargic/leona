import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	Navbar,
	Container,
	Form,
	Button,
	Nav,
	NavDropdown,
	FormControl,
	Modal,
} from "react-bootstrap";
import { useGoldContext } from "../context/GoldContext";

const NavbarComponent = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [loginInfo, setLoginInfo] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const username = localStorage.getItem("name");
	const handleClose = () => setIsOpen(false);
	const { categories } = useGoldContext();
	const handleChange = (event) => {
		setLoginInfo((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};
	// klik prijavi se
	const handleSubmit = (e) => {
		e.preventDefault();
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(loginInfo),
			redirect: "follow",
		};

		fetch("http://localhost:4000/api/login", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.message) {
					setError(result.message);
					return;
				}
				localStorage.setItem("name", result.firstName);
				localStorage.setItem("token", result.token);
				setIsOpen(false);
			})
			.catch((error) => setError("Nesto je poslo po krivu!"));
	};

	return (
		<div className="container">
			<Navbar bg="light" expand="lg">
				<Container fluid>
					<Navbar.Brand href="#">Gold Shop</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav
							className="me-auto my-2 my-lg-0"
							style={{ maxHeight: "100px" }}
							navbarScroll
						>
							<Nav.Link href="/">Početna</Nav.Link>
							<Nav.Link href="/about">O nama</Nav.Link>
							<NavDropdown title="Proizvodi" id="navbarScrollingDropdown">
								{categories != undefined &&
									categories.map((category) => (
										<div key={categories.id}>
											<NavDropdown.Item href={`/categories/${category.name}`}>
												{category.name}
											</NavDropdown.Item>
											<NavDropdown.Divider />
										</div>
									))}
							</NavDropdown>
							<Nav.Link href="/contact">Kontakt</Nav.Link>
						</Nav>
						<Form className="d-flex">
							<FormControl
								type="search"
								placeholder="Search"
								className="me-2"
								aria-label="Search"
							/>
							<Button variant="outline-success">Search</Button>
						</Form>
						{username != null ? (
							<p>Bok {username}</p>
						) : (
							<Nav.Link href="#" onClick={() => setIsOpen(true)}>
								Login
							</Nav.Link>
						)}
						<Nav.Link href="#">Košarica</Nav.Link>
						{username && (
							<Link to="/logout" href="#">
								Odjava{" "}
							</Link>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Modal
				show={isOpen}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>LOGIN</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input
						type="text"
						name="email"
						onChange={(e) => handleChange(e)}
						className="form-control"
						placeholder="Email"
					/>
					<input
						type="password"
						name="password"
						onChange={(e) => handleChange(e)}
						className="form-control mt-3 mb-4"
						placeholder="Lozinka"
					/>
					<Button variant="success" type="submit" onClick={handleSubmit}>
						Prijavi se
					</Button>
					{error !== "" && <p className="text-center">{error}</p>}
				</Modal.Body>
				<Modal.Footer>
					Niste registrirani? <Button variant="primary">Registriraj se</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default NavbarComponent;
