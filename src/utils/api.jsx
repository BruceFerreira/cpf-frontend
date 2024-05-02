const BASE_URL = 'http://localhost:8080/api';

export const CLIENT_URL = `${BASE_URL}/client`;
export const CHECK_CPF_URL = (cpf) => `${BASE_URL}/client/checkCpf/${cpf}`;
export const REPORTS_URL = `${BASE_URL}/reports/generate`;
export const VIA_CEP_URL = (cep) => `https://viacep.com.br/ws/${cep}/json/`;
