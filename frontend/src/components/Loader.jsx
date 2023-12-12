import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spinner animation="border" variant="dark" />
    </div>
  );
}

export default Loader;