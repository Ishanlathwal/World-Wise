import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";
import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/UserLoginContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CitiesProvider>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='product' element={<Product />} />

              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />

              <Route
                path='app'
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                <Route index element={<Navigate replace to='cities' />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='cities' element={<CityList />} />
                <Route path='countries' element={<CountryList />} />
                <Route path='form' element={<Form />} />
              </Route>

              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </CitiesProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
