from config import db

def getNomerKategoriB() -> int:
    bk = db.session.query(Kategori_Buku).order_by(Kategori_Buku.id.desc()).first()
    if bk:
        return int(bk.id) + 1
    else:
        return 1
    

class Kategori_Buku(db.Model):
    __tablename__ = 'kategori_buku'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_buku  = db.Column(db.String(11), db.ForeignKey('buku.id'), nullable=False)
    id_kategori  = db.Column(db.Integer, db.ForeignKey('kategori.id'), nullable=False)

    def __init__(self, id_buku:str, id_kategori:str):
        self.id = getNomerKategoriB()
        self.id_buku = id_buku
        self.id_kategori = id_kategori

    def json(self):
        return {
            'id' : self.id,
            'id_kategori' : self.id_kategori,
            'id_buku' : self.id_buku
        }