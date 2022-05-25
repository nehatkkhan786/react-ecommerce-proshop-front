
import { Nav, Navbar , Container, NavDropdown} from "react-bootstrap";
import {LinkContainer, NavLink} from 'react-router-bootstrap'
import ProductContext from "../ContextAndReducer/ProductContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Header = () => {

    const {UserDetail, userLogOut} = useContext(ProductContext)
    
    const navigate = useNavigate()

    const logoutHandler = () => {
        userLogOut()
        toast.success('Logout Successfully')
        
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' collapseOnSelect expand="lg">
         <Container  >
             <LinkContainer to='/'>
                <Navbar.Brand>G N Brothers</Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">

                <LinkContainer to='/cart'>
                    <Nav.Link > <i className="fa-solid fa-cart-shopping"></i> Cart</Nav.Link>
                </LinkContainer>

        

                {UserDetail ?(
                  <NavDropdown title={UserDetail.name} id='username'>
                       <LinkContainer to='/profile'>
                           <NavDropdown.Item>
                               Profile
                           </NavDropdown.Item>
                       </LinkContainer> 
                       <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                  </NavDropdown>  
                ): 
                <>
                <LinkContainer to='/login'>
                    <Nav.Link> <i className="fa-solid fa-user"></i> Login</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/register'>
                    <Nav.Link> <i className="fa-solid fa-user"></i> Register</Nav.Link>
                </LinkContainer>
                
                </>
                 }
                    {UserDetail?.isAdmin && (
                        <>
                        <NavDropdown title='Admin' id='admin'>
                        <LinkContainer to='/admin/userslist/'>
                            <NavDropdown.Item>
                              Users
                            </NavDropdown.Item>
                        </LinkContainer> 

                        <LinkContainer to='/admin/productlist/'>
                            <NavDropdown.Item>
                              Products
                            </NavDropdown.Item>
                        </LinkContainer> 
                        
                    </NavDropdown>
                        </>
                    )}
                      
                
        
            </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

        </header> 
    )
    
}

export default Header;