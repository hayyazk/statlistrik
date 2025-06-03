import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import geoData from "../../public/data/provinsi.geojson.json";
import rawData from "../../public/data/map_data_2023.json";
import * as ss from "simple-statistics";

interface ElectricityData {
  [key: string]: {
    [key: string]: number;
  };
}
const electricityData = rawData as ElectricityData;

const bounds: LatLngBoundsExpression = [
  [-11.2, 94.9],
  [6.1, 141.1]
];

const metricLabels: Record<string, string> = {
  Generated_GWh: "Pembangkitan Listrik",
  Distributed_GWh: "Penggunaan Listrik",
  Distributed_per_Consumer_kWh: "Penggunaan Listrik per Konsumen"
};

const metricUnits: Record<string, string> = {
  Generated_GWh: "GWh",
  Distributed_GWh: "GWh",
  Distributed_per_Consumer_kWh: "kWh"
};

const colorScale = ["#FFFFF2", "#faf291", "#F8E70D", "#FCB407", "#c26100"];

function getColor(value: number, breaks: number[]) {
  for (let i = 0; i < breaks.length - 1; i++) {
    if (value >= breaks[i] && value < breaks[i + 1]) {
      return colorScale[i];
    }
  }
  return colorScale[colorScale.length - 1];
}

interface MapProps {
  province: string;
  setProvince: (prov: string) => void;
}

const Map: React.FC<MapProps> = ({setProvince}) => {
  const [selectedMetric, setSelectedMetric] = useState("Generated_GWh");
  const [jenksBreaks, setJenksBreaks] = useState<number[]>([]);

  useEffect(() => {
    const values = Object.values(electricityData)
      .map((d: any) => d[selectedMetric])
      .filter((v, index): v is number => typeof v === "number" && !isNaN(v) && index!=34);
    const breaks = ss.jenks(values, 5);
    breaks[breaks.length - 1] += 5;
    setJenksBreaks(breaks);
  }, [selectedMetric]);

  const onEachFeature = (feature: any, layer: any) => {
    const province = feature.properties.province;
    const value = electricityData[province]?.[selectedMetric];
    layer.setStyle({
      fillColor: getColor(value ?? 0, jenksBreaks),
      weight: 1,
      color: "#111",
      fillOpacity: 1
    });
    layer.bindTooltip(`<strong>${province}</strong><br>${metricLabels[selectedMetric]}: ${value ?? "No data"} ${metricUnits[selectedMetric]}`);
    layer.on({
      click: () => setProvince(province),
    });
  };

  const styleFeature = (feature: any) => {
  const province = feature.properties?.province;
  const value = electricityData[province]?.[selectedMetric];
  return {
      fillColor: getColor(value ?? 0, jenksBreaks),
      weight: 1,
      color: "#111",
      fillOpacity: 1,
  };
  };

  return (
    <div className="relative">
      <div className="mb-4 flex gap-4 justify-center">
        {Object.keys(metricLabels).map((key) => (
          <label key={key} className="cursor-pointer">
            <input
              type="radio"
              name="metric"
              value={key}
              checked={selectedMetric === key}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="mr-2"
            />
            {metricLabels[key]}
          </label>
        ))}
      </div>
      <MapContainer
        bounds={bounds}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        style={{ height: "420px", width: "650px" }}
        zoomSnap={0.1}
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={false}
        zoomControl={false}
        zoomDelta={0.5}
        minZoom={4}
        maxZoom={6}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <GeoJSON key={selectedMetric} data={geoData as any} onEachFeature={onEachFeature} style={styleFeature} />
      </MapContainer>
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white text-sm p-3 rounded shadow-md z-[1000]">
        <div className="block mb-1">{metricLabels[selectedMetric]}</div>
        {jenksBreaks.length > 1 &&
            jenksBreaks.slice(0, -1).map((val, i) => {
            const next = jenksBreaks[i + 1];
            const color = colorScale[i];
            console.log(color);
            return (
                <div key={i} className="flex items-center mb-1">
                <div
                    className="w-4 h-4 mr-2 rounded-sm"
                    style={{ backgroundColor: color }}
                />
                <span>{val.toFixed(0)} – {next.toFixed(0)} {metricUnits[selectedMetric]}</span>
                </div>
            );
            })}
        </div>
    </div>
  );
};

export default Map;
