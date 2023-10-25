const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'peminjamanalat'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.get('/peminjam', (req, res) => {
   db.query('SELECT * FROM peminjam', (err, results) => {
     if (err) {
       res.status(500).json({ message: 'Gagal mengambil data peminjam' });
     } else {
       res.status(200).json(results);
     }
   });
});

app.get('/peminjam/:id', (req, res) => {
   const peminjamId = req.params.id;
   
   db.query('SELECT * FROM peminjam WHERE id = ?', peminjamId, (err, result) => {
     if (err) {
       res.status(500).json({ message: 'Gagal mengambil data peminjam' });
     } else {
       if (result.length === 0) {
         res.status(404).json({ message: 'Peminjam tidak ditemukan' });
       } else {
         res.status(200).json(result[0]);
       }
     }
   });
 });
 

app.post('/peminjam', (req, res) => {
   const { nama, alamat, nomor_hp } = req.body;
   db.query(
     'INSERT INTO peminjam (nama, alamat, nomor_hp) VALUES (?, ?, ?)',
     [nama, alamat, nomor_hp],
     (err, result) => {
       if (err) {
         res.status(500).json({ message: 'Gagal menambahkan peminjam' });
       } else {
         res.status(201).json({ message: 'Peminjam berhasil ditambahkan' });
       }
     }
   );
});
 
app.delete('/peminjam/:id', (req, res) => {
  const peminjamId = req.params.id;
  db.query('DELETE FROM peminjam WHERE id = ?', peminjamId, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Gagal menghapus peminjam' });
    } else {
      res.status(200).json({ message: 'Peminjam berhasil dihapus' });
    }
  });
});

app.put('/peminjam/:id', (req, res) => {
   const peminjamId = req.params.id;
   const { nama, alamat, nomor_hp } = req.body;
   
   db.query(
     'UPDATE peminjam SET nama = ?, alamat = ?, nomor_hp = ? WHERE id = ?',
     [nama, alamat, nomor_hp, peminjamId],
     (err, result) => {
       if (err) {
         res.status(500).json({ message: 'Gagal memperbarui peminjam' });
       } else {
         res.status(200).json({ message: 'Peminjam berhasil diperbarui' });
       }
     }
   );
});
 


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
