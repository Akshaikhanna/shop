import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import order from "../Assets/order.png";
import "../Styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Ordered() {
  const [orderItem, setOrderItem] = useState([]);
  const nav = useNavigate()

  useEffect(() => {
    const savedcart = localStorage.getItem("Order");
    if (savedcart) {
      setOrderItem(JSON.parse(savedcart));
    }
    console.log(savedcart);
  },[orderItem]); //it render once

  const handleOrder = () =>{
    nav("/product")
  }

  return (
    <div className="orderpage">
      {/* <h4>Your Orders</h4> */}
      <Grid container spacing={2}>
        <ul>
          {orderItem && orderItem.length > 0 ? (
            orderItem?.map((item, index) => (
              <Grid item xs={12} sm={600} md={900} lg={1200}>
                <Card
                  sx={{
                    maxWidth: 500,
                    m: 2,
                    height: "200vh",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className="image-ordered"
                >
                  <li key={index}>
                    <h6>{item.title}</h6>
                    <br />
                    <img src={item.image} className="Ordered-image" alt="img" />
                    <br />
                    <h6>Quantites:{item.quantity}</h6>
                    <br />
                    <h5>Price:${item.price * item.quantity}</h5>
                  </li>
                </Card>
              </Grid>
            ))
          ) : (
            <Card sx={{width:"300px"}} className="ordercard">
              <CardContent>
                <Typography>
                  <img src={order} alt="img" className="orderimg" />
                  <br/>
              <h3 className="yourorder">Your have no Orders</h3>
              <Button onClick={handleOrder}>Start Shopping</Button>
                </Typography>
              </CardContent>
            </Card>
          )}
        </ul>
      </Grid>
    </div>
  );
}

export default Ordered;

// const [cartItems, setCartItems] = useState();

// useEffect(() => {
//   const savedcart = localStorage.getItem("Order");
//   if (savedcart) {
//     setCartItems(JSON.parse(savedcart));
//   }
//   console.log(savedcart);
// }, [cartItems]);
