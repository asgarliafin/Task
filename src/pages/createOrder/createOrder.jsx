import React, { useState } from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import productData from '../../data/productData';
import { Link } from 'react-router-dom';
import nextId from "react-id-generator";
import { useDispatch, useSelector } from 'react-redux';
import './_createOrder.scss';
import Heading from '../../components/heading';


function CreateOrder() {
    const { tables, waiters } = useSelector(state => state);
    const [quantity, setQuantity] = useState(1);
    const [value, setValue] = useState(productData[0].name);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [waiter, setWaiter] = useState(waiters[0].name);
    const [table, setTable] = useState(tables[0]);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    function handleChange(e) {
        setValue(e.target.value)
    };

    function handleAdd() {
        setOpen(true)
        let lengthArr = list.filter(item => item.name == value);
        let filteredItem = productData.filter(item => item.name == value)[0];
        let total = filteredItem.price * quantity;
        let time = new Date();
        time = time.getHours() + ":" + time.getMinutes();
        if (lengthArr.length > 0) {
            let copyFilter = [...list];
            let mapArr = copyFilter.map(item => item.name == value ? {
                ...item,
                total: item.total + total,
                time: time,
                quantity: item.quantity + +quantity
            } : item)
            setList(mapArr);
        }
        else if (lengthArr.length == 0) {
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

    function handleDelete(index, par) {
        let filteredList = list.filter((item, i) => i !== index);
        setList(filteredList);
        setTotal(total - par);
    };

    function handleCreate() {
        let id = nextId();
        const obj = {
            id: id,
            masa: table,
            waiter: waiter,
            situation: "sonlanmayıb",
            price: total,
            date: "-",
            list: list,
            cancel: false
        }
        dispatch({
            type: "CREATE",
            payload: obj
        })
    };

    function handleBack(index) {
        let maping = list.map((item, i) => i == index ? { ...item, back: true } : item)
        setList(maping);
    }



    return (
        <div id={'create-order'}>
            <Container>
                <Heading text={"Create Order"} />
                <div className="mt-5 list-wr">
                    <label htmlFor="">
                        <h4>Waiter: </h4>
                        <select name="" id="" onChange={e => setWaiter(e.target.value)}>
                            {waiters.map((item, i) => (
                                <option value={item.name} key={i}>{item.name}</option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="">
                        <h4>
                            Table:
                        </h4>
                        <select name="" id="" onChange={e => setTable(e.target.value)}>
                            {tables.map((item, i) => (
                                <option value={item} key={i}>{item.toLocaleUpperCase()} </option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="">

                        <h4>Məhsul: </h4>   <select name="" id="" onChange={handleChange}>
                            {productData.map(({ name, price }, i) => (
                                <option value={name} key={i}>{name}: {price} AZN</option>
                            ))}
                        </select>

                    </label>
                    <label htmlFor="" >
                        <h4>Miqdar: </h4>
                        <input type="number" name="" id="" min={1} value={quantity} onChange={e => setQuantity(e.target.value)} />

                    </label>
                    <Button variant={'success'} onClick={handleAdd}>Əlavə et</Button>
                </div>


                {
                    open && <table className={"table my-4"}>
                        <thead>
                            <tr>
                                <th>Sıra</th>
                                <th>Görünüş</th>
                                <th>Məhsul adı</th>
                                <th>Miqdar</th>
                                <th>Qiymət</th>
                                <th>Məbləğ</th>
                                <th>Sifariş saatı</th>
                                <th>Gözləmə</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, i) => (<tr key={i}>
                                <td>{i + 1}</td>
                                <td><Image src={item.img} width={50} height={50} className={'rounded'} /></td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.total}</td>
                                <td>{item.time}</td>
                                <td>{item.wait}</td>
                                <td><Button variant={'success'} onClick={e => handleBack(i)}>{item.back ? "verildi" : "ver"}</Button></td>
                                <td><Button variant={"danger"} onClick={e => handleDelete(i, total)}>Sil</Button></td></tr>))}
                        </tbody>

                    </table>
                }

                {
                    list.length > 0 && <div className={'d-flex justify-content-between align-items-center mb-5'}>
                        <h1>Cəmi qiymət : {total}</h1>
                        <Link className={'btn btn-primary'} to={"/orders"} onClick={handleCreate}>Sifarişi başlat</Link>
                    </div>
                }



            </Container>
        </div>
    )
};

export default CreateOrder;