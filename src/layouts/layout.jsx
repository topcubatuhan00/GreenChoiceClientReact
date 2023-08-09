import React, {useState, useEffect} from "react";
import "./layout.css";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from './../components/Navbar/navbar';
import { Home } from './../components/Home/home';
import { Login } from './../components/Login/login';
import { Register } from './../components/Register/register';
import { PasswordRecovery } from './../components/PasswordRecovery/password-recovery';
import { Footer } from './../components/Footer/footer';

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
		<Container>
			<Row>
				<div className="m-0 p-0">
					{
						flag && <Navbar />
					}
				</div>
				<Col md={12} className="m-0 p-0 w-100">
					<Routes>
						<Route exact path="/" element={<Home />}/> 
						<Route exact path="/login" element={<Login />}/> 
						<Route exact path="/register" element={<Register />}/> 
						<Route exact path="/password-recovery" element={<PasswordRecovery />}/> 
					</Routes>
				</Col>
				<div className="m-0 p-0">
					{
						flag && <Footer />
					}
				</div>
			</Row>
		</Container>
	);
}
