from . import api
from model.users import Users
from model.reting import Reting
from model.transaksi import Transaksi
from model.detail_transaksi import Detail_Transaksi
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
    
@api.route('/user/<id>/remove', methods=['GET'])
def removeUser(id):
    users = db.session.query(Users).filter(Users.id == id).first()
    reting = db.session.query(Reting).filter(Reting.id_user == id).all()
    transaksi = db.session.query(Transaksi).filter(Transaksi.id_user == id).all()
    if users:
        for ret in reting:
            db.session.delete(ret)
        for tran in transaksi:
            dt = db.session.query(Detail_Transaksi).filter(Detail_Transaksi.id_transaksi == tran.id).all()
            for det in dt:
                db.session.delete(det)
            db.session.delete(tran)
        db.session.delete(users)
        db.session.commit()
        return jsonify({'message' : 'user berhasil dihapus'})
    else:
        return  jsonify({'message' : 'gagal menghapus'})

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

@api.route('/user/addpegawai', methods=['POST'])
def addPegawai():
    nama = request.json['nama']
    username= request.json['username']
    password= request.json['password']
    telepon = request.json['telepon']
    level = "pegawai"
    try:
        user = Users(nama=nama, username=username, password=password, telepon=telepon, level=level)
        check = db.session.query(Users).filter_by(username=username).first()
        if check:
            return jsonify({'message' : 'username tidak tersdia'})
        else:
            db.session.add(user)
            db.session.commit()
            return jsonify({'message' : 'registrasi berhasil'})
    except Exception as e:
        return jsonify({'message' : 'registrasi gagal', 'ex' : str(e), })