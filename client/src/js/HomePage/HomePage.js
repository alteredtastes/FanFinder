import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './HomePage.css';

const HomePage = ({ submitSearch, artistElements, albumElements }) => (
  <div>
    <Grid>
      <Row>
        <Col xs={2} sm={2} md={2}>
          <p>
            <input onChange={submitSearch} placeholder="Search an artist..." type="text" />
          </p>
          <Row>
            {artistElements}
          </Row>
        </Col>
        <Col xs={2} xsOffset={3} sm={2} smOffset={3} md={2} mdOffset={3}>
          <Row>
            {albumElements}
          </Row>
        </Col>
      </Row>
    </Grid>
  </div>
);

export { HomePage };
