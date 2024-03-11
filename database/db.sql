DROP DATABASE IF EXISTS bukuku;
CREATE DATABASE bukuku;

\c bukuku;

CREATE TABLE IF NOT EXISTS users (
    id varchar(11) PRIMARY KEY,
    nama varchar(50) not null,
    username varchar(50) not null,
    password varchar(162) not null,
    level varchar(7) not null default 'user',
    telepon varchar(13)
);

CREATE TABLE IF NOT EXISTS buku (
    id varchar(11) PRIMARY KEY,
    judul varchar(50) not null,
    sinopsis text not null,
    harga int not null,
    stok int not null,
    cover varchar(25) not null,
    tanggal date DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS kategori (
    id int PRIMARY KEY,
    kategori varchar(100) not null
);

CREATE TABLE IF NOT EXISTS reting (
    id int PRIMARY KEY,
    nilai int not null,
    komentar text,
    tanggal date DEFAULT CURRENT_DATE,
    id_user varchar(11) REFERENCES users(id), 
    id_buku varchar(11) REFERENCES buku(id)
);

CREATE TABLE IF NOT EXISTS kategori_buku (
    id int PRIMARY KEY,
    id_buku varchar(11) REFERENCES buku(id),
    id_kategori int REFERENCES kategori(id)
);

CREATE TABLE IF NOT EXISTS transaksi (
    id varchar(11) PRIMARY KEY,
    total int not null,
    status varchar(12),
    waktu time DEFAULT CURRENT_TIME,
    tanggal date DEFAULT CURRENT_DATE,
    id_user varchar(11) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS detail_transaksi (
    id int PRIMARY KEY,
    subtotal int not null,
    jumlah int not null,
    id_transaksi varchar(11) REFERENCES transaksi(id),
    id_buku varchar(11) REFERENCES buku(id)
);