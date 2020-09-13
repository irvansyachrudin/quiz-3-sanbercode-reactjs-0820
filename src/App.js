import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <div>
      <section>
        <Router>
          <Header />
          <Routes />
        </Router>
      </section>
      <Footer />
    </div>
  );
}

export default App;