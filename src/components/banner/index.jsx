import React from 'react'
import './_banner.scss'

const Banner = ({ data, total }) => {
    return (
        <div id={'banner'}>
            <ul>
                <li>Masa <span> {data && data.table}</span></li>
                <li>Ofisiant<span>{data && data.waiter}</span></li>
                <li>Status <span>{data && data.situation}</span></li>
                <li>Məbləğ <span>{total} AZN</span>
                </li>
            </ul>
        </div>
    )
}

export default Banner