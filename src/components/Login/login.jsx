import React from "react";
import "./login.css"

export const Login = () => {
	return (
		<div className="outDivLogin">
			<main class="form-signin">
				<form>
					<img
						class="mb-4 banner-image"
						src="https://i.hizliresim.com/d5ke31k.png"
						alt=""
					/>
					<h1 class="h3 mb-3 fw-normal">Please sign in</h1>

					<div class="form-floating my-3">
						<input
							type="email"
							class="form-control"
							id="floatingInput"
							placeholder="name@example.com"
						/>
						<label for="floatingInput">Email address</label>
					</div>
					<div class="form-floating my-3">
						<input
							type="password"
							class="form-control"
							id="floatingPassword"
							placeholder="Password"
						/>
						<label for="floatingPassword">Password</label>
					</div>

					<button class="my-3 w-100 btn btn-lg btn-primary" type="submit">
						Sign in
					</button>
				</form>
			</main>
		</div>
	);
};
