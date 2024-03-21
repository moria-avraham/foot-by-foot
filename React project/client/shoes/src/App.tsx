import { BrowserRouter, Route, Routes } from "react-router-dom"
import LogIn from "./pages/LogIn/LogIn"
import Register from "./pages/Register/Register"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import AdminPage from "./pages/AdminPage/AdminPage"
import FilterPage from "./pages/FilterPage/FilterPage"
import HomePage from "./pages/HomePage/HomePage"
import ShoePage from "./pages/ShoePage/ShoePage"
import AboutPage from "./pages/info/AboutPage"
import TermsOfUsePage from "./pages/info/TermsOfUsePage"
import TermsPage from "./pages/info/TermsPage"
import WishList from "./pages/WishList/WishList"
import CartPage from "./pages/CartPage/CartPage"
import ErrorPage from "./pages/ErrorPage/ErrorPage"

function App() {


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/wish_list" element={<WishList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/:id" element={<ShoePage />} />
          <Route path="/filter/:filter" element={<FilterPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms_of_use" element={<TermsOfUsePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes >
        <Footer />
      </BrowserRouter>
    </>

  )
}

export default App
