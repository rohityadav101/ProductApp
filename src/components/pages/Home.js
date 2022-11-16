import { Typography, Box, makeStyles, Grid, TextField, Button, Container } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import List from "../student/List";
import axios from "axios";
import { useState } from "react";
const useStyles = makeStyles({
 headingColor: {
  
  color: "blue"
  
 },
 addStuColor: {
  backgroundColor: green[400],
  color: "white"
 },
})

const Home = () => {
 const classes = useStyles();
 const [student, setStudent] = useState({
  stuname: "",
  Description: "",
  Price: "",
  Quatity: "",
 });
 const [status, setStatus] = useState();

 function onTextFieldChange(e) {
  setStudent({
   ...student,
   [e.target.name]: e.target.value
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()
  try {
   await axios.post(`http://localhost:3333/students`, student)
   setStatus(true);
  } catch (error) {
   console.log("Something is Wrong");
  }
 }
 if (status) {
  return <List />
 }
 return (
  <>
  <Container>
   <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
    <Typography variant="h5" style={{fontSize:"50px", fontWeight:"700"}}>Add Product</Typography>
   </Box>
   <Grid container justify="center" spacing={4}>
    <Grid item md={6} xs={12}>
   
     <form noValidate>
      <Grid container spacing={2}>
       <Grid item xs={12}>
        <TextField autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname" label="Name" onChange={e => onTextFieldChange(e)}
        />
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="Description" name="Description" multiline rows={4} variant="outlined" required fullWidth id="email" label="Description" onChange={e => onTextFieldChange(e)} />
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="Price" type="number" name="Price" variant="outlined" required fullWidth id="Price" label="Price" onChange={e => onTextFieldChange(e)} />
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="Quatity" type="number" name="Quatity" variant="outlined" required fullWidth id="Quatity" label="Quatity" onChange={e => onTextFieldChange(e)} />
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="submit" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}>Add</Button>
      </Box>
     </form>
    </Grid>
{/*   <Grid item md={6} xs={12}>
     <List />
    </Grid> */}
  
   </Grid>
   </Container>
  </>
 )
}

export default Home
