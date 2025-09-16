// import React, { useEffect, useState, useRef } from 'react';
// import { API_URL } from '../data/apiPath';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const VendorOrders = () => {
//     const [orders, setOrders] = useState([]);
//     const [activeTab, setActiveTab] = useState('active'); // active or completed
//     const [page, setPage] = useState(1);
//     const itemsPerPage = 5;
//     const firmId = localStorage.getItem('firmId');
//     const previousOrdersRef = useRef([]);

//     const audioRef = useRef(null);

//     const playNotificationSound = () => {
//         if (audioRef.current) {
//             audioRef.current.play();
//         }
//     };

//     const fetchOrders = async () => {
//         try {
//             const res = await fetch(`${API_URL}/order/firmorder/${firmId}`);
//             const data = await res.json();
//             if (res.ok) {
//                 const allOrders = data.orders;

//                 const newOrderCount = allOrders.length - previousOrdersRef.current.length;
//                 if (newOrderCount > 0) {
//                     toast.success(`${newOrderCount} new order(s) received!`);
//                     playNotificationSound();
//                 }

//                 previousOrdersRef.current = allOrders;

//                 const filtered = allOrders.filter(order =>
//                     activeTab === 'active'
//                         ? ['Placed', 'Accepted', 'Out for Delivery'].includes(order.status)
//                         : order.status === 'Delivered'
//                 );

//                 setOrders(filtered);
//             } else {
//                 toast.error(data.message || "Failed to fetch orders");
//             }
//         } catch (err) {
//             toast.error("Error while fetching orders");
//             console.error(err);
//         }
//     };

//     const updateStatus = async (orderId, newStatus) => {
//         try {
//             const response = await fetch(`${API_URL}/order/status/${orderId}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ status: newStatus })
//             });

//             if (response.ok) {
//                 toast.success("Order status updated!");
//                 fetchOrders();
//             } else {
//                 toast.error("Failed to update status");
//             }
//         } catch (error) {
//             toast.error("Error while updating status");
//         }
//     };

//     const totalPages = Math.ceil(orders.length / itemsPerPage);
//     const paginatedOrders = orders.slice((page - 1) * itemsPerPage, page * itemsPerPage);

//     useEffect(() => {
//         fetchOrders();
//         const interval = setInterval(fetchOrders, 10000); // Auto-refresh every 10 seconds
//         return () => clearInterval(interval);
//     }, [activeTab]);

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'Placed': return 'blue';
//             case 'Accepted': return 'orange';
//             case 'Out for Delivery': return 'purple';
//             case 'Delivered': return 'green';
//             case 'Declined': return 'red';
//             default: return 'gray';
//         }
//     };

//     const getAnalytics = () => {
//         const totalOrders = orders.length;
//         const totalRevenue = orders.reduce((sum, order) =>
//             sum + order.items.reduce((sub, item) => sub + item.price * item.quantity, 0), 0
//         );
//         return { totalOrders, totalRevenue };
//     };

//     const { totalOrders, totalRevenue } = getAnalytics();

//     return (
//         <div className="vendorOrdersSection">
//             <audio ref={audioRef} src="/notification.mp3" preload="auto" />
//             <div className="tabs">
//                 <button onClick={() => setActiveTab('active')} className={activeTab === 'active' ? 'activeTab' : ''}>Active Orders</button>
//                 <button onClick={() => setActiveTab('completed')} className={activeTab === 'completed' ? 'activeTab' : ''}>Completed Orders</button>
//             </div>

//             <div className="analytics">
//                 <p><strong>📦 Orders:</strong> {totalOrders}</p>
//                 <p><strong>💰 Revenue:</strong> ₹{totalRevenue}</p>
//             </div>

//             {paginatedOrders.length === 0 ? (
//                 <p>No {activeTab} orders.</p>
//             ) : (
//                 paginatedOrders.map((order) => (
//                     <div className="orderCard" key={order._id}>
//                         <h4>Order ID: {order._id}</h4>
//                         <p><strong>Customer:</strong> {order.user.name}</p>
//                         <p><strong>Email:</strong> {order.user.email}</p>
//                         <p><strong>Mobile:</strong> {order.user.mobile}</p>

//                         <div>
//                             <strong>Items:</strong>
//                             <ul>
//                                 {order.items.map((item, idx) => (
//                                     <li key={idx}>
//                                         {item.productName} × {item.quantity} = ₹{item.price * item.quantity}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         <p><strong>Total:</strong> ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>

//                         <span className={`status-badge`} style={{ backgroundColor: getStatusColor(order.status) }}>
//                             {order.status}
//                         </span>

//                         {order.status === 'Placed' && (
//                             <>
//                                 <button onClick={() => updateStatus(order._id, 'Accepted')}>Accept</button>
//                                 <button onClick={() => updateStatus(order._id, 'Declined')}>Decline</button>
//                             </>
//                         )}

//                         {order.status === 'Accepted' && (
//                             <button onClick={() => updateStatus(order._id, 'Out for Delivery')}>Out For Delivery</button>
//                         )}

//                         {order.status === 'Out for Delivery' && (
//                             <button onClick={() => updateStatus(order._id, 'Delivered')}>Mark as Delivered</button>
//                         )}
//                     </div>
//                 ))
//             )}

//             {/* Pagination */}
//             <div className="pagination">
//                 <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>Prev</button>
//                 <span>Page {page} of {totalPages}</span>
//                 <button disabled={page === totalPages} onClick={() => setPage(prev => prev + 1)}>Next</button>
//             </div>
//         </div>
//     );
// };

import React, { useEffect, useState, useRef } from 'react';
import { API_URL } from '../data/apiPath';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VendorOrders = () => {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('active');
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const firmId = localStorage.getItem('firmId');
    const previousOrdersRef = useRef([]);
    const audioRef = useRef(null);

    const playNotificationSound = () => {
        if (audioRef.current) audioRef.current.play();
    };

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${API_URL}/order/firmorder/${firmId}`);
            const data = await res.json();
            if (res.ok) {
                const allOrders = data.orders;

                const newOrderCount = allOrders.length - previousOrdersRef.current.length;
                if (newOrderCount > 0) {
                    toast.success(`${newOrderCount} new order(s) received!`);
                    playNotificationSound();
                }

                previousOrdersRef.current = allOrders;

                const filtered = allOrders.filter(order =>
                    activeTab === 'active'
                        ? ['Placed', 'Accepted', 'Out for Delivery'].includes(order.status)
                        : order.status === 'Delivered'
                );

                setOrders(filtered);
            } else {
                toast.error(data.message || "Failed to fetch orders");
            }
        } catch (err) {
            toast.error("Error while fetching orders");
            console.error(err);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const res = await fetch(`${API_URL}/order/status/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Order status updated!");
                fetchOrders();
            } else {
                toast.error(data.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("Error while updating status");
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 10000);
        return () => clearInterval(interval);
    }, [activeTab]);

    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const paginatedOrders = orders.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Placed': return 'blue';
            case 'Accepted': return 'orange';
            case 'Out for Delivery': return 'purple';
            case 'Delivered': return 'green';
            case 'Declined': return 'red';
            default: return 'gray';
        }
    };

    const getAnalytics = () => {
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) =>
            sum + order.items.reduce((s, i) => s + i.price * i.quantity, 0), 0
        );
        return { totalOrders, totalRevenue };
    };

    const { totalOrders, totalRevenue } = getAnalytics();

    return (
        <div className="vendorOrdersWrapper">
            <audio ref={audioRef} src="/notification.mp3" preload="auto" />

            <div className="sidebar">
                <div className="tabs">
                    <button onClick={() => { setActiveTab('active'); setPage(1); }} className={activeTab === 'active' ? 'activeTab' : ''}>Active Orders</button>
                    <button onClick={() => { setActiveTab('completed'); setPage(1); }} className={activeTab === 'completed' ? 'activeTab' : ''}>Completed Orders</button>
                </div>

                <div className="analytics">
                    <p><strong>📦 Orders:</strong> {totalOrders}</p>
                    <p><strong>💰 Revenue:</strong> ₹{totalRevenue}</p>
                </div>
            </div>

            <div className="ordersSection">
                <div className="ordersGrid">
                    {paginatedOrders.length === 0 ? (
                        <p>No {activeTab} orders.</p>
                    ) : (
                        paginatedOrders.map((order) => (
                            <div className="orderCard" key={order._id}>
                                <h4>Order ID: {order.customOrderId}</h4>
                                <p><strong>Customer:</strong> {order.user.name}</p>
                                <p><strong>Email:</strong> {order.user.email}</p>
                                <p><strong>Mobile:</strong> {order.user.mobile}</p>
                                <div>
                                    <strong>Items:</strong>
                                    <ul>
                                        {order.items.map((item, idx) => (
                                            <li key={idx}>
                                                {item.productName} × {item.quantity} = ₹{item.price * item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p><strong>Total:</strong> ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
                                <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                                    {order.status}
                                </span>
                   
                                {order.status === 'Placed' && (
                                    <>
                                        <button onClick={() => updateStatus(order._id, 'Accepted')}>Accept</button>
                                        <button onClick={() => updateStatus(order._id, 'Declined')}>Decline</button>
                                    </>
                                )}
                                {order.status === 'Accepted' && (
                                    <button onClick={() => updateStatus(order._id, 'Out for Delivery')}>Out for Delivery</button>
                                )}
                                {order.status === 'Out for Delivery' && (
                                    <button onClick={() => updateStatus(order._id, 'Delivered')}>Mark as Delivered</button>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="pagination">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
                    <span>Page {page} of {totalPages}</span>
                    <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default VendorOrders;
