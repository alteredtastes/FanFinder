import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './HomePage.css';

const HomePage = ({ submitSearch, searchAlbums, elements }) => (
  <div>
    <Grid>
      <Row>
        <Col xs={2} sm={2} md={2}>
          <p>
            <input onChange={submitSearch} placeholder="Search an artist..." type="text" />
          </p>
          <Row>
            {elements}
          </Row>
        </Col>
      </Row>
    </Grid>
  </div>
);

export { HomePage };
