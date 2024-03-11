import { BrowserRouter, Route, Routes } from "react-router-dom"
import LogIn from "./components/LogIn/LogIn"
import Register from "./components/Register/Register"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import AdminPage from "./pages/AdminPage"
import FilterPage from "./pages/FilterPage"
import HomePage from "./pages/HomePage"
import ShoePage from "./pages/ShoePage"
import AboutPage from "./pages/info/AboutPage"
import TermsOfUsePage from "./pages/info/TermsOfUsePage"
import TermsPage from "./pages/info/TermsPage"

function App() {


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/:id" element={<ShoePage />} />
          <Route path="/filter/:filter" element={<FilterPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms_of_use" element={<TermsOfUsePage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes >
        <Footer />
      </BrowserRouter>
    </>

  )
}

export default App
