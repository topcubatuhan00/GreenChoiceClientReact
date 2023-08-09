import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layouts/layout"

function App() {
  return <div className="App">
	<div className="container-fluid">
		<Layout />
	</div>
	<ToastContainer theme="dark" />
  </div>;
}

export default App;
