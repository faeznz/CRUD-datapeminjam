import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

const EditPeminjam = () => {
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    nomor_hp: ''
  });
  const { id } = useParams();
  const history = useHistory();

  const fetchData = useCallback(() => {
    fetch(`http://localhost:3001/peminjam/${id}`)
      .then(response => response.json())
      .then(data => setFormData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/peminjam/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        history.push('/peminjam'); 
      })
      .catch(error => console.error('Error updating data:', error));
  };

  return (
    <div>
      <h2>Edit Peminjam</h2>
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
        <button type="submit">Simpan Perubahan</button>
        <Link to='/peminjam'><button>Cancel</button></Link>
      </form>
    </div>
  );
};

export default EditPeminjam;
