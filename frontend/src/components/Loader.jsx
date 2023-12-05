import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"80vh"}}>
      <Spinner animation="border" variant="dark" />
    </div>
  );
}

export default Loader;