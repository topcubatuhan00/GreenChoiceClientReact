import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Offcanvas, Image } from "react-bootstrap";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [loggedUserName, setLoggedUserName] = useState("");
  const [loggedUserPhoto, setLoggedUserPhoto] = useState("");

	const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = atob(token?.split(".")[1]);
      const parsedToken = JSON.parse(decodedToken);
      setLoggedUserName(parsedToken.Name);
      setLoggedUserPhoto(parsedToken.Photo);
    }
  }, []);

  const handleLogout = () => {
	localStorage.removeItem("token")
	navigate("/login")
  }

  return (
    <>
      <Navbar key={false} expand={false} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand className="text-white" href="/">
            GreenChoice
          </Navbar.Brand>
          <Navbar.Toggle
            className="white-navbar-toggle"
            aria-controls={`offcanvasNavbar-expand-${false}`}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <hr />
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link className="navCenter" href="/profile">
                  <Image
                    width={100}
                    src={
                      "https://localhost:7269/Image/GetImage/" + loggedUserPhoto
                    }
                    roundedCircle
                  />
                  <h3>{loggedUserName}</h3>
                </Nav.Link>
                <hr />
                <Nav.Link href="/" className="navCenter">
                  <i className="fas fa-home"></i>
                  <span>Home</span>
                </Nav.Link>
                <Nav.Link href="/settings" className="navCenter">
                  <>
                    <i className="fas fa-cog" />
                  </>
                  <>
                    <span>Settings</span>
                  </>
                </Nav.Link>
                <Nav.Link onClick={() => handleLogout()} className="navCenter">
                  <i class="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
