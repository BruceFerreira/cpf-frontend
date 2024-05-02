import React, { useState, useEffect } from 'react';
import { CLIENT_URL, CHECK_CPF_URL, REPORTS_URL, VIA_CEP_URL } from '../../utils/api'
import CustomTextField from '../../components/TextField/TextField';
import CustomButton from '../../components/Button/Button';
import axios from 'axios';
import styled from 'styled-components';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const Background = styled.div`
  background: linear-gradient(to bottom right, #4e54c8, #8f94fb);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const AddPersonForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const FormTitle = styled.h2`
  grid-column: span 2;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledCustomButton = styled(CustomButton)`
  grid-column: span 2;
`;

const AlertBox = styled(Box)`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const AddPerson = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cpf: '',
    address: '',
    number: '',
    complement: '',
    zipCode: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const [cpfExistsAlert, setCpfExistsAlert] = useState(false);
  const [cadastroSuccess, setCadastroSuccess] = useState(false);
  const [cep, setCep] = useState('');
  const [emptyFieldsAlert, setEmptyFieldsAlert] = useState(false);

  useEffect(() => {
    if (cpfExistsAlert) {
      const timer = setTimeout(() => {
        setCpfExistsAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [cpfExistsAlert]);

  useEffect(() => {
    if (cadastroSuccess) {
      const timer = setTimeout(() => {
        setCadastroSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [cadastroSuccess]);

  useEffect(() => {
    if (emptyFieldsAlert) {
      const timer = setTimeout(() => {
        setEmptyFieldsAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [emptyFieldsAlert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verifica se todos os campos estão preenchidos
    const emptyFields = Object.keys(formData).filter(key => !formData[key]);
    if (emptyFields.length > 0) {
      setEmptyFieldsAlert(true);
      return;
    }
    
    try {
      const cpfExists = await checkIfCpfExists(formData.cpf);
      if (cpfExists) {
        setCpfExistsAlert(true);
        return;
      }
      const response = await axios.post(CLIENT_URL, formData);
      console.log(response.data);
      setCadastroSuccess(true);
      clearForm();
      generateReport();
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  const handleCEPChange = async (event) => {
    const newCEP = event.target.value.replace(/[^0-9]/g, '');
    setCep(newCEP);

    if (newCEP.length === 8) {
      try {
        const response = await axios.get(VIA_CEP_URL(newCEP));
        const { data } = response;
        if (!data.erro) {
          setFormData({
            ...formData,
            zipCode: newCEP,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          });
        }
      } catch (error) {
        console.error('Error fetching CEP data:', error);
      }
    }else {
      setFormData({
        ...formData,
        zipCode: newCEP
      });
    }
  };

  const checkIfCpfExists = async (cpf) => {
    try {
      const response = await axios.get(CHECK_CPF_URL(cpf));
      return response.data.exists;
    } catch (error) {
      console.error('Erro ao verificar CPF:', error);
      throw error;
    }
  };

  const clearForm = () => {
    setFormData({
      name: '',
      phone: '',
      cpf: '',
      address: '',
      number: '',
      complement: '',
      zipCode: '',
      neighborhood: '',
      city: '',
      state: ''
    });
    setCep('');
  };

  const generateReport = async () => {
    try {
      await axios.post(REPORTS_URL);
    } catch (error) {
      console.error('Erro ao gerar o relatório:', error);
    }
  };

  return (
    <Background>
      <Content>
        <FormTitle>Cadastro de Pessoa Física</FormTitle>
        <AddPersonForm onSubmit={handleSubmit}>
          <CustomTextField label="Nome" name="name" value={formData.name} onChange={handleChange} />
          <CustomTextField label="Telefone" name="phone" value={formData.phone} onChange={handleChange} />
          <CustomTextField label="CPF" name="cpf" value={formData.cpf} mask="999.999.999-99" onChange={handleChange} />
          <CustomTextField label="Endereço" name="address" value={formData.address} onChange={handleChange} />
          <CustomTextField label="Número" name="number" value={formData.number} onChange={handleChange} />
          <CustomTextField label="Complemento" name="complement" value={formData.complement} onChange={handleChange} />
          <CustomTextField label="CEP" name="cep" value={cep} onChange={handleCEPChange} />
          <CustomTextField label="Bairro" name="neighborhood" value={formData.neighborhood} onChange={handleChange} />
          <CustomTextField label="Nome do Município" name="city" value={formData.city} onChange={handleChange} />
          <CustomTextField label="Nome do Estado" name="state" value={formData.state} onChange={handleChange} />
          <StyledCustomButton label="Cadastrar" type="submit"/>
        </AddPersonForm>
        {cpfExistsAlert && (
          <AlertBox>
            <Alert severity="error" onClose={() => setCpfExistsAlert(false)}>
              CPF já cadastrado!
            </Alert>
          </AlertBox>
        )}
        {cadastroSuccess && (
          <AlertBox>
            <Alert severity="success" onClose={() => setCadastroSuccess(false)}>
              Pessoa cadastrada com sucesso!
            </Alert>
          </AlertBox>
        )}
        {emptyFieldsAlert && (
          <AlertBox>
            <Alert severity="error" onClose={() => setEmptyFieldsAlert(false)}>
              Por favor, preencha todos os campos.
            </Alert>
          </AlertBox>
        )}
      </Content>
    </Background>
  );
}

export default AddPerson;
