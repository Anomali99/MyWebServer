from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:5127@localhost/bukuku'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_FOLDER'] = "static/upload"
    db.init_app(app)

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
    return db
