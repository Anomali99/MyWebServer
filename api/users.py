from . import api
from model.users import Users
from config import db
from flask import jsonify, request
from werkzeug.security import check_password_hash


@api.route('/user', methods=['GET'])
def user():
    users = db.session.query(Users).all()
    if users:
        data = [user.json() for user in users]
        return jsonify(data)
    else:
        return  jsonify({'message' : 'tidak ada user'})

@api.route('/user/login', methods=['POST'])
def login():
    username= request.json['username']
    password= request.json['password']
    check = db.session.query(Users).filter_by(username=username).first()
    if check and check_password_hash(check.password, password):
        return jsonify(check.json())
    else:
        return jsonify({'message' : 'login gagal'})

@api.route('/user/register', methods=['POST'])
def register():
    nama = request.json['nama']
    username= request.json['username']
    password= request.json['password']
    telepon = request.json['telepon']
    try:
        user = Users(nama=nama, username=username, password=password, telepon=telepon)
        check = db.session.query(Users).filter_by(username=username).first()
        if check:
            return jsonify({'message' : 'username tidak tersdia'})
        else:
            db.session.add(user)
            db.session.commit()
            return jsonify({'message' : 'registrasi berhasil'})
    except Exception as e:
        return jsonify({'message' : 'registrasi gagal', 'ex' : str(e), })