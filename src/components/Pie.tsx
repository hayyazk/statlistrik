import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Papa from 'papaparse';
import pembangkitan from "../../public/data/pie_data_pembangkitan_2023.json";
import penggunaan from "../../public/data/pie_data_pembangkitan_2023.json";

const Pie = ({province} : {province:string}) => {

    const fileReader = new FileReader()

    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    var [data, setData] = useState([])
    var [consumers, setConsumers] = useState([])
    var [bangkit, setBangkit] = useState([])

    var data = [
            ["Task", "Hours per Day"],
            ["Work", 11],
            ["Eat", 2],
            ["Commute", 2],
            ["Watch TV", 2],
            ["Sleep", 7],
        ];
    
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


    var consumers = [];

    async function GetData(filename) {
    //    const data = Papa.parse(await fetchCsv(filename));
    //    var result = [];
    //    var result2 = [];

    //    for (let i=0; i < data.data.length; i++) {
    //        for (let j=0; j < data.data[i].length; j++) {
    //            result2.push(data.data[i][j]);
    //        }
    //        if (result2[0] == "" && result2.length == 1) {
    //            // array does not exist or is empty
    //        }
    //        else {
    //            result.push(result2);
    //       }
    //        result2 = [];
    //        //console.log(result)
    //    }
    //    
    //    consumers = result;
    //    
    //    console.log(consumers)
        return;
    }

    const [selectedMetric, setSelectedMetric] = useState("DKI Jakarta");
    
    useEffect(() => {
        // This code will run after the component renders.
        GetData("consumers.csv")
        console.log(pembangkitan)
        console.log(penggunaan)


        console.log(bangkit)
        console.log(data)
        
    });
    
    
    const options = {
        title: "My Daily Activities",
        pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
        is3D: true, // Enables 3D view
        // slices: {
        //   1: { offset: 0.2 }, // Explodes the second slice
        // },
        pieStartAngle: 100, // Rotates the chart
        sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: "#233238",
                fontSize: 14,
            },
        },
        backgroundColor: { fill:'#feffc2' },
        colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
    };    

    return (
        <div>
            <h2 className="text-3xl font-bold mb-2 text-center">{province}</h2>
            <Chart
                chartType="PieChart"
                data={bangkit}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>
    )
}

export default Pie