from . import api
from model.buku import Buku
from model.kategori import Kategori
from model.kategori_buku import Kategori_Buku
from model.reting import Reting
from model.detail_transaksi import Detail_Transaksi
from sqlalchemy import and_, or_
from config import db
from flask import jsonify, request, current_app
import os
import base64


@api.route('/buku/kategori', methods=['GET'])
def kategori():
    kat = db.session.query(Kategori).all()
    if buku:
        data = [k.json() for k in kat]
        return jsonify(data)
    else:
        return  jsonify({'message' : 'tidak ada kategori'})

@api.route('/buku', methods=['GET'])
def bukuAll():
    buku = db.session.query(Buku).all()
    if buku:
        data = [buk.json() for buk in buku]
        return jsonify(data)
    else:
        return  jsonify({'message' : 'tidak ada buku'})

@api.route('/buku/<id>/remove', methods=['GET'])
def hapusbuku(id):
    buku = db.session.query(Buku).filter_by(id=id).first()
    kategori = db.session.query(Kategori_Buku).filter(Kategori_Buku.id_buku==id).all()
    reting = db.session.query(Reting).filter(Reting.id_buku==id).all()
    detail = db.session.query(Detail_Transaksi).filter(Detail_Transaksi.id_buku==id)
    if buku:
        for kat in kategori:
            db.session.delete(kat)
        for ret in reting:
            db.session.delete(ret)
        for det in detail:
            db.session.delete(det)
        db.session.delete(buku)
        db.session.commit()
        os.remove(os.path.join(current_app.config['UPLOAD_FOLDER'], buku.cover))
        return  jsonify({'message' : 'buku berhasil dihapus'})
    else:
        return  jsonify({'message' : 'buku gagal dihapus'})

@api.route('/buku/<id>', methods=['GET'])
def buku(id):
    buku = db.session.query(Buku).filter_by(id=id).first()
    if buku:
        return jsonify(buku.json())
    else:
        return  jsonify({'message' : 'tidak ada buku'})

@api.route('/buku/cari/<key>', methods=['GET'])
def caribuku(key):
    buku = db.session.query(Buku).outerjoin(Kategori_Buku, Kategori_Buku.id_buku == Buku.id).outerjoin(Kategori, Kategori.id == Kategori_Buku.id_kategori).filter(or_(Buku.judul.ilike(f"%{key}%"), Kategori.kategori.ilike(f"%{key}%"))).all()
    if buku:
        data = [buk.json() for buk in buku]
        return jsonify(data)
    else:
        return  jsonify({'message' : 'tidak ada buku'})

@api.route('/buku/<id>/edit', methods=['POST'])
def editbuku(id):
    judul =  request.json['judul']
    sinopsis =  request.json['sinopsis']
    harga =  int(request.json['harga'])
    stok =  int(request.json['stok'])
    buku = db.session.query(Buku).filter_by(id=id).first()
    if buku:
        buku.judul = judul
        buku.sinopsis = sinopsis
        buku.harga = harga
        buku.stok = stok
        db.session.merge(buku)
        db.session.commit()
        return  jsonify({'message' : 'berhasil mengedit buku'})
    else:
        return  jsonify({'message' : 'gagal mengedit buku'})

@api.route('/buku/add', methods=['POST'])
def addBuku():
    cover = request.json['cover']
    judul =  request.json['judul']
    sinopsis =  request.json['sinopsis']
    harga =  int(request.json['harga'])
    stok =  int(request.json['stok'])
    kategori = request.json['kategori']
    try:
        buku = Buku(judul=judul, sinopsis=sinopsis, harga=harga, stok=stok, filename=cover)
        _, encoded = cover.split(',', 1)
        image_data = base64.b64decode(encoded)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], buku.cover)
        with open(filepath, 'wb') as f:
            f.write(image_data)
        db.session.add(buku)
        for kat in kategori:
            ket = str(kat).lower().strip()
            kate = db.session.query(Kategori).filter_by(kategori=ket).first()
            if kate:
                kb = Kategori_Buku(id_buku=buku.id, id_kategori=kate.id)
                db.session.add(kb)
            else:
                k = Kategori(kategori=ket)
                kb = Kategori_Buku(id_buku=buku.id, id_kategori=k.id)
                db.session.add(k)
                db.session.add(kb)
        db.session.commit()
        return jsonify({'message' : 'buku berhasil ditambahkan', })
    except Exception as e:
        return jsonify({'message' : 'buku gagal ditambahkan', 'ex' : str(e), })

