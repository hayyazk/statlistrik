import pandas as pd
import json
import numpy as np

consumers_df = pd.read_csv("public/data/raw/consumers.csv")
distributed_df = pd.read_csv("public/data/raw/distributed.csv")
generated_df = pd.read_csv("public/data/raw/generated.csv")

# line_consumers_df = consumers_df[["Provinsi", year]].rename(columns={year: "total"})
# line_distributed_df = distributed_df[["Provinsi", year]].rename(columns={year: "total"})
# line_generated_df = generated_df[["Provinsi", year]].rename(columns={year: "total"})

years = ["2019", "2020", "2021", "2022", "2023"]
line_df = pd.DataFrame()
line_df['Provinsi'] = consumers_df['Provinsi']
for year in years:
    line_df[f"generated_{year}"] = generated_df[year]
    line_df[f"distributed_{year}"] = distributed_df[year]
    line_df[f"consumers_{year}"] = consumers_df[year]
    # temp = pd.DataFrame({
    #     "Provinsi": consumers_df["Provinsi"],
    #     "Year": year,
    #     "Generated_GWh": pd.to_numeric(generated_df[year], errors='coerce'),
    #     "Distributed_GWh": pd.to_numeric(distributed_df[year], errors='coerce'),
    #     "Distributed_per_Consumer_kWh": pd.to_numeric((distributed_df[year]*1_000_000)/consumers_df[year], errors='coerce')
    # })
    # line_df = pd.concat([line_df, temp], ignore_index=True)

pie_distributed_df['total'] = (pie_distributed_df["total"] * 1_000_000) / pie_consumers_df["total"]
pie_distributed_df['total'] = pie_distributed_df['total'].round(2)

for e in consumer:
    pie_distributed_df[e] = (pie_distributed_df[e] * 1_000_000) / pie_consumers_df[e]
    pie_distributed_df[e] = pie_distributed_df[e].round(2)

pie_generated_df = pie_generated_df.replace(np.nan, 0)

province_keyed_data = pie_generated_df.set_index("Provinsi").to_dict(orient="index")

with open(f"public/data/pie_data_pembangkitan_{year}.json", "w") as f:
    json.dump(province_keyed_data, f, indent=2)

pie_distributed_df = pie_distributed_df.replace(np.nan, 0)

province_keyed_data = pie_distributed_df.set_index("Provinsi").to_dict(orient="index")

with open(f"public/data/pie_data_penggunaan_{year}.json", "w") as f:
    json.dump(province_keyed_data, f, indent=2)