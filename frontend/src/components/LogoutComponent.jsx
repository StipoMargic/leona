import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
	const navigate = useNavigate();
	useEffect(() => {
		localStorage.removeItem("name");
		localStorage.removeItem("token");
		navigate("/", { replace: true });
		window.location.reload();
	}, []);
	return <div></div>;
};

export default LogoutComponent;
