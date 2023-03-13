import React from 'react'
import { Container } from 'react-bootstrap'
import './_heading.scss';

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