import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import Img from 'assets/images/hero/hero.svg';
import AvatartImg from 'assets/images/hero/avatar.svg';
import { FiMapPin } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import './_hero.scss';

const Hero = () => {
    const {data} = useSelector(state => state);
    let total =  data.map(item => item.situation === "sonlanıb"? item.price : 0).reduce((acc, cur)=> acc+cur, 0);
    const length = data.filter(item =>item.situation === "sonlanıb").length;

    return (
        <div id={'hero'}>
            <div className={'hero-container'}>
                <Row className={'justify-content-between'}>
                    <Col lg={6}>
                        <div className='left d-flex'>
                            <Image src={AvatartImg} />
                            <div className="contact">
                                <div className={'contact-left'}>
                                    <h5>Devon Lane</h5>
                                    <span className='d-flex align-items-center'><FiMapPin /> Lisbon, Portugal</span>
                                </div>
                                <div className={"contact-right d-flex flex-column"}>
                                    <span>Founder</span>
                                    <span>Hello@gmail.com</span>
                                    <span>Email</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={5} className={"d-flex justify-content-end"}>
                        <ul className='list d-flex align-items-center'>
                            <li className="list-item"><span className='count'>{total}</span>Qazanc</li>
                            <li className="list-item"><span className='count'>{length}</span>Müştəri</li>
                            <li className="list-item"><span className='count'>3.1k</span>Followers</li>
                        </ul>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Hero;