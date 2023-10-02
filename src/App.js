import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./Redux/store";
import { AddExpense } from "./Pages/AddExpense";
import { UpdateExpense } from "./Pages/UpdateExpense";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AddExpense />} />
            <Route path="update/:index" element={<UpdateExpense />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
