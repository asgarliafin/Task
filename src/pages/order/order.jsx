import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Banner from "../../components/banner";
import Heading from "../../components/heading";
import productData from "../../data/products";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table";
import Create from "../../components/create";
import timing from "../../timing";
import actionTypes from "../../redux/actions/actionTypes";
import './_order.scss';

function Order() {
    const { data } = useSelector(state => state);
    const { id } = useParams();
    const [list, setList] = useState([]);
    const [active, setActive] = useState();
    const [value, setValue] = useState(productData[0].name);
    const [total, setTotal] = useState(0);
    const [waiter, setWaiter] = useState();
    const [table, setTable] = useState();
    const [situation, setSituation] = useState();
    const [save, setSave] = useState(false);
    const [end, setEnd] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        let filtered = data.find(item => item.id === id);

        if (filtered !== undefined) {
            setList(filtered.list);
            setActive(filtered);
            setTotal(filtered.price);
            setWaiter(filtered.waiter);
            setTable(filtered.table);
            setSituation(filtered.situation);
            setSave(false);
            filtered.situation === "sonlanmayıb" && setDisabled(false)
        }
        else {
            navigate('/*')
        }
    }, [])

    function handleDelete(index, par) {
        let filteredList = list && list.filter((item, i) => i !== index);
        setList(filteredList);
        setTotal(total - par);
        list.length <= 1 && setTotal(0);
    };


    function handleBack(index) {
        let maping = list.map((item, i) => i === index ? { ...item, back: true } : item)
        setList(maping);
    };

    function handleSave() {
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
            type: actionTypes.UPDATE,
            payload: obj
        });

        setSave(true);
    };

    function handleEnd() {
        let mapingList = list.map(item => item && { ...item, back: true })
        const obj = {
            id: id,
            table: table,
            waiter: waiter,
            situation: "sonlanıb",
            price: total,
            date: timing(),
            list: mapingList,
            cancel: false
        }
        dispatch({
            type: actionTypes.UPDATE,
            payload: obj
        });
        setEnd(true);
        setSave(false);
    };

    function handleCancel() {
        dispatch({
            type: actionTypes.CANCEL,
            payload: {
                id: id,
                obj: {
                    ...active,
                    cancel: true,
                    date: timing(),
                    situation: "ləğv edilmiş"
                }
            }
        })
    };



    return (<div id={'order'}>
        <Container>
            <Heading text={"Order Page"} />
            <div className="order-block mt-5">

                {!save && !end && situation === "sonlanmayıb" && <div className="d-flex">
                    <Create propsObj={{ list, setList, value, setValue, setTable, setTotal, setWaiter }} page={"order"} />
                </div>}
                <Banner data={active} total={total} />

            </div>


            {!save && !end && <>
                <br />
                <div className={'d-flex justify-content-between align-items-center mb-5'}>
                    {list.length > 0 && situation === "sonlanmayıb" && <Link to={'/orders'} className={'btn btn-success'} onClick={handleSave}>Yadda saxla</Link>}
                    {list.length > 0 && situation === "sonlanmayıb" && <Link to={'/orders'} className={'btn btn-primary'} onClick={handleEnd}>Sifarişi sonlandırın</Link>}
                    {situation === "sonlanmayıb" && !end && <Link to={"/orders"} className={'btn btn-danger'} onClick={handleCancel}>Sifarişi Ləğv et</Link>}
                </div>
            </>}

            <Table list={list} handleBack={handleBack} handleDelete={handleDelete} disabled={disabled} save={save} end={end} />

        </Container>
    </div>)
};

export default Order;