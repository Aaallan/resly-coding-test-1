import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Badge,
  CardSubtitle,
} from "reactstrap";
import { memo } from "react";

const UserInfo = memo(({ userData }) => {
  const { id, name, email, website, username, phone, address, company } =
    userData;

  const { name: companyName, catchPhrase, bs } = company;

  function formatAddress() {
    const { street, suite, city, zipcode } = address;
    return `${street}, ${suite}, ${city}, ${zipcode}`;
  }

  function renderBs() {
    const bsArray = bs.split(" ");
    return bsArray.map((bs) => (
      <Badge className="text-dark me-2" color="light">
        {bs}
      </Badge>
    ));
  }

  return (
    <Container>
      <Row className="gy-3">
        <Col md={6} lg={4}>
          <Card className="text-center">
            <CardBody>
              <div className="mb-4">
                <img
                  width={150}
                  height={150}
                  alt={name}
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${id}`}
                ></img>
              </div>
              <CardTitle tag="h4">{name}</CardTitle>
              <CardSubtitle className="mt-3 mb-2 text-muted">
                {email}
              </CardSubtitle>
              <CardSubtitle className="mb-2 text-muted">
                <a href={website}>{website}</a>
              </CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col sm={3}>
                  <h6 className="mb-0">User Name</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-secondary">{username}</p>
                </Col>
              </Row>
              <hr className="mt-1"></hr>
              <Row>
                <Col sm={3}>
                  <h6 className="mb-0">Phone</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-secondary">{phone}</p>
                </Col>
              </Row>
              <hr className="mt-1"></hr>
              <Row>
                <Col sm={3}>
                  <h6 className="mb-0">Address</h6>
                </Col>
                <Col sm={9}>
                  <p className="text-secondary">{formatAddress()}</p>
                </Col>
              </Row>
              <hr className="mt-1"></hr>
              <Row>
                <Col sm={3}>
                  <h6 className="mb-0">Company</h6>
                </Col>
                <Col sm={9}>
                  <h6>
                    {companyName} {renderBs()}
                  </h6>
                  <p className="text-secondary">{catchPhrase}</p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default UserInfo;
