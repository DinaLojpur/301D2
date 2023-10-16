import React from 'react';


import { Card, CardBody, Row, Col } from 'reactstrap';

const CryptoTopCards = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-2 [Cryptocurrency]                                           */
    /*--------------------------------------------------------------------------------*/
    <Row>

      <Col sm="12" lg="3">
        {/*--------------------------------------------------------------------------------*/}
        {/* Card-2                                                                         */}
        {/*--------------------------------------------------------------------------------*/}
        <Card className="bg-info text-dark-white">
          <CardBody>
            <div className="d-flex align-items-center">
              <div>
                <h3 className="font-12 mb-3">Users</h3>
                <h3 className="mt-4 fw-bolder mb-0">0</h3>
                <small>currently registered</small>
              </div>
              <div className="circle-box lg-box bg-light ms-auto opacity-50">
                <i className="bi bi-coin text-info" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>

      <Col sm="12" lg="3">
        {/*--------------------------------------------------------------------------------*/}
        {/* Card-3                                                                         */}
        {/*--------------------------------------------------------------------------------*/}
        <Card className="bg-success text-dark-white">
          <CardBody>
            <div className="d-flex align-items-center">
              <div>
                <h3 className="font-12 mb-3">Scheduled Scans</h3>
                <h3 className="mt-4 fw-bolder mb-0">0</h3>
                <small>coming up</small>
              </div>
              <div className="circle-box lg-box bg-light ms-auto opacity-50">
                <i className="bi bi-coin text-success" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col sm="12" lg="3">
        {/*--------------------------------------------------------------------------------*/}
        {/* Card-1                                                                         */}
        {/*--------------------------------------------------------------------------------*/}
        <Card className="bg-warning text-dark-white">
          <CardBody>
            <div className="d-flex align-items-center">
              <div>
                <h3 className="font-12 mb-3">Total Scans</h3>
                <h3 className="mt-4 fw-bolder mb-0">0</h3>
                <small>all time</small>
              </div>
              <div className="circle-box lg-box bg-light ms-auto opacity-50">
                <i className="bi bi-currency-bitcoin text-warning" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default CryptoTopCards;
