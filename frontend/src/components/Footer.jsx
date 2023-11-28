import { Container,Row,Col } from "react-bootstrap"

const Footer = () => {
    const currentYear =new Date().getFullYear()
  return (
    <footer style={{marginTop:"40px"}}>
      <Container>
        <Row>
            <Col >
            <p className="text-center my-0">Pro-Shop &copy; {currentYear}</p>
            <p className="text-center">Made with &#10084; &#65039; by Pramod Savant</p>
            </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
