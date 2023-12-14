
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./component/Navbar";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import TradesPage from "./page/TradesPage";
import DetalsPage from "./page/DetalsPage";
import SuppliersPage from "./page/SuppliersPage";
function App() {
  return (
      <Router>
        <div className={"bg-dark"}>
          <Navbar/>
          <div className="container-fluid bg-dark mt-4">
            <Routes>
              <Route path="/" element={<TradesPage/>}/>
              <Route path="/detals" element={<DetalsPage/>}/>
              <Route path="/suppliers" element={<SuppliersPage/>}/>
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
