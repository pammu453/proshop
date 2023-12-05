import React from 'react';
import { Alert, Container } from 'react-bootstrap';

const Error = ({variant,children }) => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
      <Alert variant={variant}>
        {children}
      </Alert>
    </Container>
  );
};

Error.defaultProps={
    variant:"info"
}

export default Error;