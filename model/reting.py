from config import db
from datetime import date
from model.users import Users

def getNomerReting() -> int:
    bk = db.session.query(Reting).order_by(Reting.id.desc()).first()
    if bk:
        return int(bk.id) + 1
    else:
        return 1

class Reting(db.Model):
    __tablename__ = 'reting'
    id = db.Column(db.Integer, primary_key=True, default=getNomerReting)
    nilai = db.Column(db.Integer, nullable=False)
    komentar = db.Column(db.String(), nullable=True)
    tanggal = db.Column(db.Date, default=date.today())
    id_buku  = db.Column(db.String(11), db.ForeignKey('buku.id'), nullable=False)
    id_user  = db.Column(db.String(11), db.ForeignKey('users.id'), nullable=False)

    def __init__(self, id_user:str, id_buku:str, komentar:str, nilai:int):
        self.id = getNomerReting()
        self.nilai = nilai
        self.komentar = komentar
        self.tanggal = date.today()
        self.id_buku = id_buku 
        self.id_user = id_user 

    def json(self):
        return {
            'id' : self.id,
            'nilai' : self.nilai,
            'komentar' : self.komentar,
            'tanggal' : self.tanggal.strftime("%d-%m-%Y"),
            'id_buku' : self.id_buku, 
            'id_users' : self.id_user 
        }
