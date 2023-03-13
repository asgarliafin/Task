import React from 'react'
import { Container } from 'react-bootstrap'
import './heading.scss';

const Heading = ({text}) => {
  return (
    <div id={'heading'}>
        <Container>
            <h2>{text}</h2>
        </Container>
    </div>
  )
}

export default Heading;