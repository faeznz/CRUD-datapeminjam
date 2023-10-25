import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PeminjamList from './dataPeminjam/PeminjamList';
import PeminjamTambah from './dataPeminjam/PeminjamTambah';
import PeminjamEdit from './dataPeminjam/PeminjamEdit';

function MainRouter() {
  return (
    <Switch>
      <Route path="/peminjam" component={PeminjamList} />
      <Route path="/tambah-peminjam" component={PeminjamTambah} />
      <Route path="/edit-peminjam/:id" component={PeminjamEdit} />
    </Switch>
  );
}

export default MainRouter;
