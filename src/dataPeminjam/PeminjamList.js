import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const PeminjamList = () => {
  const [peminjamData, setPeminjamData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3001/peminjam')
      .then(response => response.json())
      .then(data => setPeminjamData(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/peminjam/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        fetchData();
      })
      .catch(error => console.error('Error deleting data:', error));
  };

  const handleEdit = (id) => {
    history.push(`/edit-peminjam/${id}`);
  }
  
  return (
    <div className='flex flex-col justify-center'>
      <h2>Daftar Peminjam</h2>
      <Link to='/tambah-peminjam'><button className='bg-sky-500 hover:bg-sky-700 rounded-full px-5 py-2'>Tambah</button></Link>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Nomor HP</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {peminjamData.map(peminjam => (
            <tr key={peminjam.id}>
              <td>{peminjam.nama}</td>
              <td>{peminjam.alamat}</td>
              <td>{peminjam.nomor_hp}</td>
              <td>
                <button onClick={() => handleEdit(peminjam.id)}>Edit</button>
                <button onClick={() => handleDelete(peminjam.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeminjamList;
