import React, { useState, useEffect } from "react";
import "./profile.css";
import { Image } from "react-bootstrap";
import GenericApiService from './../../services/GenericApiService';
import { toast } from "react-toastify"

export const Profile = () => {
	const [user, setUser] = useState({})
	const [loggedUserId, setLoggedUserId] = useState()
	const genericApiService = new GenericApiService();

	// for update
	const [newUserName, setNewUserName] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [newOldPassword, setNewOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newRePassword, setRePassword] = useState("");

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
			if (loggedUserId > 0) {
				const res = await genericApiService.get(
					`/User/${loggedUserId}`
				)
				if (res.data) {
					setUser(res.data.data);
					console.log(res.data.data);
				}
			}
		}

		getUser()

	}, [loggedUserId]);

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

	const handleSubmit = async (e) => {
		e.preventDefault()
		// console.log(newUserName,newEmail,newOldPassword,newPassword,newRePassword);
		const response = await genericApiService.post("/Auth/Login", { userName: user.userName, password: newOldPassword });
		if (response?.code === "ERR_BAD_RESPONSE") {
			notify('error', "Old Password Incorrect")
		} else {
			if(newPassword === newRePassword){
				const data = {
					id: user.id,
					userName: newUserName.length > 0 ? newUserName : user.userName,
					password: newPassword,
					email: newEmail.length > 0 ? newEmail : user.email,
					photo: user.photo,
					role: user.role
				}
				
				const res = await genericApiService.put(
                    "/User/Update",
                    data
                )
				if(res?.status === 200){
					notify('success', "Updated Successfully")
					window.location.reload()
				}

			}else{
				notify('error', "New Password & Re-New Password not equal")
			}

		}

	}

	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-md text-center mx-5">
						<Image
							width={200}
							src={
								"https://localhost:7269/Image/GetImage/" + user.photo
							}
							roundedCircle
						/>
					</div>
					<div className="col-md formDiv">
						<div className="row">
							<div className="col-md">
								<form onSubmit={handleSubmit}>
									<div className="form-group mb-3">
										<label htmlFor="userName">UserName:</label>
										<input onChange={(e) => setNewUserName(e.target.value)} type="text" className="form-control" id="userName" defaultValue={user.userName} />
									</div>
									<div className="form-group my-3">
										<label htmlFor="email">Email:</label>
										<input onChange={(e) => setNewEmail(e.target.value)} type="email" className="form-control" id="email" defaultValue={user.email} />
									</div>
									<div className="form-group my-3">
										<label htmlFor="oldPassword">Old Password:</label>
										<input onChange={(e) => setNewOldPassword(e.target.value)} type="password" className="form-control" id="oldPassword" />
									</div>
									<div className="form-group my-3">
										<label htmlFor="newPassword">New Password:</label>
										<input onChange={(e) => setNewPassword(e.target.value)} type="password" className="form-control" id="newPassword" />
									</div>
									<div className="form-group my-3">
										<label htmlFor="reNewPassword">Re-New Password:</label>
										<input onChange={(e) => setRePassword(e.target.value)} type="password" className="form-control" id="reNewPassword" />
									</div>
									<div className="text-center">
										<button type="submit" className="btn">Update Profile</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
