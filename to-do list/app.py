from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = []

@app.route('/')
def home():
    return "Welcome to the To-Do List API! Use /tasks to manage your tasks."

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    task = request.json.get('task')
    if task:
        tasks.append({'id': len(tasks) + 1, 'task': task})
        return jsonify({'message': 'Task added!', 'id': len(tasks)}), 201
    return jsonify({'error': 'Task cannot be empty!'}), 400

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({'message': 'Task deleted!'})

if __name__ == "__main__":
    app.run(debug=True)
