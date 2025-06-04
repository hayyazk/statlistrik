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

interface PieProps {
  province: string;
  setProvince: (prov: string) => void;
}

const Pie: React.FC<PieProps> = ({province, setProvince}) => {
    var [bangkit] = useState<Array<[string, string] | [string, number]>>([])
    var [guna] = useState<Array<[string, string] | [string, number]>>([])
    
    bangkit = [
    ["Jenis Pembangkit", "listrik (Gwh)"],
    ["Air", pembangkitan[province]["air"]],
    ["Diesel", pembangkitan[province]["diesel"]],
    ["Gas dan Uap", pembangkitan[province]["gas_dan_uap"]],
    ["Gas", pembangkitan[province]["gas"]],
    ["Mesin Gas", pembangkitan[province]["mesin_gas"]],
    ["Mikrohidro", pembangkitan[province]["mikrohidro"]],
    ["Panas Bumi", pembangkitan[province]["panas_bumi"]],
    ["Surya", pembangkitan[province]["surya"]],
    ["Uap", pembangkitan[province]["uap"]],
    ]

    guna = [
        ["Jenis Penggunaan", "listrik (Gwh)"],
        ["Industri", penggunaan[province]["industri"]],
        ["Rumah Tangga", penggunaan[province]["rumahtangga"]],
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
        is3D: false,
        pieStartAngle: 100,
        legend: {
            position: "right",
            alignment: "center",
            textStyle: {
                color: "#ffffff",
                fontSize: 14,
            },
            maxLines: 999
        },
        backgroundColor: "transparent",
        colors: ["#F2BE0A", "#E4A912", "#D7941B", "#C97F23", "BB6A2B", "AE5434", "A03F3C", "952E44", "86174D", "770055"],
        pieSliceTextStyle: {
            color: "black"
        },
        pieSliceText: 'label',
    };    

    const options2 = {
        title: "Penggunaan Listrik (Gwh)",
        titleTextStyle: {
            color: '#ffffff'
        },
        is3D: false, 
        pieStartAngle: 100,
        legend: {
            position: "right",
            alignment: "center",
            textStyle: {
                color: "#ffffff",
                fontSize: 14,
            },
            maxLines: 999
        },
        backgroundColor: "transparent",
        colors: ["#F2BE0A", "#D7941B", "BB6A2B", "AE5434", "952E44", "770055"],
        pieSliceTextStyle: {
            color: "black"
        },
        pieSliceText: 'label',
    };    

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex justify-end gap-30">
                <h2 className="text-3xl font-bold text-center">{province}</h2>
                {province != "Indonesia" ? <button
                    onClick={() => setProvince("Indonesia")}
                    className="px-3 rounded-full"
                    style={{
                        backgroundColor: "#faf291", color: "black", fontFamily: "ABeeZee", fontSize: "12px",
                    }}
                    >
                    Lihat Total
                    </button>
                    :
                    <button
                    onClick={() => setProvince("Indonesia")}
                    className="px-3 rounded-full"
                    style={{
                        backgroundColor: "transparent", color: "transparent", fontFamily: "ABeeZee", fontSize: "12px",
                    }}
                    disabled={true}>
                    Lihat Total
                    </button>}
                
            </div>
            <div className="">
                <div>
                    <Chart
                        chartType="PieChart"
                        data={[
                        bangkit[0],
                        ...(bangkit.slice(1) as [string, number][]).sort((a, b) => b[1] - a[1]) // descending
                        ]}
                        options={options1}
                        width={"575px"}
                        height={"210px"}
                        className="custom-google-chart"
                    />
                </div>
                <div>
                    <Chart
                        chartType="PieChart"
                        data={[
                        guna[0],
                        ...(guna.slice(1) as [string, number][]).sort((a, b) => b[1] - a[1]) // descending
                        ]}
                        options={options2}
                        width={"575px"}
                        height={"210px"}
                        className="custom-google-chart"
                    />
                </div>
            </div>
            <div className="text-sm bg-amber-100 text-black m-auto px-4">
                <p className="text-center">Klik provinsi pada peta untuk melihat detil provinsi tersebut</p>
            </div>
        </div>
    )
}

export default Pie