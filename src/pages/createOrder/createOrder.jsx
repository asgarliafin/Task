import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import products from '../../data/products';
import { Link } from 'react-router-dom';
import nextId from "react-id-generator";
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../components/heading';
import Table from '../../components/table';
import Create from '../../components/create';
import actionTypes from '../../redux/actions/actionTypes';
import './_createOrder.scss';


function CreateOrder() {
    const { tables, waiters } = useSelector(state => state);
    const [value, setValue] = useState(products[0].name);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [waiter, setWaiter] = useState(waiters[0].name);
    const [table, setTable] = useState(tables[0]);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    function handleDelete(index, par) {
        let filteredList = list.filter((item, i) => i !== index);
        setList(filteredList);
        setTotal(total - par);
    };

    function handleCreate() {
        let id = nextId();
        const obj = {
            id: id,
            table: table,
            waiter: waiter,
            situation: "sonlanmayıb",
            price: total,
            date: "-",
            list: list,
            cancel: false
        }
        dispatch({
            type: actionTypes.CREATE,
            payload: obj
        })
    };

    function handleBack(index) {
        let maping = list.map((item, i) => i === index ? { ...item, back: true } : item)
        setList(maping);
    };

    return (
        <div id={'create-order'}>
            <Container>
                <Heading text={"Create Order"} />
                <Create propsObj={{ list, setList, value, setValue, setTable, setOpen, setTotal, setWaiter }} page={"createOrder"} />
                <Table open={open} list={list} handleBack={handleBack} handleDelete={handleDelete} />
                {list.length > 0 && <div className={'d-flex justify-content-between align-items-center mb-5'}>
                    <h1>Cəmi qiymət : {total}</h1>
                    <Link className={'btn btn-primary'} to={"/orders"} onClick={handleCreate}>Sifarişi başlat</Link>
                </div>}
            </Container>
        </div>
    )
};

export default CreateOrder;