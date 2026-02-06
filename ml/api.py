from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import pandas as pd
import json
from .rl_agent import agent, env
# Import existing ML model logic if needed
# from .water_electricity_optimization import ... (assuming refactored to module)

app = FastAPI()

class StepRequest(BaseModel):
    action: int = None # Optional, if frontend wants to force an action

class ForecastRequest(BaseModel):
    days: int = 7

@app.get("/")
def read_root():
    return {"status": "ML Service Running"}

@app.get("/forecast")
def get_forecast():
    # Logic from predict_demand.py adapted here
    dates = pd.date_range(start='2024-02-01', periods=7)
    forecast = []
    for date in dates:
        forecast.append({
            "date": date.strftime('%Y-%m-%d'),
            "predicted_water": round(np.random.normal(500, 50), 2),
            "predicted_electricity": round(np.random.normal(50, 5), 2)
        })
    return forecast

@app.post("/step")
def step_simulation(req: StepRequest):
    # Determine action
    current_state = env.state
    
    if req.action is not None:
        action = req.action
    else:
        action = agent.get_action(current_state)
        
    next_state, reward, _ = env.step(action)
    
    return {
        "state": {
            "water_level": float(next_state[0]),
            "electricity_load": float(next_state[1]),
            "temperature": float(next_state[2]),
            "occupancy": float(next_state[3])
        },
        "action_taken": action,
        "reward": float(reward)
    }

@app.post("/reset")
def reset_simulation():
    state = env.reset()
    return {
        "message": "Simulation Reset",
        "state": {
            "water_level": float(state[0]),
            "electricity_load": float(state[1]),
            "temperature": float(state[2]),
            "occupancy": float(state[3])
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
