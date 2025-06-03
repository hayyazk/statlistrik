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
    ["air", pembangkitan[province]["air"]],
    ["diesel", pembangkitan[province]["diesel"]],
    ["gas_dan_uap", pembangkitan[province]["gas_dan_uap"]],
    ["gas", pembangkitan[province]["gas"]],
    ["lain", pembangkitan[province]["lain"]],
    ["mesin_gas", pembangkitan[province]["mesin_gas"]],
    ["mikrohidro", pembangkitan[province]["mikrohidro"]],
    ["panas_bumi", pembangkitan[province]["panas_bumi"]],
    ["surya", pembangkitan[province]["surya"]],
    ["uap", pembangkitan[province]["uap"]]
    ]

    guna = [
        ["Jenis Penggunaan", "listrik (Gwh)"],
        ["industri", penggunaan[province]["industri"]],
        ["rumahtangga", penggunaan[province]["rumahtangga"]],
        ["komersial", penggunaan[province]["komersial"]],
        ["pemerintah", penggunaan[province]["pemerintah"]],
        ["penerangan_jalan", penggunaan[province]["penerangan_jalan"]],
        ["sosial", penggunaan[province]["sosial"]]
    ]
    
    
    const options1 = {
        title: "Pembangkitan Listrik (Gwh)",
        titleTextStyle: {
            color: '#ffffff'
        },
        pieHole: 0.4,
        is3D: false,
        pieStartAngle: 100,
        sliceVisibilityThreshold: 0.02,
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: "#ffffff",
                fontSize: 14,
            },
        },
        backgroundColor: "transparent",
        colors: ["#FFFFF2", "#faf291", "#F8E70D", "#FCB407", "#c26100", "#FFFFF2", "#faf291", "#F8E70D", "#FCB407", "#c26100"],
    };    

        const options2 = {
        title: "Penggunaan Listrik (Gwh)",
        titleTextStyle: {
            color: '#ffffff'
        },
        pieHole: 0.4,
        is3D: false, 
        pieStartAngle: 100,
        sliceVisibilityThreshold: 0.02,
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: "#ffffff",
                fontSize: 14,
            },
        },
        backgroundColor: "transparent",
        colors: ["#FFFFF2", "#faf291", "#F8E70D", "#FCB407", "#c26100"],
    };    

    return (
        <div>
            <h2 className="text-3xl font-bold mb-2 text-center">{province}</h2>
            <div className="flex">
                <div>
                    <Chart
                        chartType="PieChart"
                        data={bangkit}
                        options={options1}
                        width={"250px"}
                        height={"300px"}
                    />
                </div>
                <div>
                    <Chart
                        chartType="PieChart"
                        data={guna}
                        options={options2}
                        width={"250px"}
                        height={"300px"}
                    />
                </div>
            </div>
            <p>Klik provinsi pada peta untuk melihat detil provinsi tersebut</p>
        </div>
    )
}

export default Pie