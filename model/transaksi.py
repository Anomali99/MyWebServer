from config import db
from datetime import date, datetime
from .detail_transaksi import Detail_Transaksi
from .users import Users

def getNomerTransaksi():
    now = date.today()
    bk = db.session.query(Transaksi).order_by(Transaksi.id.desc()).first()
    if bk:
        no = int(bk.id[-3:]) + 1
        return f'TR{now.strftime("%y%m%d")}{no:03d}'
    else:
        return f'TR{now.strftime("%y%m%d")}{1:03d}'

class Transaksi(db.Model):
    __tablename__ = 'transaksi'
    id = db.Column(db.String(11), primary_key=True, default=getNomerTransaksi)
    total = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(12), nullable=True, default='belum bayar')
    tanggal = db.Column(db.Date, default=date.today())
    waktu = db.Column(db.Time, default=datetime.now().time())
    id_user  = db.Column(db.String(11), db.ForeignKey('users.id'), nullable=False)
    detail = db.relationship('Detail_Transaksi', backref='transaksi', lazy=True) 

    def __init__(self, total:int, id_user:str, status:str=None):
        self.id = getNomerTransaksi()
        self.total = total
        self.tanggal = date.today()
        self.waktu = datetime.now().time()
        self.id_user  =id_user
        if status:
            self.status = status
        else:
            self.status = 'belum bayar'

    def getDetail(self):
        det = db.session.query(Detail_Transaksi).filter(Detail_Transaksi.id_transaksi==self.id).all()
        data = [d.json() for d in det]
        return data

    def json(self):
        return {
            'id' : self.id,
            'total' : self.total,
            'status' : self.status,
            'tanggal' : self.tanggal.strftime("%d-%m-%Y"),
            'waktu' : self.waktu.strftime('%H:%M:%S'),
            'id_user' : self.id_user,
            'detail' : self.getDetail()
        }
