import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Button } from 'react-bootstrap';

const NotFoundMessage = (props) => {
  return (
    <Jumbotron style={{ width: '75vw', margin: '0 auto', marginTop: '4em' }}>
      <h1>Not Found</h1>
      <p>Server can't find the requested resource.</p>
      <p>
        <Button href='/' variant='primary'>
          Go back
        </Button>
      </p>
    </Jumbotron>
  );
};

export default NotFoundMessage;
