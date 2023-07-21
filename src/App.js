// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';\
import { LiveCasino } from "./components/LiveCasino";
import Header from "./layouts/Header/Header";
import { Exchange } from "./Pages/Exchange";
import { LiveCasinoPage } from "./Pages/LiveCasinoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      {/* <LiveCasinoPage /> */}
      <Header/>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Exchange />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="live-casino" element={<LiveCasinoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
