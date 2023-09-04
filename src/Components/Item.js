import React from "react";
import { Button } from "@mui/material";

function Item({ product, items }) {
  return <Button onClick={() => items(product)} style={{backgroundColor:"#2874f0", color:"white"}}>Add to Cart</Button>;
}

export default Item;
