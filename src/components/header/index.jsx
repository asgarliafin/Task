import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from 'assets/images/logo/logo.png'
import './_header.scss';

function Header() {
    return (
        <div id={'header'}>
            <Container>
                <div className="navbar">
                    <Link to={"/"} className="logo"><Image src={Logo} width={150} /></Link>
                    <ul className='list d-flex align-items-center'>
                        <li> <Link to={'/orders'} className={'orders'}>Orders</Link></li>
                        <li><Link className={'btn-order'} style={{ marginLeft: "20px" }} to={'/create'}>Create Order</Link></li>
                    </ul>
                </div>
            </Container>
        </div>
    )
};

export default Header;