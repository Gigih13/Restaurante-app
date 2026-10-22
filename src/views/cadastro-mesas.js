import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroMesas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/mesas`;

  const [id, setId] = useState('');
  const [numero, setNumero] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [status, setStatus] = useState('Livre');


  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNumero('');
      setCapacidade('');
      setStatus('Livre');
      
    } else {
      setId(dados.id);
      setNumero(dados.numero);
      setCapacidade(dados.capacidade);
      setStatus(dados.status);
     
    }
  }

  async function salvar() {
    let data = {
      id,
      numero,
      capacidade,
      status,
      
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Mesa ${numero} cadastrada com sucesso!`);
          navigate(`/listagem-mesas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Mesa ${numero} alterada com sucesso!`);
          navigate(`/listagem-mesas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setNumero(dados.numero);
    setCapacidade(dados.capacidade);
    setStatus(dados.status);
   
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
      <Card title='Cadastro de Mesas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              
        
              <FormGroup label='Número: *' htmlFor='inputNumero'>
                <input
                  type='text'
                  id='inputNumero'
                  value={numero}
                  className='form-control'
                  name='numero'
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Capacidade: *' htmlFor='inputCapacidade'>
                <input
                  type='text'
                  id='inputCapacidade'
                  value={capacidade}
                  className='form-control'
                  name='capacidade'
                  onChange={(e) => setCapacidade(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Status: *' htmlFor='selectStatus'>
                <select
                  type='text'
                  id='selectStatus'
                  value={status}
                  className='form-select'
                  name='status'
                  onChange={(e) => setStatus(e.target.value)}
                >

                    <option value='Livre'>Livre</option>
                    <option value='Reservado'>Reservado</option>
                    <option value='Ocupado'>Ocupado</option>
                </select>
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

export default CadastroMesas;