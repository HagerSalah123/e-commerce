import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingPage from '../LoadingPage/LoadingPage';
import { Helmet } from 'react-helmet';

function AllOrders() {
const [allOrders, setAllOrders]=useState(null);
// const [order, setOrder]=useState(null);
    const userID = localStorage.getItem('userID')
    console.log(userID)
async function geUserOrders(){
    const res= await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
.then((res)=>{
setAllOrders(res.data);
// setOrder(res.data.cartItems);

})
.catch((err)=>{
console.log("err",err);
})


}

useEffect(()=>{
    geUserOrders(); 
},[])


return <>
<Helmet >
<title>All Orders</title>

</Helmet>

      <div className='container'>
        {allOrders ? (
          <div className='row g-2'>
            {allOrders.map((order, idx) => (
              <div key={idx} className='col-md-6 border-1 p-3 text-center '>
                <div className='order h-100  '>
                    <div className='container'>
            
                    </div>
                  <h5 className='fw-bold'>Payment Method: {order.paymentMethodType}</h5>
                  <h5 className='text-main pt-3'>Order Price: {order.totalOrderPrice}</h5>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <LoadingPage />
        )}
      </div>
    </>






}

export default AllOrders