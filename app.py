from flask import Flask
from api import api as api_blueprint
from config import connect


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = "static/upload"
app.register_blueprint(api_blueprint)
db = connect(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)