import PassValidator from "./components/PassValidator";
import Login from "./components/Login";
import AdminPage from "./components/AdminPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PassValidator />} />
        {isLogged ? (
          <Route path="/admin" element={<AdminPage isLogged={isLogged} />} />
        ) : (
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
        )}
        <Route path="*" element={<Login setIsLogged={setIsLogged} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
