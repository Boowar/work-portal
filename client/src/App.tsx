import React, {FC} from "react";
import AppRouter from "./components/AppRouter";
import "./App.css"
import Header from "./components/Header";

const App:FC = () => {
  return (
    <div className="container">
      <Header/>
      <AppRouter/>
    </div>
  )
}
export default App;