import React from "react";
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
const App = (props) => {

  return (
    
    <div className="p-3" style={{ backgroundColor: '#FFFFFF'}}>
      <Navbar />
    </div>
  );
}

export default App;
