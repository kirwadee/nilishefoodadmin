import { useEffect, useState} from "react";
import "./widgetLg.css";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import axios from "axios";


export default function WidgetLg() {
  

  const [orders, setOrders] = useState([])

  console.log(orders)

  const { user } = useSelector(state => state.authslice)
 
  const config = {
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    }
  }

  useEffect(()=>{
    const getOrders = async() => {
       try {
        const res = await axios.get('https://nilishecafeadminpanel.herokuapp.com/orders', config)
       setOrders(res.data)
       } catch (error) {
        console.log(error.response.data)
       }
    }
      getOrders()

  },[])



  
 
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Order Transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.length > 0 ?  orders?.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{order?.customer?.userName}</span>
            </td>
            <td className="widgetLgDate">{format(order?.createdAt)}</td>
            <td className="widgetLgAmount">Ksh{order?.totalPrice}</td>
            <td className="widgetLgStatus">
             {order?.isDelivered ? 
              <button>Delivered</button> :
              <button style={{color:"red", }}>
                Not Delivered
              </button> }
            </td>
          </tr>
        )) : null}
      </table>
    </div>
  );
}
