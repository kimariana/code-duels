import os
import json

def load_problems():
    problems_file_path = "app/data/problems.json"
    
    # Check if the file exists
    if not os.path.exists(problems_file_path):
        raise FileNotFoundError(f"The file {problems_file_path} does not exist.")

    # Open and load the JSON data
    with open(problems_file_path, 'r') as file:
        return json.load(file)
    