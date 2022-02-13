import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { gql, useMutation } from "@apollo/client";
import { Typography } from '@material-ui/core';


const WRITE_MUTATION = gql`
  mutation write(
    $href: String!, 
    $contents: String!
    ) {
    write(
      href: $href,
      contents: $contents
      )
  }
  
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

const Textbox : React.FC<any> = (fileName) => {
    /*
    This is how I would read and display the file but webpack gives me a "need appropriate loader" error
   const getData =  async (e : any) => {
        const myMarkdownFile = require(`../../files/${fileName.fileName}`);

       fetch(myMarkdownFile)
      .then(response => response.text())
      .then(text => setFileContents({ text }))
    } 
    */

    //const [fileContents, setFileContents] = useState({});
    
    const [write, {error}] = useMutation(WRITE_MUTATION);
    const label = fileName.fileName;
    const [input, setInput]= useState({
        name: "",
        contents: "",
    })
    const classes = useStyles();
    const [saved, setSaved] = useState("");


    useEffect(() : JSX.Element | string | any =>{

        //If I had more time I would delay the state change instead of setTimeout, 
        //so as to not overload the backend with mutations
        //Perhaps setting another useState variable and changing that from false to true after a certain period of time.
        //And using that in the useEffect instead of input
        //Or by using a different react hook

        setTimeout(()=> {
            write({
                variables: {
                  href: `/api/../files/${input.name}`,
                  contents: input.contents
                }
              }).then((res)=> {setSaved("work was saved!")});
        }, 7000)
        
      },[input]);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement | any>)  {
        setInput({
            name: e.target.name,
            contents: e.target.value
        })
    }

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={e=> e.preventDefault()}
        style={{display: "flex", "justifyContent": "center", "marginTop": "10px", "flexDirection": "column", "alignItems" : "center"}}>
            <TextField id="outlined-basic" name={label} label={label} variant="outlined" onChange={handleFileChange} style={{backgroundColor: "white"}}/>
            <br/>
            <Typography>{saved}</Typography>
            {/* <button onClick={getData}>View File</button> */}
        </form>
    )
}

export default Textbox

