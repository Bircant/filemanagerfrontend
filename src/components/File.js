import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function File() {
  const classes = useStyles();
  const paperStyle  = {padding:'50px 20px', width:600, margin: '20px auto'}
  const[name, setName] = useState('')
  const[files, setFiles] = useState([])

  // adding file content
  const handleClick = (e)=>{
    e.preventDefault()
    const file = {name}
    fetch("http://localhost:8080/file/add", {
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(file)
    }).then(()=>{
      console.log("New student added")
    })
    
  }
  // getting the file content
  useEffect(()=>{
    fetch("http://localhost:8080/file/getAll")
    .then(res=>res.json())
    .then((result)=>{
      setFiles(result);
    }
  )
  },  [])


  return (
    <Container>
    
    <Paper elevation= {3}   style={paperStyle}>
    <h1 style ={{color:"blue"}}> <u>Add File</u></h1>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="filled-basic" label="File Name" variant="filled" fullWidth
      value= {name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth />
      <Button variant="contained" color="secondary"  onClick={handleClick}>
        Add File
      </Button>
    </form>
    </Paper>
    <Paper>
    <Paper elevation= {3} style={paperStyle}>
      {files.map(file=>(
        <Paper elevation={3} style = {{margin:"20px auto", padding:"15px",  textAlign:"left"}} key={file.id}>
         Id:{file.id}<br/>
         Name:{file.name}<br/>
          </Paper>
       ))}
    </Paper>
    </Paper>

    

    </Container>
  );
}
