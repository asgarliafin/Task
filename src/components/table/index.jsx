import React from 'react';
import { Button, Image } from 'react-bootstrap';
import theadData from 'data/order/theadData.json';
import timing from "timing";
import './_table.scss';

function Table({ list, handleBack, handleDelete, disabled, save, end }) {

    return (
        <React.Fragment>
            {(save || end || list.length > 0) && <table id={'table'} className={'table my-5'}>
                <thead>
                    <tr>
                        {theadData.map(elm => <th key={elm}>{elm}</th>)}
                    </tr>

                </thead>
                <tbody>
                    {list.map(({ img, name, quantity, price, total, time, wait, back, waitingTime }, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td><Image src={img} width={50} height={50} className={'rounded'} /></td>
                            <td>{name}</td>
                            <td>{quantity}</td>
                            <td>{price}</td>
                            <td>{total}</td>
                            <td>{time}</td>
                            <td>{timing(waitingTime)}</td>
                            <td><Button variant={'success'} onClick={e => handleBack(i)} disabled={disabled ? disabled : false} >{back ? "verildi" : "ver"}</Button></td>
                            <td><Button variant={'danger'} onClick={e => handleDelete(i, total)} disabled={disabled ? disabled : false}>Sil</Button></td>
                        </tr>
                      ))}
                </tbody>
            </table>}
        </React.Fragment>
    )
}

export default Table;