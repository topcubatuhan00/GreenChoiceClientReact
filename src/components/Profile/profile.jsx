import React, { useState, useEffect } from "react";
import "./profile.css";
import { Image } from "react-bootstrap";
import GenericApiService from './../../services/GenericApiService';

export const Profile = () => {
	const [user, setUser] = useState({})
	const [loggedUserId, setLoggedUserId] = useState()
	const genericApiService = new GenericApiService();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = atob(token?.split(".")[1]);
			const parsedToken = JSON.parse(decodedToken);
			setLoggedUserId(parsedToken.Id);
		}
	}, [])

	useEffect(() => {
		const getUser = async () => {
			if(loggedUserId > 0){
				const res = await genericApiService.get(
					`/User/${loggedUserId}`
				)
				if(res.data){
					setUser(res.data.data);
				}
			}
		}

		getUser()

	}, [loggedUserId]);

	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-md bg-dark text-center">
						<Image
							width={200}
							src={
								"https://localhost:7269/Image/GetImage/" + user.photo
							}
							roundedCircle
						/>
					</div>
					<div className="col-md">
						<div className="row mt-4">
							<div className="col-md">
								<form>
								<div className="form-group">
										<label htmlFor="userName">UserName:</label>
										<input type="text" className="form-control" id="userName" defaultValue={user.userName} />
									</div>
									<div className="form-group">
										<label htmlFor="email">Email:</label>
										<input type="email" className="form-control" id="email" defaultValue={user.email} />
									</div>
									{/* <div className="form-group">
										<label for="password">Password:</label>
										<input type="password" className="form-control" id="password" value="" />
									</div> */}
									{/* <div className="form-group">
										<label for="role">Role:</label>
										<input type="text" className="form-control" id="role" value="Admin" disabled />
									</div> */}
									<button type="submit" className="btn btn-primary">Save Changes</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
