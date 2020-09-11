import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card, Container, Alert } from 'react-bootstrap';
import api from '../../services/api';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const RegisterForm = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('error');
  const [readyToRedirect, setReadyToRedirect] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token !== undefined) {
      setReadyToRedirect(true);
      return;
    }
  }, []);

  const submitForm = (event) => {
    if (email === '' || password === '') return;

    api
      .post('/users', {
        email: email,
        password: password,
      })
      .then((res) => {
        setIsRegistered(true);
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
        setIsError(true);
      });
  };

  return (
    <Card
      style={{
        width: '80vw',
        margin: '0 auto',
        marginTop: '2em',
        padding: '2em',
      }}>
      <Card.Title>Register</Card.Title>
      <Card.Text>
        {isRegistered ? (
          <Alert variant={'primary'}>
            You've been successfully registered. You may log in now.
          </Alert>
        ) : (
          <div></div>
        )}
        {isError ? <Alert variant={'danger'}>{errorMsg}</Alert> : <div></div>}
      </Card.Text>
      <Container>
        <Form onSubmit={submitForm}>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Accept TOS' />
          </Form.Group>

          <Button onClick={() => submitForm()} variant='primary'>
            Submit
          </Button>
        </Form>
      </Container>
      {readyToRedirect ? <Redirect to='/'></Redirect> : <div></div>}
    </Card>
  );
};

export default RegisterForm;
