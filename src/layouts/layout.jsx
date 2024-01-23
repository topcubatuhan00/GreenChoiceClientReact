import React, {useState, useEffect} from "react";
import "./layout.css";
import { Row, Col } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Header } from './../components/Navbar/navbar';
import { Home } from './../components/Home/home';
import { Login } from './../components/Login/login';
import { Register } from './../components/Register/register';
import { PasswordRecovery } from './../components/PasswordRecovery/password-recovery';
import { Profile } from "../components/Profile/profile";
import { Settings } from "../components/Settings/Settings";

export default function Layout() {

	const navigate = useNavigate();
    const [flag, setFlag] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem('token');
		const path = window.location.pathname;
		const allowedPaths = ["/login", "/register", "/password-recovery"];
		
		token ? setFlag(true) : setFlag(false)

		if(!token && !allowedPaths.includes(path)){
			navigate('/login')
		}else if(allowedPaths.includes(path)){
			setFlag(false)
        }

	}, [navigate])

	return (
		<div className="baseContainer">
			<Row>
				<div className="m-0 p-0">
					{
						flag && <Header />
					}
				</div>
				<Col md={12} className="w-100 contentContainer">
					<Routes>
						<Route exact path="/" element={<Home />}/> 
						<Route exact path="/login" element={<Login />}/> 
						<Route exact path="/register" element={<Register />}/> 
						<Route exact path="/password-recovery" element={<PasswordRecovery />}/> 
						<Route exact path="/settings" element={<Settings />}/> 
						<Route exact path="/profile" element={<Profile />}/> 
						<Route exact path="/product" element={<Profile />}/> 
					</Routes>
				</Col>
				{/* <div className="m-0 p-0">
					{
						flag && <Footer />
					}
				</div> */}
			</Row>
		</div>
	);
}
