from app import app
from flask import jsonify
from app.utils.load_problems import load_problems

# Function to get all problems
@app.route('/problems', methods=["GET"])
def get_problems():
    try:
        problems = load_problems() # Get the list of all problems
        return jsonify(problems) # Return problems as JSON
    
    except FileNotFoundError as e:
        return jsonify({"error": str(e)}), 404

# Function to get a specific problem by ID
@app.route('/problems/<int:problem_id>', methods=["GET"])
def get_problem(problem_id: int):
    try:
        problems = load_problems() # Get the list of all problems

        # Search for the problem by its problemId
        problem = next(
        (p for p in problems if int(p['data']['question']['questionId']) == problem_id), None
        )

        # Return problem if found
        if problem:
            return jsonify(problem)
        else:
            return jsonify({"error": "Problem not found"}), 404
    
    except FileNotFoundError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
