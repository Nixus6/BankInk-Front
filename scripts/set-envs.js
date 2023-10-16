const {writeFileSync, mkdirSync} = require('fs');
require('dotenv').config();
const targetPath = './src/environments/environment.ts';

const envFileContent = `
export const environment ={
  KEY: "${process.env['KEY']}",
  BASE_URL: "${process.env['BASE_URL']}",
  URL_FAKESTOREAPI:"${process.env['URL_FAKESTOREAPI']}",
  URL_PRODUCTS_PLATZIAPI:"${process.env['URL_PRODUCTS_PLATZIAPI']}"
};
`;
mkdirSync('/src/environments', {recursive: true});

writeFileSync(targetPath, envFileContent)

