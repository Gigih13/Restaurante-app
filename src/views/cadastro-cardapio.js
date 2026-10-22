import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroCardapio() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/itensCardapio`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');


  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setCategoria('');
      setPreco('');
      
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setCategoria(dados.categoria);
      setPreco(dados.preco);
     
    }
  }

  async function salvar() {
    let data = {
      id,
      nome,
      categoria,
      preco,
      
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Cardapio ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-cardapio`);
        })
       .catch(function (error) {
  
  mensagemErro(JSON.stringify(error.response.data));
});
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Cardápio ${nome} alterado com sucesso!`);
          navigate(`/listagem-cardapio`);
        })
        .catch(function (error) {

  mensagemErro(JSON.stringify(error.response.data));
});
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setNome(dados.nome);
    setCategoria(dados.categoria);
    setPreco(dados.preco);
   
  }

 useEffect(() => {
  if (idParam != null) {
    buscar();
  }
  // eslint-disable-next-line
}, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Cardápio'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              
        
              <FormGroup label='Nome: *' htmlFor='inputnome'>
                <input
                  type='text'
                  id='inputnome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>

             <FormGroup label='Categoria: *' htmlFor='selectCategoria'>
  <select
    id='selectCategoria'
    value={categoria}
    className='form-select'
    name='categoria'
    onChange={(e) => setCategoria(e.target.value)}
  >
    <option value=''>Selecione...</option>
    <option value='Entrada'>Entrada</option>
    <option value='Prato Principal'>Prato Principal</option>
    <option value='Sobremesa'>Sobremesa</option>
    <option value='Bebida'>Bebida</option>
  </select>
</FormGroup>

              <FormGroup label='Preço: *' htmlFor='inputPreco'>
                <input
                  type='text'
                  id='inputPreco'
                  value={preco}
                  className='form-control'
                  name='preco'
                  onChange={(e) => setPreco(e.target.value)}
                />
              </FormGroup>

              
              
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroCardapio;
