from . import api
from model.reting import Reting
from config import db
from flask import jsonify, request

@api.route('/reting/<idBuku>/add', methods=['POST'])
def addReting(idBuku):
    nilai  = int(request.json['nilai'])
    komentar  = request.json['komentar']
    id_user  = request.json['id_user']
    try:
        rate = Reting(id_buku=idBuku, id_user=id_user, nilai=nilai, komentar=komentar)
        db.session.add(rate)
        db.session.commit()
        return jsonify({'message' : 'komentar berhasil ditambahkan', })
    except Exception as e:
        return jsonify({'message' : 'komentar gagal ditambahkan', 'ex' : str(e), })

@api.route('/reting/<idBuku>', methods=['GET'])
def reting(idBuku):
    rate = db.session.query(Reting).filter(Reting.id_buku==idBuku).all()
    if rate:
        data = [ret.json() for ret in rate]
        return jsonify(data)
    else:
        return  jsonify({'message' : 'tidak ada reting'})

@api.route('/reting/all', methods=['GET'])
def allReting():
    rate = db.session.query(Reting).all()
    if rate:
        data = [ret.json() for ret in rate]
        return jsonify(data)
    else:
        return  jsonify({'message' : 'tidak ada reting'})

