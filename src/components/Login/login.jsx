import React, { useState } from "react";
import GenericApiService from "../../services/GenericApiService";
import "./login.css"
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

export const Login = () => {

	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const genericApiService = new GenericApiService();
    const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
            userName: userName,
            password: password
        }
        const response = await genericApiService.post("/Auth/Login", data);
        if (response.status === 200) {
            navigate('/');
            notify('success', "Giriş Başarılı")
        }else{
            notify('error', "Kullanıcı adı veya parola hatalı")
        }
	}

	const notify = (type, message) => {
        switch (type) {
            case 'success':
                toast.success(message, { position: 'bottom-right' })
                break;
            case 'error':
                toast.error(message, { position: 'bottom-right' })
                break;
            default:
                break;
        }
    }

	return (
		<div className="outDivLogin">
			<main className="form-signin">
				<form onSubmit={handleSubmit}>
					<img
						className="mb-4 banner-image"
						src="https://i.hizliresim.com/d5ke31k.png"
						alt=""
					/>
					<h1 className="h3 mb-3 fw-normal">Please sign in</h1>

					<div className="form-floating my-3">
						<input
							type="text"
							className="form-control"
							id="floatingInput"
							placeholder="name@example.com"
							onChange={e => setUserName(e.target.value)}
						/>
						<label htmlFor="floatingInput">User Name</label>
					</div>
					<div className="form-floating my-3">
						<input
							type="password"
							className="form-control"
							id="floatingPassword"
							placeholder="Password"
							onChange={e => setPassword(e.target.value)}
						/>
						<label htmlFor="floatingPassword">Password</label>
					</div>

					<button className="my-3 w-100 btn btn-lg btn-primary" type="submit">
						Sign in
					</button>
				</form>
			</main>
		</div>
	);
};
