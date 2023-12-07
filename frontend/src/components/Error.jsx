import React from 'react';
import { Alert, Container } from 'react-bootstrap';

const Error = ({variant,children }) => {
  return (
    <Container>
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