import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Heading from '../heading';
import productData from '../../data/productData';
import './menu.scss';

function Menu() {
    return (
        <div id={'menu'}>
                <Heading text={"Menu"} />
                <Row className={"menu-row"}>
                    {productData.map((item, i) => (
                        <Col lg={6} key={i}>
                            <div className="product-card card d-flex flex-row">
                                <div className="card-heading">
                                    <div className="card-img">
                                        <Image src={item.img} className={"img"} width={100} />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h4 className={'card-name'}>{item.name}</h4>
                                        <h5 className={'card-price'}>$ {item.price}</h5>
                                    </div>
                                    <p className={'card-text'}>{item.dsc}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
        </div>
    );
};

export default Menu;