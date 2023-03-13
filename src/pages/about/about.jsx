import React from 'react';
import { Container } from 'react-bootstrap';
import Hero from '../../components/hero';
import Menu from '../../components/menu';
import Team from '../../components/team';

function About(){
    return (
        <div id='about'>
            <Container>
                <Hero/>
                <Menu/>
                <Team/>
            </Container>
        </div>
    )
};

export default About;