--1234--
INSERT INTO users (id, nama, username, password, level, telepon)
VALUES (
    'UR000000000',
    'admin',
    'admin',
    'scrypt:32768:8:1$imxF4bXAbVd205UO$985cc839ba4d90626ddda6bddb89eb33ce9aac931ab19875d6348fed480703464a912745379f15f381ec0448a35aab215859b9cc93fcc85ccba27325603965ee',
    'pegawai',
    '000000000000'
);

INSERT INTO kategori (id, kategori) VALUES
(1, 'fiksi'),
(2, 'sains'),
(3, 'teknologi');