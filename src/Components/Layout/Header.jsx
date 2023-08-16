import React, { useContext } from 'react'
import AuthContext from '../../Store/AuthContext'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { BiLogOut } from 'react-icons/bi'

const Header = (props) => {
    const authcontext = useContext(AuthContext)
    const navigate = useNavigate()


    const location = useLocation()
  return (
    <>
        <Navbar>
            <Container>
                <Nav className='flex-grow-3'>
                    <Nav.Item style={{color:'#fff',fontSize:"25px"}}>
                        Expense Tracker
                    </Nav.Item>

                </Nav>
            </Container>
            {

                authcontext.isLoggedIn && location.pathname!=="/auth"&&(
                    <Button style={{color:"turquoise"}}>
                        <BiLogOut/>
                    </Button>
                )

            }

        </Navbar>
        {
            location.pathname!=='/profile' &&(
                <span>
                    Your Profile is Incomplete
                    <NavLink to='/profile'>Complete Now</NavLink>

                </span>
            )
        }



    </>
  )
}

export default Header