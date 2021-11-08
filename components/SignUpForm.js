import axios from 'axios';
import cookie from 'js-cookie'
import { useState } from "react";
import Link from 'next/link';
import {
  Form,
  FormControl,
  Button,
  FormLabel,
  FormGroup,
} from "react-bootstrap";

const SignUpForm = () => {

    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [existingUser, setExistingUser] = useState(false);
    const [signUpError, setSignUpError] = useState(false);

    const signUpHandler = async (event) => {
      event.preventDefault();
      const email = event.target[0].value;
      const password = event.target[1].value;
      setLoading(true);
      try {
        const data = await axios({
          method: 'post',
          url: 'https://2e8ui9n2p8.execute-api.us-east-1.amazonaws.com/dev/signUp',
          data: {
            email, password
          }
        });
        if(data.status===200){
          console.log(data);
          localStorage.setItem("memorang-email", email);
          localStorage.setItem("memorang-user", data.data.data.userId);
          cookie.set("memorang-user", data.data.data.userId);
          setLoading(false);
          Router.push('/search');
        }  
      } catch (error) {
        if(error.response.status === 400){
          setExistingUser(true);
        } else{
          setSignUpError(true);
        }
      }
    }
    
    const checkPasswords = (event) => {
      if(event.target[1].value === "") {
        return false;
      } else if((event.target[2].value === "")){
        return false;
      } else if((event.target[1].value != event.target[2].value)){
        event.target[2].setCustomValidity('Password Mismatch');
        return false;
      } else if(event.target[1].value === event.target[2].value) {
        event.target[2].setCustomValidity('');
        return true;
      } else {
        return true
      }
    }

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false ||  checkPasswords(event) === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() &&  checkPasswords(event)) {
      await signUpHandler(event);
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

      <FormGroup className="mb-3" controlId="confirmPassword">
        <FormLabel>Confirm Password</FormLabel>
        <FormControl type="password" name="confirmPassword" required/>
        <FormControl.Feedback type="invalid">
            Password not matching.
          </FormControl.Feedback>
      </FormGroup>
      {loading === false ? <Button variant="success" type="submit">
        Sign Up
      </Button> : null}
      {existingUser === true ? <p>User already exists! Try <Link href='/login'>login</Link></p> : null}
      {signUpError === true ? <p>Error signing up! Try again later</p> : null}
    </Form>
  );
};

export default SignUpForm;
