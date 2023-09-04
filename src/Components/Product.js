import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import Zoom from "react-medium-image-zoom";
import { ToastContainer, toast } from "react-toastify";
import "react-medium-image-zoom/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Nav, Container, Navbar, Form, Row, Col } from "react-bootstrap";
import Item from "./Item";
import { CgDarkMode } from "react-icons/cg";
import { BsCart2 } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

function Product() {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  //  -----------------------fetch the data from the API------------------------
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      // https://fakestoreapi.com/products
      .then((response) => response.json()) //assumed to json format
      .then((data) => {
        const proudctWithQuantity = data.map((product) => ({
          ...product,
          quantity: 1,
        }));
        // setProducts(data);
        setProducts(proudctWithQuantity);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
        setLoading(false);
      });
  });

  // -------------------get the data form localstorage-----------------------
  useEffect(() => {
    const savedcart = localStorage.getItem("cart");
    if (savedcart) {
      setCartItem(JSON.parse(savedcart)); //update the value 
    }
    console.log(savedcart);
  }, []);
  // --------------------Dark mode-------------------------------------------
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // ------------------filter the product-----------------------------------------------
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // -----------------Add to cart function store the data to localstorage and alert message using toastify---------------
  const addToCart = (product) => {
    const updatedCart = [...cartItem, product];
    setCartItem([...cartItem, product]);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success("Successfully Added", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      theme: "dark",
    });
  };

  // -----------------Order a product store data in localstorage and Alert message using toastify.-------------------------
  const OrderProduct = (product) => {
    const updatedCart = [...orderItem, product];
    setOrderItem([...orderItem, product]);
    localStorage.setItem("Order", JSON.stringify(updatedCart));

    toast.success("Ordered Successfully ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      theme: "dark",
    });
  };

  // -------------------increase the quantity of the product-------------------------------
  const increaseQuantity = (productId) => {
    // set a new argument
    const updatedProducts = products.map(
      (
        product 
      ) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 } 
          : product
    );
    setProducts(updatedProducts);
  };

  // -----------------decrease the quantity of the product---------------------------------
  const decreaseQuantity = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setProducts(updatedProducts);
  };

  return (
    <div>
      <ToastContainer />
      <div className={`app ${darkMode ? "dark" : "light"}`}>
        <>
          <Navbar bg="primary" data-bs-theme="dark" className="nav">
            <Container>
              <Navbar.Brand>ShopNow</Navbar.Brand>
              <Form inline>
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
              </Form>
              <Nav className="me-5">
                <Nav.Link href="/order">Your Orders</Nav.Link>
                <Nav.Link href="/cart">
                  <BsCart2 size={30} color="black" />
                </Nav.Link>
                <Nav.Link href="/">
                  Logout
                  <BiLogOut size={25} color="black" />
                </Nav.Link>
              </Nav>
              <CgDarkMode onClick={toggleDarkMode} size={30} />
            </Container>
          </Navbar>
        </>
        <div className="image-detail">
          {loading ? (
            <CircularProgress className="CirularProgress" />
          ) : (
            <Grid container spacing={2}>
              <ul>
                {filteredProducts?.map((product) => (
                  <Grid item xs={12} sm={600} md={900} lg={1200}>
                    <Card
                      key={product.id}
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
                        <h6>{product.title}</h6>
                        <Zoom>
                          <img
                            className="image"
                            src={product.image}
                            alt={product.title}
                          />
                        </Zoom>
                        <Typography>
                          <h6>Price:${product.price}</h6>
                          <h5>
                            Total Price:${product.price * product.quantity}
                          </h5>
                        </Typography>
                        <CardActions>
                          <Button onClick={() => increaseQuantity(product.id)}>
                            +
                          </Button>
                          <h5 className="proudct-quantity">
                            {product.quantity}
                          </h5>
                          <Button onClick={() => decreaseQuantity(product.id)}>
                            -
                          </Button>
                        </CardActions>
                        <CardActions>
                          <Item product={product} items={addToCart} />
                          <Button
                            className="Orderbutton"
                            onClick={() => OrderProduct(product)}
                          >
                            Order
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </ul>
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
