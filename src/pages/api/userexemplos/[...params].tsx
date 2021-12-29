/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";

// JWT(STORAGE)
// NEXT AUTH(SOCIAL)
// COGNITO, AUTH0

export default (request: NextApiRequest, response: NextApiResponse) => {
  const id = request.query;

  const users = [{ nome: "samuel" }, { sobreNome: "santos" }];

  return response.json(users);
};

// CONSEITO DE SERVELESS
// ESSA ROTA VAI RECEBER TUDO QUE A PESSOA DIGITAR USA O (...) => (spread operator js)
// DEPOIS QUE MANDAR DE "USER"