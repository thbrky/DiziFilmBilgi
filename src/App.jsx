import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Signin from "./Login.jsx";
import Anasayfa from "./anasayfa.jsx";
import KayitOl from "./SignUp.jsx";
import Series from "./pages/Series/Series.jsx";
import SeriesDetail from "./pages/Series/SeriesDetail.jsx";
import Movies from "./pages/Movies/Movies.jsx";
import Breadcrumb from "./pages/components/breadcrumbs.jsx";
import MoviesDetail from "./pages/Movies/MoviesDetail.jsx";

function App() {
  const location = useLocation();

  // Breadcrumb'ı göstermek istediğimiz URL'leri burada belirleyebiliriz
  const showBreadcrumb = [
    "/",
    "/Login",
    "/Signup",
    "/Series/:id",
    "/Movies/:id", // MoviesDetail için
  ].includes(location.pathname);

  return (
    <>
      {showBreadcrumb && <Breadcrumb />}
      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/Login" element={<Signin />} />
        <Route path="/Signup" element={<KayitOl />} />
        <Route path="/Series" element={<Series />} />
        <Route path="/Series/:id" element={<SeriesDetail />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Movies/:id" element={<MoviesDetail />} />
      </Routes>
    </>
  );
}

export default App;
