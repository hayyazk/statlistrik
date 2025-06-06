import React from "react";
import Map from "./components/Map";
import Pie from "./components/Pie";
import "./App.css";
import Line from "./components/Line";

function App() {

  const [province, setProvince] = React.useState("Indonesia") 

  return (
    <div className="app bg-neutral-900 text-white min-h-screen w-full overflow-x-hidden">
      <h1 className="text-3xl font-bold mt-4 text-center font-heading">Statlistrik</h1>
      <p className="text-amber-100 font-bold">Dashboard Pembangkitan dan Penggunaan Listrik Indonesia</p>
      <div className="flex items-center m-4">
        <Map province={province} setProvince={setProvince} />
        <Pie province={province} setProvince={setProvince} />
      </div>
        
      <div className="items-center my-10">
        <Line></Line>
      </div>
    </div>
  );
}

export default App;
