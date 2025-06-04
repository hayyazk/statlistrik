import React, { useState } from "react";
import rawData from "../../public/data/line_data.json";
import Plot from "react-plotly.js";

interface LineData {
  [key: string]: {
    [key: string]: number;
  };
}
const lineData = rawData as LineData;

const Line: React.FC = () => {
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>(["Indonesia"]);
  const provinceOptions = Object.keys(lineData);

  const years = [2019, 2020, 2021, 2022, 2023];

  const handleAddProvince = (province: string) => {
    if (!selectedProvinces.includes(province) && selectedProvinces.length < 5) {
      setSelectedProvinces([...selectedProvinces, province]);
    }
  };

  const handleRemoveProvince = (province: string) => {
    setSelectedProvinces((prev) => prev.filter((p) => p !== province));
  };

  const colorPalette = [
    "#FFFFF2", "#faf291", "#F8E70D", "#FCB407", "#c26100"
  ];

  const getColorForProvince = (prov: string) => {
    const index = selectedProvinces.indexOf(prov);
    return colorPalette[index % colorPalette.length];
  };

  return (
    <div>
        <div className="grid lg:grid-cols-2 gap-6">
        <div>
            <h2 className="text-xl font-bold mb-2 text-center">Pembangkitan Listrik (GWh)</h2>
            <Plot
            data={selectedProvinces.map((prov) => ({
                x: years,
                y: years.map((year) => lineData[prov]?.[`generated_${year}`]),
                mode: "lines+markers",
                name: prov,
                marker: { color: getColorForProvince(prov) },
                line: { color: getColorForProvince(prov) },
                hovertemplate: `${prov}<br>GWh: %{y}<extra></extra>`
            }))}
            layout={{
                margin: { t: 10, b: 40, l: 50, r: 20 },
                height: 300,
                width: 600,
                plot_bgcolor: "transparent",
                paper_bgcolor: "transparent",
                font: { color: "white" },
                showlegend: false,
                xaxis: { gridcolor: "rgba(255,255,255,0.5)" },
                yaxis: { gridcolor: "rgba(255,255,255,0.5)" },
            }}
            config={{ displayModeBar: false }}
            />
        </div>

        <div>
            <h2 className="text-xl font-bold mb-2 text-center">Penggunaan Listrik (kWh)</h2>
            <Plot
            data={selectedProvinces.map((prov) => ({
                x: years,
                y: years.map((year) => lineData[prov]?.[`distributed_${year}`]),
                mode: "lines+markers",
                name: prov,
                marker: { color: getColorForProvince(prov) },
                line: { color: getColorForProvince(prov) },
                hovertemplate: `${prov}<br>GWh: %{y}<extra></extra>`
            }))}
            layout={{
                margin: { t: 10, b: 40, l: 50, r: 20 },
                height: 300,
                width: 600,
                plot_bgcolor: "transparent",
                paper_bgcolor: "transparent",
                font: { color: "white" },
                showlegend: false,
                xaxis: { gridcolor: "rgba(255,255,255,0.5)" },
                yaxis: { gridcolor: "rgba(255,255,255,0.5)" },
            }}
            config={{ displayModeBar: false }}
            />
        </div>   
        </div>
        <div className="flex gap-4 mx-10 my-auto">
            <h3 className="font-semibold mb-2 text-start text-sm w-30">Tambahkan<br></br> Provinsi (maks 5)</h3>
            <select
            onChange={(e) => handleAddProvince(e.target.value)}
            className="px-3 py-1 rounded mb-4 bg-white text-black h-10"
            >
            <option value="">- Pilih provinsi -</option>
            {provinceOptions.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
            ))}
            </select>
            <div className="flex gap-1 flex-wrap">
            {selectedProvinces.map((prov) => (
                <div>
                    <button
                    key={prov}
                    onClick={() => handleRemoveProvince(prov)}
                    className="px-3 rounded-full text-sm text-white"
                    style={{ backgroundColor: getColorForProvince(prov), color: "black", fontSize: "14px" }}
                    >
                    {prov} ×
                    </button>
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};


export default Line