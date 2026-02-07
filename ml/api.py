from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
import os

app = FastAPI(title="Resource Optimization API")

# Load model artifact
MODEL_PATH = "resource_optimization_model.joblib"
if not os.path.exists(MODEL_PATH):
    raise RuntimeError(f"Model file not found at {MODEL_PATH}")

artifact = joblib.load(MODEL_PATH)
model = artifact["model"]
le = artifact["area_encoder"]
features = artifact["features"]
threshold = artifact["threshold"]

class PredictionRequest(BaseModel):
    Area_ID: str
    Electricity_kWh: float
    Water_Liters: float
    Temp: float
    Population: int
    DayOfWeek: int
    Month: int
    Weekend: int
    TimeSlot: str  # Morning / Afternoon / Evening

def preprocess(data: PredictionRequest):
    df = pd.DataFrame([data.dict()])

    # Encode Area_ID
    # Handle unseen labels carefully or ensure inputs are valid
    try:
        df["Area_ID"] = le.transform(df["Area_ID"])
    except ValueError:
        # Fallback for unknown areas, or raise error. 
        # For now, let's assume a default or error out.
        # Using a known class for safety if possible, or 0
        df["Area_ID"] = 0 

    # Per-capita features
    df["Elec_per_capita"] = df["Electricity_kWh"] / df["Population"]
    df["Water_per_capita"] = df["Water_Liters"] / df["Population"]

    # Lag & rolling (dummy values for inference contexts where history isn't available)
    # in a real system, we'd fetch these from a DB
    df["Elec_lag_1"] = df["Electricity_kWh"]
    df["Water_lag_1"] = df["Water_Liters"]
    df["Elec_roll_7"] = df["Electricity_kWh"]
    df["Water_roll_7"] = df["Water_Liters"]

    # TimeSlot one-hot encoding
    df["TimeSlot_Morning"] = (df["TimeSlot"] == "Morning").astype(int)
    df["TimeSlot_Afternoon"] = (df["TimeSlot"] == "Afternoon").astype(int)
    df["TimeSlot_Evening"] = (df["TimeSlot"] == "Evening").astype(int)

    df.drop(columns=["TimeSlot"], inplace=True)

    # Ensure all features exist
    for feature in features:
        if feature not in df.columns:
            df[feature] = 0

    return df[features]

@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        X = preprocess(request)
        prob = model.predict_proba(X)[:, 1][0]
        optimized = int(prob >= threshold)

        return {
            "optimized": optimized,
            "probability": round(float(prob), 4),
            "is_optimized": bool(optimized)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def health_check():
    return {"status": "ok", "service": "ML Resource Optimization"}
