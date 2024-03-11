from . import api
from model.transaksi import Transaksi
from model.detail_transaksi import Detail_Transaksi
from config import db
from flask import jsonify, request

@api.route('/transaksi/add', methods=['POST'])
def addTrans():
    total = int(request.json['total'])
    status = request.json['status']
    id_user = request.json['id_user']
    detail = request.json['detail']
    try:
        trans = Transaksi(id_user=id_user, total=total, status=status)
        db.session.add(trans)
        for det in detail:
            subtotal = int(det['subtotal'])
            jumlah = int(det['jumlah'])
            id_buku = det['id_buku']
            detTrans = Detail_Transaksi(subtotal=subtotal, jumlah=jumlah, id_buku=id_buku, id_transaksi=trans.id)
            db.session.add(detTrans)
        db.session.commit()
        return jsonify({'message' : 'transaksi berhasil', })
    except Exception as e:
        return jsonify({'message' : 'transaksi gagal', 'ex' : str(e), })

@api.route('/transaksi/all', methods=['GET'])
def allTrans():
    trans = db.session.query(Transaksi).all()
    if trans:
        data = [t.json() for t in trans]
        return jsonify(data)
    else:
        return  jsonify({'message' : 'tidak ada transaksi'})

@api.route('/transaksi/<id>', methods=['GET'])
def Trans(id):
    trans = db.session.query(Transaksi).filter(Transaksi.id==id).first()
    if trans:
        return jsonify(trans.json())
    else:
        return  jsonify({'message' : 'tidak ada transaksi'})