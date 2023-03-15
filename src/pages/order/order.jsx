import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Banner from "../../components/banner";
import Heading from "../../components/heading";
import productData from "../../data/products";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table";
import './_order.scss';

function Order() {
    const { data } = useSelector(state => state);
    const { id } = useParams();
    const [list, setList] = useState([]);
    const [active, setActive] = useState();
    const [quantity, setQuantity] = useState(1);
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

    function handleChange(e) {
        setValue(e.target.value)
    };

    function handleBack(index) {
        let maping = list.map((item, i) => i === index ? { ...item, back: true } : item)
        setList(maping);
    };

    function handleAdd() {
        let lengthArr = list.filter(item => item.name === value);
        let filteredItem = productData.find(item => item.name === value);
        let total = filteredItem.price * quantity;
        let time = new Date();
        time = time.getHours() + ":" + time.getMinutes();
        if (lengthArr.length > 0) {
            let copyFilter = [...list];
            let mapArr = copyFilter.map(item => item.name === value ? {
                ...item,
                total: item.total + total,
                time: time,
                quantity: item.quantity + +quantity
            } : item)
            setList(mapArr);
        }
        else if (lengthArr.length === 0) {
            let info = {
                name: filteredItem.name,
                img: filteredItem.img,
                price: filteredItem.price,
                quantity: +quantity,
                total: total,
                time: time,
                wait: "0 dəq",
                back: false
            }
            setList([...list, { ...info }]);

        }
        setTotal(prev => prev + total);
        setQuantity(1);
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
            type: "UPDATE",
            payload: obj
        });

        setSave(true);
    };

    function handleEnd() {

        let time = new Date();
        time = time.getDate() + "-" + time.getMonth() + "-" + time.getFullYear() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        let mapingList = list.map(item => item && { ...item, back: true })
        const obj = {
            id: id,
            table: table,
            waiter: waiter,
            situation: "sonlanıb",
            price: total,
            date: time,
            list: mapingList,
            cancel: false
        }
        dispatch({
            type: "UPDATE",
            payload: obj
        });
        setEnd(true);
        setSave(false);
    };

    function handleCancel() {
        dispatch({
            type: "CANCEL",
            payload: {
                id: id,
                obj: {
                    ...active,
                    cancel: true,
                    time: "-",
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


                    <div className="list-wr w-100">

                        <label htmlFor="">

                            <select name="" id="" onChange={handleChange}>
                                {productData.map(({ name, price }, i) => (
                                    <option value={name} key={i}>{name}: {price} AZN</option>
                                ))}
                            </select>

                        </label>
                        <label htmlFor="" >
                            <input type="number" name="" id="" className={"w-100"} min={1} value={quantity} onChange={e => setQuantity(e.target.value)} />

                        </label>
                        <Button variant={'success'} onClick={handleAdd}>Əlavə et</Button>
                    </div>
                </div>}
                <Banner data={active} total={total} />

            </div>


            {
                !save && !end && <>
                    <br />
                    {/* <table className={"table my-5"}>
                        {list.length > 0 && (
                            <thead>
                                <tr>
                                    {theadData.map(elm => <th key={elm}>{elm}</th>)}
                                </tr>

                            </thead>
                        )}


                        <tbody>
                            {list.length > 0 && list.map(({ img, name, quantity, price, total, time, wait, back }, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td><Image src={img} width={50} height={50} className={'rounded'} /></td>
                                    <td>{name}</td>
                                    <td>{quantity}</td>
                                    <td>{price}</td>
                                    <td>{total}</td>
                                    <td>{time}</td>
                                    <td>{wait}</td>
                                    <td><Button variant={'success'} onClick={e => handleBack(i)} disabled={disabled}>{back ? "verildi" : "ver"}</Button></td>
                                    <td><Button variant={'danger'} onClick={e => handleDelete(i, total)} disabled={disabled}>Sil</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}

                    <div className={'d-flex justify-content-between align-items-center mb-5'}>
                        {list.length > 0 && situation === "sonlanmayıb" && <Link to={'/orders'} className={'btn btn-success'} onClick={handleSave}>Save</Link>}
                        {list.length > 0 && situation === "sonlanmayıb" && <Link to={'/orders'} className={'btn btn-primary'} onClick={handleEnd}>Sifarişi sonlandırın</Link>}
                        {situation === "sonlanmayıb" && !end && <Link to={"/orders"} className={'btn btn-danger'} onClick={handleCancel}>Sifarişi Ləğv et</Link>}
                    </div>
                </>
            }

            <Table list={list} handleBack={handleBack} handleDelete={handleDelete} disabled={disabled} save={save} end={end}/>

        </Container>
    </div>)
};

export default Order;