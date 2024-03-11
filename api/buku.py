from . import api
from model.buku import Buku
from model.kategori import Kategori
from model.kategori_buku import Kategori_Buku
from model.reting import Reting
from config import db
from flask import jsonify, request


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

@api.route('/buku/<id>', methods=['GET'])
def buku(id):
    buku = db.session.query(Buku).filter_by(id=id).first()
    if buku:
        return jsonify(buku.json())
    else:
        return  jsonify({'message' : 'tidak ada buku'})

@api.route('/buku/add', methods=['POST'])
def addBuku():
    judul =  request.json['judul']
    sinopsis =  request.json['sinopsis']
    harga =  int(request.json['harga'])
    stok =  int(request.json['stok'])
    cover =  request.json['cover']
    kategori = request.json['kategori']
    try:
        buku = Buku(judul=judul, sinopsis=sinopsis, harga=harga, stok=stok, filename=cover)
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

