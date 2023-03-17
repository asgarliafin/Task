import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import products from '../../data/products';
import './_create.scss';

function Create({ propsObj, page }) {
    const { list, setList, value, setValue, setTable, setOpen, setTotal, setWaiter } = propsObj;

    const { tables, waiters } = useSelector(state => state);
    const [quantity, setQuantity] = useState(1);

    function handleChange(e) {
        setValue(e.target.value)
    };

    function handleAdd() {
        setOpen && setOpen(true)
        let arr = list.filter(item => item.name === value);
        let filteredItem = products.find(item => item.name === value);
        let total = filteredItem.price * quantity;
        let time = new Date();
        time = time.getHours() + ":" + time.getMinutes();
        if (arr.length > 0) {
            let copyFilter = [...list];
            let mapArr = copyFilter.map(item => item.name === value ? {
                ...item,
                total: item.total + total,
                time: time,
                quantity: item.quantity + +quantity
            } : item)
            setList(mapArr);
        }
        else if (arr.length === 0) {
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


    return (
        <div className={`list-wr ${page == "order" ? "w-100" : "mt-5"}`} id={'create'}>
            {page == "createOrder" && <>
                <label htmlFor="waiters">
                    <h4>Ofisiant: </h4>
                    <select name="waiters" id="waiters" onChange={e => setWaiter(e.target.value)}>
                        {waiters.map((item, i) => (
                            <option value={item.name} key={i}>{item.name}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="tables">
                    <h4>Masa:</h4>
                    <select name="tables" id="tables" onChange={e => setTable(e.target.value)}>
                        {tables.map((item, i) => (
                            <option value={item} key={i}>{item.toLocaleUpperCase()} </option>
                        ))}
                    </select>
                </label>
            </>}
            <label htmlFor="products">
                <h4>Məhsul: </h4>   <select name="products" id="products" onChange={handleChange}>
                    {products.map(({ name, price }, i) => (
                        <option value={name} key={i}>{name}: {price} AZN</option>
                    ))}
                </select>
            </label>
            <label htmlFor="quantity" >
                <h4>Miqdar: </h4>
                <input type="number" name="quantity" id="quantity" min={1} className={`${page == "order" ? "w-100" : null}`} value={quantity} onChange={e => setQuantity(e.target.value)} />
            </label>
            <Button variant={'success'} onClick={handleAdd}>Əlavə et</Button>
        </div>
    )
}

export default Create;