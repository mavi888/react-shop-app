import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { STORE_SERVER } from '../../Config';

function HistoryPage() {

    const [History, setHistory] = useState([])

    useEffect(()=> {
        Axios.get(`${STORE_SERVER}/getHistory`)
            .then(res => {
                if (res.data.success) {
                    const history = res.data.history
                    setHistory(history)
                    console.log(History)
                } else {
                    alert('Failed to get History')
                }
            })
    }, [])

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Purchase History</h1>
            </div>
            <br />

            <table>
                <thead>
                    <tr>
                        <th>Payment Id</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date of Purchase</th>
                    </tr>
                </thead>

                <tbody>
                    {History.map(item => (
                        <tr key={item[0].id}>
                            <td>{item[0].paymentId}</td>
                            <td>{item[0].price}</td>
                            <td>{item[0].quantity}</td>
                            <td>{item[0].dateOfPurchase}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage
