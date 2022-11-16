import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Box, Container } from "@material-ui/core";

const Details = () => {
  const [logindata, setLoginData] = useState([]);

  const history = useNavigate();

  const [show, setShow] = useState(false);

  var todayDate = new Date().toISOString().slice(0, 10);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Birthday = () => {
    const getuser = localStorage.getItem("user_login");
    if (getuser && getuser.length) {
      const user = JSON.parse(getuser);

      setLoginData(user);

      const userbirth = logindata.map((el, k) => {
        return el.date === todayDate;
      });

      if (userbirth) {
        setTimeout(() => {
          console.log("ok");
          handleShow();
        }, 3000);
      }
    }
  };

  const userlogout = () => {
    localStorage.removeItem("user_login");
    history("/login");
  };

  useEffect(() => {
    Birthday();
  }, []);

  return (
    <>
      {" "}
      <Container>
        {logindata.length === 0 ? (
          "errror"
        ) : (
          <>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                style={{ fontWeight: "700", textTransform: "capitalize" }}
              >
                Walcome {logindata[0].name} in BidOnHomes
              </Typography>
              <Button onClick={userlogout}>LogOut</Button>
            </Box>
            <Box
              style={{
                display: "flex",
                padding: "100px 0px ",
                justifyContent: "center",
              }}
            >
            <Link to="/add-data" style={{textDecoration:"none"}}>
              <Box
                style={{
                  background: "skyblue",
                  width: "400px",
                  height: "200px",
                  fontSize: "30px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "3px dashed blue",
                  cursor: "pointer",
                }}
              >
                Add Product
              </Box>
              </Link>
            </Box>
           

            {logindata[0].date === todayDate ? (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{logindata[0].name} 😄</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Wish you many many happy returns of the day ! 🍰
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            ) : (
              ""
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Details;
