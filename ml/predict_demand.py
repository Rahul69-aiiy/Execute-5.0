import pandas as pd
import numpy as np
import sys
import json

def predict_demand():
    # Mock training data generation
    dates = pd.date_range(start='2024-01-01', periods=30)
    data = pd.DataFrame({
        'date': dates,
        'water_usage': np.random.normal(500, 50, 30), # Mean 500L, SD 50
        'electricity_usage': np.random.normal(50, 5, 30) # Mean 50kWh, SD 5
    })

    # Simple moving average for prediction
    water_pred = data['water_usage'].rolling(window=3).mean().iloc[-1]
    elec_pred = data['electricity_usage'].rolling(window=3).mean().iloc[-1]

    result = {
        'status': 'success',
        'prediction': {
            'date': (dates[-1] + pd.Timedelta(days=1)).strftime('%Y-%m-%d'),
            'water_prediction': round(water_pred, 2),
            'electricity_prediction': round(elec_pred, 2)
        }
    }

    print(json.dumps(result))

if __name__ == "__main__":
    predict_demand()
