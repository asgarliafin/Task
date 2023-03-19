import React from 'react';
import { Container } from 'react-bootstrap';
import { Hero, Menu, Team } from 'components';

function About() {
    return (
        <div id='about'>
            <Container>
                <Hero />
                <Menu />
                <Team />
            </Container>
        </div>
    )
};

export default About;