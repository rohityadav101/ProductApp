import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
      padding:"10px 0px 0px"
    },
    "& .MuiOutlinedInput-input": {
      padding: "10.5px 14px",
    },
  },
}));

const Home = () => {
  const history = useNavigate();
  const classes = useStyles();
  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    date: "",
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

    const { name, email, date, password } = inpval;

    if (name === "") {
      toast.error(" name field is requred!", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("email field is requred", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.error("plz enter valid email addres", {
        position: "top-center",
      });
    } else if (date === "") {
      toast.error("date field is requred", {
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
      console.log("data added succesfully");
      history("/login");
      localStorage.setItem("useryoutube", JSON.stringify([...data, inpval]));
    }
  };

  return (
    <>
    <Container maxWidth="sm"> 
      <Paper
        elevation={2}
        align="center"
        style={{ marginTop: "50px", padding: "20px 60px" }}
      >
        <Box className={classes.MainBox}>
          <Typography variant="h5">Sign IN</Typography>
          <Box>
            <Typography variant="h6">Name</Typography>
          </Box>
            <Box>
          <TextField
            variant="outlined"
            type="text"
            fullWidth
            name="name"
            onChange={getdata}
            placeholder="Enter Your Name"
          />
          </Box>
          <Box>
          <Box>
          <Typography variant="h6">Email</Typography>
        </Box>
          <TextField
            variant="outlined"
            type="email"
            name="email"
            onChange={getdata}
            placeholder="Enter email"
            fullWidth
          />
          </Box>
          <Box>
          <Typography variant="h6">D.O.B</Typography>
        </Box>
          <TextField
            variant="outlined"
            onChange={getdata}
            name="date"
            type="date"
            fullWidth
          />
            <Box>
            <Box>
            <Typography variant="h6">Password</Typography>
          </Box>
          <TextField
            variant="outlined"
            type="password"
            name="password"
            fullWidth
            onChange={getdata}
            placeholder="Password"
          />
          </Box>
          <Box pt={2}>
          <Button
            variant="primary"
            onClick={addData}
            style={{ background: "#3f51b5" , color:"#fff" }}
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          </Box>
          <p className="mt-3">
            Already Have an Account{" "}
            <span>
              <NavLink to="/login">Login</NavLink>
            </span>
          </p>
        </Box>
      </Paper>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Home;
