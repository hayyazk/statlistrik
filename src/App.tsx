import React from "react";
import Map from "./components/Map";
import Pie from "./components/Pie";
import "./App.css";

function App() {

  const [province, setProvince] = React.useState("DKI Jakarta") 

  return (
    <div className="app bg-neutral-900 text-white min-h-screen w-full overflow-x-hidden">
      <h1 className="text-3xl font-bold mt-4 text-center font-heading">Statlistrik</h1>
      <p className="text-amber-100 font-bold mb-4">Dashboard Pembangkitan dan Penggunaan Listrik Indonesia</p>
      <div className="flex gap-6">
        <Map province={province} setProvince={setProvince} />
        <Pie province={province} />
      </div>
    </div>
  );
}

export default App;
