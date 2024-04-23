import "./App.css";
import {AddExpense} from "./Pages/AddExpense"
import { UpdateExpense } from "./Pages/UpdateExpense";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
     
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AddExpense/>} />
            <Route path="update/:index" element={<UpdateExpense />} />
          </Routes>
        </BrowserRouter>
     
    </div>
  );
}

export default App;
