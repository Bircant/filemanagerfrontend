import React, { useEffect, useState } from 'react';
import { Container ,Paper} from '@material-ui/core';

export default function Display() {
    const[files,setFiles]=useState([])
    useEffect(()=>{
        fetch("http://localhost:8080/file/getAll")
        .then(res=>res.json())
        .then((result)=>{
          setFiles(result);
        }
      )
      },[])
      return (
        <Container>
        <h1>Files</h1>
        <Paper elevation={3}>
        {files.map(file=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={file.id}>
                Id:{file.id}<br/>
                Name:{file.name}<br/>
                Data:{file.data}

        </Paper>
      ))
        }
        </Paper>
        </Container>
      )
}

