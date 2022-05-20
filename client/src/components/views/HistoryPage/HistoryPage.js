import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { STORE_SERVER } from '../../Config';
import moment from "moment";
 
function HistoryPage() {

    const [History, setHistory] = useState([])

    useEffect(()=> {
        Axios.get(`${STORE_SERVER}/getHistory`)
            .then(res => {
                if (res.data.success) {
                    const history = res.data.history
                    setHistory(history)
                } else {
                    alert('Failed to get History')
                }
            })
    }, [])

    const formatTime = (time) => {
        var day = moment(time);
        if (time !== undefined) {
            const t = day.format("DD-MM-YYYY")
            return t
        }
    }

    const calculateTotal = (items) => {
        let total = 0;
        items.forEach(item => {
            total = total + item.price;
        });
        return total
    }

    const calculateQuantity = (items) => {
        let total = 0;
        items.forEach(item => {
            total = total + item.quantity;
        });
        return total
    }


    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Purchase History</h1>
            </div>
            <br />

            <table>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date of Purchase</th>
                    </tr>
                </thead>

                <tbody>
                    {History.map(item => (
                        <tr key={item[0].id}>
                            <td>{item[0].paymentId}</td>
                            <td>{calculateTotal(item)}</td>
                            <td>{calculateQuantity(item)}</td>
                            <td>{formatTime(item[0].dateOfPurchase)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage
