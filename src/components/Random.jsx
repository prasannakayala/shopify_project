// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// function OrderingExample() {
//   return (
//     <Container>
//       <Row>
//         <Col xs>First, but unordered</Col>
//         <Col xs={{ order: 2 }}>Second, but last</Col>
//         <Col xs={{ order: 1 }}>Third, but second</Col>
//       </Row>
//     </Container>
//   );
// }

// export default OrderingExample;

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// function AutoLayoutSizingExample() {
//   return (
//     <Container>
//       <Row>
//         <Col border="primary" style={{border: "1px solid blue"}}>1 of 3</Col>
//         <Col style={{border: "1px solid blue"}} 
//         // xs={6} sm={6}
//         >2 of 3</Col>
//         <Col style={{border: "1px solid blue"}} xs md="auto">3 of 3</Col>
//       </Row>
//       <Row>
//         <Col style={{border: "1px solid blue"}} xs lg={2}>1 of 3</Col>
//         <Col style={{border: "1px solid blue"}} xs={5} sm={6}>2 of 3 (wider)</Col>
//         <Col style={{border: "1px solid blue"}} >3 of 3</Col>
//       </Row>
//     </Container>
//   );
// }

// export default AutoLayoutSizingExample;

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// function RowColLayoutExample() {
//   return (
//     <Container>
//       <Row xs={2} md={3} lg={6}>
//         <Col>1 of 2</Col>
//         <Col>2 of 2</Col>
//         <Col>2 of 2</Col>
//         <Col>2 of 2</Col>
//       </Row>
//       <Row xs={1} md={2}>
//         <Col>1 of 3</Col>
//         <Col>2 of 3</Col>
//         <Col>3 of 3</Col>
//       </Row>
//       <Row xs="auto">
//         <Col>1 of 3</Col>
//         <Col>2 of 3</Col>
//         <Col>3 of 3</Col>
//       </Row>
//     </Container>
//   );
// }

// export default RowColLayoutExample

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RowColLayoutColWidthBreakpointExample() {
  return (
    <Container>
      <Row md={4}>
        <Col>1 of 3</Col>
        <Col xs={6}>2 of 3</Col>
        <Col>3 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  );
}

export default RowColLayoutColWidthBreakpointExample;