import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const PeminjamTambah = () => {
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    nomor_hp: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/peminjam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        history.push('/peminjam');
      })
      .catch((error) => console.error('Error adding data:', error));
  };

  return (
    <div>
      <h2>Tambah Peminjam Baru</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nama:
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Alamat:
          <input
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Nomor HP:
          <input
            type="text"
            name="nomor_hp"
            value={formData.nomor_hp}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Tambah Peminjam</button>
      </form>
    </div>
  );
};

export default PeminjamTambah;
