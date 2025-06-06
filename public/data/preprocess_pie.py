import pandas as pd
import json
import numpy as np

energy = ['air', 'diesel', 'gas_dan_uap', 'gas', 'lain', 'mesin_gas', 'mikrohidro', 'panas_bumi', 'surya', 'uap']
consumer = ['industri', 'rumahtangga', 'komersial', 'pemerintah', 'penerangan_jalan', 'sosial']
distributed_df = pd.read_csv("public/data/raw/distributed.csv")
generated_df = pd.read_csv("public/data/raw/generated.csv")

year = "2023" 
pie_distributed_df = distributed_df[["Provinsi", year]].rename(columns={year: "total"})
pie_generated_df = generated_df[["Provinsi", year]].rename(columns={year: "total"})

for e in energy:
    df = pd.read_csv(f"public/data/raw/generated_{e}.csv")
    pie_generated_df[e] = df[year]

for e in consumer:
    df = pd.read_csv(f"public/data/raw/distributed_{e}.csv")
    pie_distributed_df[e] = df[year]

pie_generated_df = pie_generated_df.replace(np.nan, 0)

province_keyed_data = pie_generated_df.set_index("Provinsi").to_dict(orient="index")

with open(f"public/data/pie_data_pembangkitan_{year}.json", "w") as f:
    json.dump(province_keyed_data, f, indent=2)

pie_distributed_df = pie_distributed_df.replace(np.nan, 0)

province_keyed_data = pie_distributed_df.set_index("Provinsi").to_dict(orient="index")

with open(f"public/data/pie_data_penggunaan_{year}.json", "w") as f:
    json.dump(province_keyed_data, f, indent=2)