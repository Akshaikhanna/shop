import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { CgDarkMode } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Nav, Container, Navbar } from "react-bootstrap";
import cart from "../Assets/cart.jpg";
import "../Styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

function CartPage({ addToCart, order }) {
  const [cartItems, setCartItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [orderItem, setOrderItem] = useState([]);
  const [totalprice, setTotalPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);
  const nav = useNavigate();

  // -------------------Dark mode -------------------------------------------------
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // -------------------get the products from the localstorage-------------------
  useEffect(() => {
    const savedcart = localStorage.getItem("cart");
    if (savedcart) {
      setCartItems(JSON.parse(savedcart));
    }
    console.log(savedcart);
  }, []);

  // ---------------remove the product from the cart------------------------------
  const removefromcart = (productToRemove) => {
    const updatedCart = cartItems.filter(
      (product) => product !== productToRemove
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ----------------------calculate the price and quantity----------------------------------
  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const totalQuantity = cartItems.reduce(
      (total, product) => total + product.quantity,
      0
    );
    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ----------------------Order the product using the id------------------------
  const handleOrder = (productId) => {
    const selectedProduct = cartItems.find(
      (product) => product.id === productId
    );
    if (selectedProduct) {
      setOrderItem([...orderItem, selectedProduct]);
      const UpdatedProduct = cartItems.filter(
        (product) => product.id !== productId
      );
      setCartItems(UpdatedProduct);
      localStorage.setItem("cart", JSON.stringify(UpdatedProduct));
      localStorage.setItem(
        "Order",
        JSON.stringify([...orderItem, selectedProduct])
      );
    }
  };

  const handleShopnow = () => {
    nav("/product");
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <>
        <Navbar bg="primary" data-bs-theme="dark" className="nav">
          <Container>
            <Navbar.Brand>ShopNow</Navbar.Brand>
            {/* <Form >
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </Col>
              </Row>
            </Form> */}
            <Nav className="me-5">
              {/* <Nav.Link>Products</Nav.Link> */}
              <Nav.Link href="/order">Your Orders</Nav.Link>
              <Nav.Link href="/product">Product</Nav.Link>
              <Nav.Link href="/">
                Logout <BiLogOut size={25} color="black" />
              </Nav.Link>
            </Nav>
            <CgDarkMode onClick={toggleDarkMode} size={40} />
          </Container>
        </Navbar>
      </>
      <div className="cartdetails">
        {/* <div className="image-details"> */}
        <Card
          sx={{
            maxWidth: 500,
            m: 2,
            height: "50vh",
            display: "flex",
            flexDirection: "column",
          }}
          className="card"
        >
          <CardContent>
            <Typography>
              <p>
                <b>Total item:</b>
                {totalquantity}
              </p>
              <p>
                <b>Total price:</b> ${totalprice.toFixed(2)}{" "}
              </p>
            </Typography>
          </CardContent>
        </Card>

        {cartItems && cartItems.length > 0 ? (
          cartItems.map((product, index) => (
            <Card key={index} sx={{ maxWidth: 500, m: 2 }}>
              <CardContent>
                <h5>{product.title}</h5>
                <img
                  src={product.image}
                  alt={product.title}
                  className="cartItemimage"
                />
                <Typography>
                  <h6>Quantity:{product.quantity}</h6>
                  <h5>Price:${product.price * product.quantity}</h5>
                </Typography>
                <CardActions className="btn-price-quantity">
                  <Button
                    onClick={() => handleOrder(product.id)}
                    sx={{ backgroundColor: "#3B71CA", color: "white" }}
                  >
                    Order
                  </Button>
                  <Button
                    onClick={() => removefromcart(product)}
                    sx={{ backgroundColor: "#fb641b", color: "white" }}
                  >
                    Remove
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card sx={{width:"300px"}} className="card">
            <CardContent>
              <Typography>
                <img src={cart} alt="img" className="cartimg" />
                <h3>Your Cart is empty</h3>
                <Button onClick={handleShopnow}>Shop Now</Button>
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default CartPage;
