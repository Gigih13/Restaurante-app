import React from 'react';

import ListagemCargos from './views/listagem-cargos';
import ListagemFuncionarios from './views/listagem-funcionarios';
import ListagemMesas from './views/listagem-mesas';
import ListagemReservas from './views/listagem-reservas';
import ListagemCardapio from './views/listagem-cardapio';

import CadastroCargos from './views/cadastro-cargos';
import CadastroReservas from './views/cadastro-reservas';
import CadastroMesas from './views/cadastro-mesas';
import CadastroCardapio from './views/cadastro-cardapio';



import { Route, Routes, BrowserRouter } from 'react-router-dom';


function Rotas(props) {
  return (
    <BrowserRouter>
    <Routes>
   
        <Route path='/listagem-cargos' element={<ListagemCargos />} />

          <Route path='/cadastro-cargos/:idParam?' element={<CadastroCargos />} />

         <Route
          path='/listagem-funcionarios' element={<ListagemFuncionarios />}/>
        

         <Route path='/listagem-cardapio' element={<ListagemCardapio />} />

         <Route path='/cadastro-cardapio/:idParam?' element={<CadastroCardapio />} />

         <Route path='/listagem-mesas' element={<ListagemMesas />} />

         <Route path='/cadastro-mesas/:idParam?' element={<CadastroMesas />} />

         <Route path='/listagem-reservas' element={<ListagemReservas />} />

          <Route path='/cadastro-reservas/:idParam?' element={<CadastroReservas />} />

       

         



       </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
