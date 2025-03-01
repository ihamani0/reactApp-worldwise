import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";

import City from "./components/City";
import Form from "./components/Form";
import CitiesProvider from "./contexts/CitiesProvider";
import AuthProvider from "./contexts/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Product />} />
            <Route path="/Pricing" element={<Pricing />} />

            {/* Nest rout to the App */}
            <Route
              path="/app"
              element={
                <PrivateRoute>
                  <AppLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<CityList />} />

              <Route path="cities/:id" element={<City />} />

              <Route path="form" element={<Form />} />

              <Route path="countries" element={<CountryList />} />
            </Route>
            {/* End Nested route to the App */}

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<p>Not Found</p>} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
