const {writeFileSync, mkdirSync} = require('fs');
require('dotenv').config();
const targetPath = './src/environments/environment.ts';

const envFileContent = `
export const environment ={
  KEY: "${process.env['KEY']}",
  BASE_URL: "${process.env['BASE_URL']}",
  URL_FAKESTOREAPI:"${process.env['URL_FAKESTOREAPI']}"
};
`;
mkdirSync('/src/environments', {recursive: true});

writeFileSync(targetPath, envFileContent)

