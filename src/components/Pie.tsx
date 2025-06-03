import { useState } from "react";
import { Chart } from "react-google-charts";
import rawPembangkitan from "../../public/data/pie_data_pembangkitan_2023.json";
import rawPenggunaan from "../../public/data/pie_data_penggunaan_2023.json";

interface PieData {
  [key: string]: {
    [key: string]: number;
  };
}
const pembangkitan = rawPembangkitan as PieData;
const penggunaan = rawPenggunaan as PieData;

const Pie = ({province} : {province:string}) => {
    var [bangkit] = useState<Array<[string, string] | [string, number]>>([])
    var [guna] = useState<Array<[string, string] | [string, number]>>([])
    
    bangkit = [
    ["Jenis Pembangkit", "listrik (Gwh)"],
    ["Air", pembangkitan[province]["air"]],
    ["Diesel", pembangkitan[province]["diesel"]],
    ["Gas dan Uap", pembangkitan[province]["gas_dan_uap"]],
    ["Gas", pembangkitan[province]["gas"]],
    ["Lain", pembangkitan[province]["lain"]],
    ["Mesin Gas", pembangkitan[province]["mesin_gas"]],
    ["Mikrohidro", pembangkitan[province]["mikrohidro"]],
    ["Panas Bumi", pembangkitan[province]["panas_bumi"]],
    ["Surya", pembangkitan[province]["surya"]],
    ["Uap", pembangkitan[province]["uap"]],
    ]

    guna = [
        ["Jenis Penggunaan", "listrik (Gwh)"],
        ["Industri", penggunaan[province]["industri"]],
        ["Rumahtangga", penggunaan[province]["rumahtangga"]],
        ["Komersial", penggunaan[province]["komersial"]],
        ["Pemerintah", penggunaan[province]["pemerintah"]],
        ["Penerangan Jalan", penggunaan[province]["penerangan_jalan"]],
        ["Sosial", penggunaan[province]["sosial"]]
    ]
    
    
    const options1 = {
        title: "Pembangkitan Listrik (Gwh)",
        titleTextStyle: {
            color: '#ffffff'
        },
        // pieHole: 0.4,
        is3D: false,
        pieStartAngle: 100,
        // sliceVisibilityThreshold: 0.02,
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: "#ffffff",
                fontSize: 14,
            },
        },
        backgroundColor: "transparent",
        colors: ["#c26100", "#c26100", "#c26100", "#c26100", "#c26100", "#c26100", "#c26100", "#c26100", "#c26100", "#c26100"],
    };    

        const options2 = {
        title: "Penggunaan Listrik (Gwh)",
        titleTextStyle: {
            color: '#ffffff'
        },
        // pieHole: 0.4,
        is3D: false, 
        pieStartAngle: 100,
        // sliceVisibilityThreshold: 0.02,
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: "#ffffff",
                fontSize: 14,
            },
        },
        backgroundColor: "transparent",
        colors: ["#c26100", "#c26100", "#c26100", "#c26100", "#c26100"],
    };    

    return (
        <div className="flex-col justify-between">
            <h2 className="text-3xl font-bold text-center">{province}</h2>
            <div className="flex">
                <div>
                    <Chart
                        chartType="PieChart"
                        data={bangkit}
                        options={options1}
                        width={"280px"}
                        height={"300px"}
                    />
                </div>
                <div>
                    <Chart
                        chartType="PieChart"
                        data={guna}
                        options={options2}
                        width={"280px"}
                        height={"300px"}
                    />
                </div>
            </div>
            <p>Klik provinsi pada peta untuk melihat detil provinsi tersebut</p>
        </div>
    )
}

export default Pie