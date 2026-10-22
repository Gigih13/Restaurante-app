import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

//import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroReservas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/reservas`;

  const [id, setId] = useState('');
  const [nomeCliente, setNome] = useState('');
  const [telefoneContato, setTelefone] = useState('');
  const [dataReserva, setDataR] = useState('');
  const [idMesa, setMesa] = useState('');
  const [horario, setHorario] = useState('');
  const [quantidadePessoas, setPessoas] = useState('');
  


  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setTelefone('');
    setDataR('');
    setMesa('');
     setHorario('');
     setPessoas('');
      
    } else {
      setId(dados.id);
      setNome(dados.nomeCliente);
      setTelefone(dados.telefoneContato);
      setDataR(dados.dataReserva);
      setMesa(dados.idMesa);
      setHorario(dados.horario);
      setPessoas(dados.quantidadePessoas);
     
    }
  }

  async function salvar() {
    let data = {
      id,
      nomeCliente,
      telefoneContato,
      dataReserva,
      idMesa,
      horario,
      quantidadePessoas,
      
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Reserva ${nomeCliente} cadastrada com sucesso!`);
          navigate(`/listagem-reservas`);
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
          mensagemSucesso(`Reserva ${nomeCliente} alterada com sucesso!`);
          navigate(`/listagem-reservas`);
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
    setNome(dados.nomeCliente);
    setTelefone(dados.telefoneContato);
    setDataR(dados.dataReserva);
     setMesa(dados.idMesa);
     setHorario(dados.horario);
     setPessoas(dados.quantidadePessoas);
   
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
      <Card title='Cadastro de Reservas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              
        
              <FormGroup label='Cliente: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nomeCliente}
                  className='form-control'
                  name='nomeCliente'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>

               <FormGroup label='Telefone: *' htmlFor='inputTelefone'>
                <input
                  type='text'
                  id='inputTelefone'
                  value={telefoneContato}
                  className='form-control'
                  name='telefone'
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </FormGroup>

                <FormGroup label='Data: *' htmlFor='inputDataR'>
                <input
                  type='text'
                  id='inputData'
                  value={dataReserva}
                  className='form-control'
                  name='datar'
                  onChange={(e) => setDataR(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Mesa: *' htmlFor='inputMesa'>
                <input
                  type='text'
                  id='inputMesa'
                  value={idMesa}
                  className='form-control'
                  name='mesa'
                  onChange={(e) => setMesa(e.target.value)}
                />
              </FormGroup>

                <FormGroup label='Horario: *' htmlFor='inputHorario'>
                <input
                  type='text'
                  id='inputHorario'
                  value={horario}
                  className='form-control'
                  name='horario'
                  onChange={(e) => setHorario(e.target.value)}
                />
              </FormGroup>

               <FormGroup label='Quantidade de Pessoas: *' htmlFor='inputPessoas'>
                <input
                  type='text'
                  id='inputPessoas'
                  value={quantidadePessoas}
                  className='form-control'
                  name='pessoas'
                  onChange={(e) => setPessoas(e.target.value)}
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

export default CadastroReservas;