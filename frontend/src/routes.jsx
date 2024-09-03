import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from './App'
import { Login } from "./pages/Login/Login"
import { Register } from "./pages/Register/Register"
import { About } from "./pages/About/About"

export const RoutesComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App />} />
                <Route path="/home" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    )
}