import React, { useState } from "react";
import Map from "./component/Map";
import Search from "./component/Search";
import "./App.css";


function App() {
  const [location, setLocation] = useState(null);
  console.log(setLocation);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div style={{ width: "50vw"}}>
          <Map location={location} />
        </div>
        <div style={{ width: "50vw", backgroundColor: '#F1F1F1'}}>
          <Search location={location} setLocation={setLocation} />
        </div>
      </div>
    </>
  );
}

export default App;
