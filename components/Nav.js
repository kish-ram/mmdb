import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Nav.module.css";
import {
  Navbar,
  Container,
  Nav,
} from "react-bootstrap";

const TopNavBar = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if(localStorage.getItem('memorang-email')){
      setLoggedIn(true);
    }
  },[])
  console.log(isLoggedIn)
  return (
     <Navbar bg="dark" variant="dark">
     <Container>
     <Nav className="me-auto">
      {isLoggedIn 
        ? <Link href="/logout" passHref><Nav.Link>Logout</Nav.Link></Link> 
        : <Link href="/login" passHref><Nav.Link>Login</Nav.Link></Link> }
     
     <Link href="/search" passHref><Nav.Link>Search</Nav.Link></Link>
     <Link href="/favorites" passHref><Nav.Link>Favorites</Nav.Link></Link>
     </Nav>
     </Container>
   </Navbar>
  );
};

export default TopNavBar;
