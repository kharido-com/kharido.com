import { useEffect, useState } from "react";

export default function SellerOrders() {

    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const response = await fetch(
                "http://localhost:8082/api/orders/my-orders",
                {
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (response.ok) {
                setOrders(data);
            } else {
                setMessage("Unable to load orders");
            }

        } catch (err) {

            console.log(err);
            setMessage("Server Error");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">Seller Orders</h2>

            {
                message &&
                <div className="alert alert-danger">
                    {message}
                </div>
            }

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        orders.length === 0 ?

                            <tr>

                                <td
                                    colSpan="9"
                                    className="text-center"
                                >
                                    No Orders Found
                                </td>

                            </tr>

                            :

                            orders.map(order => (

                                <tr key={order.orderItemId}>

                                    <td>{order.orderId}</td>

                                    <td>{order.customerName}</td>

                                    <td>{order.productName}</td>

                                    <td>{order.quantity}</td>

                                    <td>₹ {order.price}</td>

                                    <td>₹ {order.subtotal}</td>

                                    <td>

                                        <span className={
                                            order.paymentStatus === "PAID"
                                                ? "badge bg-success"
                                                : "badge bg-danger"
                                        }>

                                            {order.paymentStatus}

                                        </span>

                                    </td>

                                    <td>

                                        <span className={
                                            order.orderStatus === "PENDING"
                                                ? "badge bg-warning text-dark"
                                                : "badge bg-success"
                                        }>

                                            {order.orderStatus}

                                        </span>

                                    </td>

                                    <td>

                                        {new Date(order.orderDate).toLocaleDateString()}

                                    </td>

                                </tr>

                            ))
                    }

                </tbody>

            </table>

        </div>

    );

}