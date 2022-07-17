import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            Records
          </NavLink>
          <NavLink to="/team" activeStyle>
            Team
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;