import Link from "next/link";
import axios from 'axios';
import { useState } from "react";
import Router from 'next/router';
import cookie from 'js-cookie'
import {
  Form,
  FormControl,
  Button,
  FormLabel,
  FormGroup,
} from "react-bootstrap";

const LoginForm = () => {

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const loginHandler = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    try {
      const data = await axios({
        method: 'post',
        url: 'https://2e8ui9n2p8.execute-api.us-east-1.amazonaws.com/dev/signIn',
        data: {
          email, password
        }
      });
      if(data.status===200){
        console.log(data);
        localStorage.setItem("memorang-email", email);
        localStorage.setItem("memorang-user", data.data.data.userId);
        cookie.set("memorang-user", data.data.data.userId);
        setLoading(true);
        Router.push('/search');
      }  
    } catch (error) {
      if(error.response.status === 400){
        setLoading(true);
        setNewUser(true);
      } else if(error.response.status === 401){
        setInvalidPassword(true);
      } else {
        setLoginError(true);
      }
    }
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
      await loginHandler(event);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <FormGroup className="mb-3" controlId="email">
        <FormLabel>Email</FormLabel>
        <FormControl type="email" name="email" placeholder="useremail@domain.com" pattern='(\w\.?)+@[\w\.-]+\.\w{2,}' required/>
        <FormControl.Feedback type="invalid">
            Please provide a valid email.
          </FormControl.Feedback>
      </FormGroup>

      <FormGroup className="mb-3" controlId="password">
        <FormLabel>Password</FormLabel>
        <FormControl type="password" name="password" required/>
        <FormControl.Feedback type="invalid">
            Please provide a password.
          </FormControl.Feedback>
      </FormGroup>
      {loading === false ? (<><Button variant="primary" type="submit">
        LogIn
      </Button><span>
      <Link href="/signup">
        <a style={{ textDecoration:"none", fontStyle: "italic", fontSize: "1em" }}>{" "}Create account?</a>
      </Link>
      </span></>) : null}
      {newUser === true ? <p>User doesnot exists! Signup <Link href='/signup'>here</Link></p> : null}
      {invalidPassword === true ? <p>Please check the password and try again!</p> : null}
      {loginError === true ? <p>Error logging in! Try again later</p> : null}
    </Form>
  );
};

export default LoginForm;
