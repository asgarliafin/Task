import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {  useSelector } from 'react-redux';
import { BsFilter } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Heading from '../../components/heading';
import theadData from '../../data/orders/theadData';
import statusData from '../../data/orders/statusData.json';

function Orders() {

    const { data } = useSelector(state => state);
    const [arr, setArr] = useState(data);
    const [rotate, setRotate] = useState(true);


    useEffect(() => {
        let sorting = [...data].sort((a, b) => a.situation == "sonlanmayıb" ? -1 : b.situation == "sonlanıb" ? 1 : 0)
        setArr(sorting);
    }, [])

    function handleSelect(event) {
        if (event.target.value != "Hamsı") {
            let filteredArr = data.filter(item => item.situation == event.target.value);
            setArr(filteredArr);
        }
        else {
            setArr(data);
        }
    };

    function handleRotate() {
        setRotate(prev => !prev);
        const filtered = data.sort((a, b) => rotate ? a.price - b.price : b.price - a.price);
        setArr(filtered);
    };

    return (
        <div id={'orders'}>
            <Container>
                <Heading text={"Orders"} />
                <table className={"table my-5"}>
                    <thead>
                        <tr>
                            {theadData.map(({ name, id }) => (
                                <th key={id} onClick={id === "os5" ? handleRotate : null} className={id == "os5" && rotate ? "active" : null}>
                                    {name}
                                    {id === "os4" &&
                                        <select name="" id="" className={'auto'} onChange={handleSelect}>
                                            {statusData.map(value => <option value={value} key={value}>{value}</option>)}
                                        </select>}
                                    {id === "os5" && <BsFilter style={{ marginLeft: "5px" }} className={rotate ? "active" : null} />}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {arr.map(({ id, masa, waiter, situation, price, date }, i) => {
                            const obj = { masa, waiter, situation, price, date };
                            return <tr key={i} className={situation == "sonlanmayıb" ? "red" : null}>
                                <td>{i + 1}</td>
                                {Object.values(obj).map(elm => <td key={elm}>{elm}</td>)}
                                <td> <Link to={`/order/${id}`} className={'btn btn-primary'}>bax</Link></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </Container>
        </div>
    )
}

export default Orders