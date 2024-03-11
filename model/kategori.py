from config import db



def getNomerKategori() -> int:
    bk = db.session.query(Kategori).order_by(Kategori.id.desc()).first()
    if bk:
        return int(bk.id) + 1
    else:
        return 1
    

class Kategori(db.Model):
    __tablename__ = 'kategori'
    id = db.Column(db.Integer, primary_key=True)
    kategori = db.Column(db.String(100), nullable=False)
    buku = db.relationship('Kategori_Buku', backref='kategori', lazy=True) 

    def __init__(self, kategori:str):
        self.id = getNomerKategori()
        self.kategori = kategori

    def json(self):
        return {
            'id' : self.id,
            'kategori' : self.kategori
        }