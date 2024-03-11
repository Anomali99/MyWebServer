from config import db
from datetime import date, datetime
from .kategori_buku import Kategori_Buku 
from .kategori import Kategori


def getNomerBuku() -> str:
    now = date.today()
    bk = db.session.query(Buku).order_by(Buku.id.desc()).first()
    if bk:
        no = int(bk.id[-3:]) + 1
        return f'BK{now.strftime("%y%m%d")}{no:03d}'
    else:
        return f'BK{now.strftime("%y%m%d")}{1:03d}'

def coverName(filename:str) -> str:
    # idUser = session.get('id')
    now = datetime.now().strftime("%y%m%d%H%M%S")
    # name = "{}{}.{}".format(idUser, now, filename.filename.rsplit('.',1)[1])
    name = "{}.{}".format(now, filename.rsplit('.',1)[1])
    return name

class Buku(db.Model):
    __tablename__ = 'buku'
    id = db.Column(db.String(11), primary_key=True, default=getNomerBuku)
    judul = db.Column(db.String(50), nullable=False)
    sinopsis = db.Column(db.String(), nullable=False)
    harga = db.Column(db.Integer, nullable=False)
    stok = db.Column(db.Integer, nullable=False)
    cover = db.Column(db.String(25), nullable=False)
    tanggal = db.Column(db.Date, default=date.today())
    kategori = db.relationship('Kategori_Buku', backref='buku', lazy=True) 
    reting = db.relationship('Reting', backref='buku', lazy=True) 
    transaksi = db.relationship('Detail_Transaksi', backref='buku', lazy=True) 

    def __init__(self, judul:str, sinopsis:str, harga:int, stok:int, filename:str):
        self.id = getNomerBuku()
        self.judul = judul
        self.sinopsis = sinopsis
        self.harga = harga
        self.stok = stok
        self.cover = coverName(filename)

    def kategori(self):
        bk = db.session.query(Kategori, Kategori_Buku).join(Kategori_Buku, Kategori.id == Kategori_Buku.id_kategori).filter(Kategori_Buku.id_buku==self.id)
        kategori = [k.Kategori.kategori for k in bk]
        return kategori

    def json(self):
        return {
            'id' : self.id,
            'judul' : self.judul,
            'sinopsis' : self.sinopsis,
            'harga' : self.harga,
            'stok' : self.stok,
            'cover' : self.cover,
            'tanggal' : self.tanggal,
            'kategori' : self.kategori()
        }