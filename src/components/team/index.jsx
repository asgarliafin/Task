import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import waiters from '../../data/waiters.json';
import Heading from '../heading';
import './_team.scss';

const Team = () => {
  return (
    <div id={'team'}>
        <Heading text={'Team'}/>
        <Row className={'team-row'}>
            {waiters.map(({name, role, img}, i) =>(
                <Col lg={3} key={i}>
                    <div className="team-card">
                        <div className="card-img">
                            <Image src={img} width={100} height={100}/>
                        </div>
                        <div className="card-body">
                            <h4 className={'name'}>{name}</h4>
                            <h6 className={'role'}>{role}</h6>
                        </div>
                    </div>
                </Col>
            ) )}
        </Row>
    </div>
  )
}

export default Team;