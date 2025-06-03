import pandas as pd
import json

consumers_df = pd.read_csv("public/data/raw/consumers.csv")
distributed_df = pd.read_csv("public/data/raw/distributed.csv")
generated_df = pd.read_csv("public/data/raw/generated.csv")

#map data
year = "2019" 
map_consumers_df = consumers_df[["Provinsi", year]].rename(columns={year: "Consumers"})
map_distributed_df = distributed_df[["Provinsi", year]].rename(columns={year: "Distributed_GWh"})
map_generated_df = generated_df[["Provinsi", year]].rename(columns={year: "Generated_GWh"})

map_df = map_consumers_df.merge(map_distributed_df, on="Provinsi").merge(map_generated_df, on="Provinsi")

map_df["Generated_GWh"] = map_df["Generated_GWh"].astype(str).str.replace('"', "").astype(float)

map_df["Distributed_per_Consumer_kWh"] = (map_df["Distributed_GWh"] * 1_000_000) / map_df["Consumers"]
map_df["Distributed_per_Consumer_kWh"] = map_df["Distributed_per_Consumer_kWh"].round(2)

province_keyed_data = map_df.set_index("Provinsi").to_dict(orient="index")

with open(f"public/data/map_data_{year}.json", "w") as f:
    json.dump(province_keyed_data, f, indent=2)

# line chart data
# years = ["2019", "2020", "2021", "2022", "2023"]
# line_df = pd.DataFrame()
# for year in years:
#     temp = pd.DataFrame({
#         "Provinsi": consumers_df["Provinsi"],
#         "Year": year,
#         "Generated_GWh": pd.to_numeric(generated_df[year], errors='coerce'),
#         "Distributed_GWh": pd.to_numeric(distributed_df[year], errors='coerce'),
#         "Distributed_per_Consumer_kWh": pd.to_numeric((distributed_df[year]*1_000_000)/consumers_df[year], errors='coerce')
#     })
#     line_df = pd.concat([line_df, temp], ignore_index=True)

# province_keyed_data = line_df.set_index("Provinsi").to_dict(orient="index")

# with open(f"public/data/line_data_{year}.json", "w") as f:
#     json.dump(province_keyed_data, f, indent=2)

# line_df.to_json(f"public/data/line_data_{year}.json", orient="index")