import React from "react";
import Map from "./components/Map";
import Pie from "./components/Pie";
import "./App.css";

function App() {

  const [province] = React.useState("DKI Jakarta") 

  return (
    <div className="app bg-neutral-900 text-white min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Statlistrik</h1>
      <p className="text-amber-100 font-bold mb-4 space-x-7">Dashboard Pembangkitan dan Penggunaan Listrik Indonesia</p>
      <div className="grid gap-6">
        <Map />
        <Pie province={province} />
      </div>
    </div>
  );
}

export default App;
