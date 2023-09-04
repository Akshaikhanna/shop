import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import image2 from "../Assets/image3.png";
import image1 from "../Assets/image1.jpg";
import { Card, CardContent, Typography } from "@mui/material";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=4")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  // -------------------------------------------------imageclick----------------------------------------------

  return (
    <div>
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
                  />
                </Col>
              </Row>
            </Form>
            <Nav className="me-5">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login" className="bg-dark text-light">
                Login
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
      <div className="swiper-div">
        <>
          <Swiper
            pagination={true}
            modules={[Pagination]}
            slidesPerView={1}
            className="mySwiper"
          >
            <SwiperSlide>
              <img className="image-slider" src={image2} alt="img"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img className="image-slider" src={image1} alt="img"></img>
            </SwiperSlide>
          </Swiper>
        </>
      </div>
      <div className="image-details">
        <ul>
          {products.map((product) => (
            <Card key={product.id} sx={{ maxWidth: 700, height: "75vh", p: 1 }}>
              <CardContent>
                <Typography>
                  <h4 className="product-category">{product.category}</h4>
                </Typography>
                <Zoom>
                  <img
                    className="image"
                    alt={product.title}
                    src={product.image}
                  />
                </Zoom>
                <br />
                <div className="product-category">
                  <p>{product.description}</p>
                </div>
                <h5>Price:${product.price}</h5>
              </CardContent>
            </Card>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
