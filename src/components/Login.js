import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Box,
  Paper,
  Container,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  MainBox: {
    "& h5": {
      fontSize: "30px !important",
      padding: "0px 0px 30px",
      fontWeight:"bold",
      color:"#3f51b5"
    },
    "& h6": {
      fontSize: "18px !important",
      textAlign: "left",
    },
    "& .MuiOutlinedInput-input":{
        padding:"10.5px 14px",
    }
  },
}));

const Login = () => {
  const history = useNavigate();
  const classes = useStyles();
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);
  console.log(inpval);

  const getdata = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target;
    // console.log(value,name);

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();

    const getuserArr = localStorage.getItem("useryoutube");
    console.log(getuserArr);

    const { email, password } = inpval;
    if (email === "") {
      toast.error("email field is requred", {
        position: "top-center",
      });
    } else if (!email.includes("")) {
      toast.error("plz enter valid email addres", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password field is requred", {
        position: "top-center",
      });
    } else if (password.length < 5) {
      toast.error("password length greater five", {
        position: "top-center",
      });
    } else {
      if (getuserArr && getuserArr.length) {
        const userdata = JSON.parse(getuserArr);
        const userlogin = userdata.filter((el, k) => {
          return el.email === email && el.password === password;
        });

        if (userlogin.length === 0) {
          alert("invalid details");
        } else {
          console.log("user login succesfulyy");

          localStorage.setItem("user_login", JSON.stringify(userlogin));

          history("/details");
        }
      }
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper
          elevation={2}
          align="center"
          style={{ marginTop: "50px", padding: "60px" }}
        >
          <Box className={classes.MainBox}>
            <Typography variant="h5">LogIn</Typography>
            <Box>
              <Typography variant="h6">Email</Typography>
            </Box>
            <Box>
              <TextField
                type="email"
                name="email"
                onChange={getdata}
                variant="outlined"
                fullWidth
                placeholder="Enter email"
              />
            </Box>
            <Box pt={2}>
              <Typography variant="h6">Password</Typography>
            </Box>
            <Box>
              <TextField
                type="password"
                name="password"
                fullWidth
                onChange={getdata}
                variant="outlined"
                placeholder="Password"
              />
            </Box>
            <Box mt={3}>
            <Button
              onClick={addData}
              style={{ background: "#3f51b5", color:"#fff" }}
              type="submit"
              fullWidth
            >
              Submit
            </Button>
            </Box>
           <Box mt={2}>
           <Typography >create your Account <NavLink to="/">SignUp</NavLink></Typography>
           
           </Box>
          </Box>
        </Paper>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Login;
