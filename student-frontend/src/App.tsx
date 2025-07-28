// src/App.tsx
import { BrowserRouter, Routes } from "react-router-dom";
import Layout from "@/layout/Layout";
// import Home from "@/pages/Home";
// import AddStudent from "@/pages/AddStudent";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddStudent />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;