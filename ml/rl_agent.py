import numpy as np
import random

class DigitalTwinEnv:
    def __init__(self):
        # State: [WaterLevel (0-100), ElectricityLoad (0-100), Temperature (C), Occupancy (%)]
        self.state = np.array([50.0, 40.0, 24.0, 75.0])
        self.optimal_temp = 24.0
        
    def reset(self):
        self.state = np.array([50.0, 40.0, 24.0, 75.0])
        return self.state
        
    def step(self, action):
        """
        Action:
        0: Do Nothing
        1: Optimize Water (Reduce pressure/flow)
        2: Optimize Energy (Dim lights/adjust HVAC)
        """
        water, elec, temp, occ = self.state
        
        # Natural fluctuation simulation
        water += np.random.normal(0, 2)
        elec += np.random.normal(0, 2)
        temp += np.random.normal(0, 0.5)
        
        # Action effects
        if action == 1: # Optimize Water
            water -= 5
            elec -= 1 # Slight pump savings
        elif action == 2: # Optimize Energy
            elec -= 5
            temp += 0.5 # AC reduced, temp might rise slightly
            
        # Physics constraints
        water = np.clip(water, 0, 100)
        elec = np.clip(elec, 0, 100)
        
        self.state = np.array([water, elec, temp, occ])
        
        # Reward Calculation
        # Minimize resource usage + keep temp close to optimal
        reward = -(water * 0.1 + elec * 0.2 + (temp - self.optimal_temp)**2)
        
        return self.state, reward, {}

class RLAgent:
    def __init__(self):
        self.q_table = {} # Simple placeholder for Q-learning or Policy
        self.epsilon = 0.1
        
    def get_action(self, state):
        # Very simple policy for demo:
        # If resources are high, take action to reduce them.
        water, elec, temp, occ = state
        
        if water > 70:
            return 1 # Optimize Water
        if elec > 70:
            return 2 # Optimize Energy
            
        # Exploration
        if random.random() < self.epsilon:
            return random.choice([0, 1, 2])
            
        return 0 # Do nothing
        
agent = RLAgent()
env = DigitalTwinEnv()
