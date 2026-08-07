import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Contact } from "./pages/Contact";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="urunler" element={<Products />} />
          <Route path="urun/:slug" element={<ProductDetail />} />
          <Route path="iletisim" element={<Contact />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
