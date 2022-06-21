import React from "react"
import { NavLink } from "react-router-dom"
import { Button , Navbar , Nav , NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import "./Navbar.css"
import { useSessionUser } from "../store/userStore"
import { logout } from "../user/userService"

export default function NavBarMenu() {
  const user = useSessionUser()
  const btnprofile = <Button className="btn-circle btn-success mb-2 mx-2"><PersonCircle className="mb-2"/></Button>
  
  const menu = user ? <NavDropdown
    className="position-absolute end-0 top-0"
    title={btnprofile}
    menuVariant="dark dropmenu"
  >

    <NavLink to="/password" className="dropdown-item">Change Password</NavLink>
    <NavLink to="/info" className="dropdown-item">Info</NavLink>
    <NavDropdown.Divider />
    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
  </NavDropdown>
  : <NavLink to="/login"><Button className="btn btn-secondary mb-2 mx-2 position-absolute end-0">Login</Button></NavLink>

  return (
    <Navbar className="position-relative" bg="dark" variant="dark">
      <Navbar.Brand className="ms-2 me-5">Desconfio</Navbar.Brand>
        <Nav className="me-auto ms-0">
          <NavLink className="navlink" to="/">Welcome</NavLink>&nbsp;&nbsp;
          <NavLink className="navlink" to="/game">Game</NavLink>&nbsp;&nbsp;
          {menu}&nbsp;&nbsp;
        </Nav>
  </Navbar>
  )
}