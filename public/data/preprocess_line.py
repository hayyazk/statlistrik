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
    line_df[f"distributed_{year}"] = (distributed_df[year] * 1_000_000) / consumers_df[year]
    line_df[f"distributed_{year}"] = line_df[f"distributed_{year}"].round(2)

line_df = line_df.replace(np.nan, 0)

province_keyed_data = line_df.set_index("Provinsi").to_dict(orient="index")

with open(f"public/data/line_data.json", "w") as f:
    json.dump(province_keyed_data, f, indent=2)