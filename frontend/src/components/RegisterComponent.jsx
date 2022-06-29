import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
const RegisterComponent = () => {
	const navigate = useNavigate();
	const [registerInfo, setRegisterInfo] = useState({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
	});
	const [error, setError] = useState("");
	const handleChange = (event) => {
		setRegisterInfo((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	useEffect(() => {
		if (localStorage.getItem("name")) {
			navigate(-1);
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(registerInfo),
			redirect: "follow",
		};

		fetch("http://localhost:4000/api/register", requestOptions)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	};
	return (
		<div className="container">
			<Form>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Ime</Form.Label>
					<Form.Control
						type="text"
						placeholder="Ime"
						name="firstName"
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Prezime</Form.Label>
					<Form.Control
						type="text"
						placeholder="Prezime"
						name="lastName"
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
					/>
				</Form.Group>
				<Button onClick={handleSubmit} variant="primary" type="submit">
					REGISTRIRAJ SE
				</Button>
			</Form>
		</div>
	);
};

export default RegisterComponent;
