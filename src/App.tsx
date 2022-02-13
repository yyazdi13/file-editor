import React, { useState } from 'react';
import './App.css';
import { useQuery, gql } from "@apollo/client";
import Drawer from './components/Drawer';

//just as a fyi: I didn't have any graphQL experience before this so a good chunk of time
//was spent learning the syntax for graphQL

//I also needed to add lines 17-21 in the webpack.config and npm install source-map-loader 
// in order to add and use apollo-client for the queries

const LS_QUERY = gql`
  {
    ls(directory: "../files"){
      name
      href
      isFolder
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(LS_QUERY);
  var fileStructure : string[] = [];
  const [currentFiles, setCurrentFiles] = useState(fileStructure)

  React.useEffect(() : JSX.Element | string | any =>{
    if (data) {
      for(let i = 0; i < data.ls.length; i++){
        currentFiles.push(data.ls[i].name)
      }
      console.log(fileStructure)
    }
    if (error) console.log(error)
  },[data, loading]);

  return (
    <div className="App">
      <Drawer files={currentFiles}/>
    </div>
  );
}

export default App;
