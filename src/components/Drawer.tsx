import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import Textbox from './Textbox';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#212120"
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: "#262624",
      padding: theme.spacing(3),
    },
  }),
);

const PermanentDrawerLeft : React.FC<any> = (files) => {
  const [items, setItems]  = useState([""]);
  const classes = useStyles();
  const  [folderClick, setFolderClick] = useState(false);
  const [fileClick, setFileCLick] = useState(false);
  var mediator : any = [];
  const [nameOfFile, setNameOfFile] = useState("");

  useEffect(()=>{
    if(files.files.length > 0) {
        for (let i = 0; i < files.files.length; i++){
            mediator.push(files.files[i])
        }
        setItems([...mediator]);
    }
    if(!folderClick)setItems([""])
  },[folderClick])

  const handleFolderClick = () => {
    setFolderClick(!folderClick);
  }

  const handleFileClick = (e : any) => {
    console.log(e.target.innerHTML)
    setNameOfFile(e.target.innerHTML)
    setFileCLick(!fileClick);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{background: "#2e2e2c"}}>
          <Typography variant="h6" noWrap>
            File Editor
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        style={{backgroundColor: "#212120 !important"}} 
      >
        <div className={classes.toolbar} />
        <Divider />
        <List onClick={handleFolderClick}>
            <ListItem button key="Files">
              <ListItemIcon style={{color: "white"}}><FolderIcon /></ListItemIcon>
              <ListItemText primary="Files" style={{color: "white"}} />
            </ListItem>
        </List>
        <Divider/>
            <ul>
                {items.map((fileName)=>{
                    return(
                        <List>
                        <ListItem button key={fileName}  >
                          <ListItemIcon style={{color: "white"}}>{folderClick  ?  <DescriptionIcon/> : ""}</ListItemIcon>
                          <ListItemText primary={fileName} style={{color: "white"}} onClick={handleFileClick} />
                        </ListItem>
                    </List>
                    )
                })}
            </ul>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography style={{color: "white"}} paragraph>
            Welcome to the File Editor! Click on the Files folder to view your files.
            Click on the files to edit that file. 
            This will open and close the editor for that file.
            When clicking the actual files, please click the text and not the icon.
            You can view the file changes locally.
            {fileClick ? <Textbox fileName={nameOfFile}/> : ""}
                
        </Typography>
      </main>
    </div>
  );
}

export default PermanentDrawerLeft
