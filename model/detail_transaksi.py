from config import db
from datetime import date, time
from .buku import Buku

def getNomerDetail() -> int:
    bk = db.session.query(Detail_Transaksi).order_by(Detail_Transaksi.id.desc()).first()
    if bk:
        return int(bk.id) + 1
    else:
        return 1

class Detail_Transaksi(db.Model):
    __tablename__ = 'detail_transaksi'
    id = db.Column(db.Integer, primary_key=True, default=getNomerDetail)
    subtotal = db.Column(db.Integer, nullable=False)
    jumlah = db.Column(db.Integer, nullable=False)
    id_buku  = db.Column(db.String(11), db.ForeignKey('buku.id'), nullable=False)
    id_transaksi  = db.Column(db.String(11), db.ForeignKey('transaksi.id'), nullable=False)

    def __init__(self, subtotal:int, jumlah:int, id_buku:str, id_transaksi:str):
        self.id = getNomerDetail()
        self.subtotal = subtotal
        self.jumlah = jumlah
        self.id_buku = id_buku
        self.id_transaksi = id_transaksi

    def json(self):
        return {
            'id' : self.id,
            'subtotal' : self.subtotal,
            'jumlah' : self.jumlah,
            'id_buku' : self.id_buku,
            'id_transaksi' : self.id_transaksi
        }
