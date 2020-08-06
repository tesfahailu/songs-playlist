require('dotenv').config();
const fs = require('fs');
const colors = require('colors');
const targetPath = './src/environments/environment.ts';
const targetProdPath = './src/environments/environment.prod.ts';
const envConfigFile = `export const env = {
    production: false,
    serverURI: '${process.env.SERVER_URI}',
    graphqlPath: '${process.env.GRAPHQL_PATH}',
    refreshTokenPath: '${process.env.REFRESH_TOKEN_PATH}'
};`;
const envConfigProdFile = `export const env = {
    production: true,
    serverURI: '${process.env.SERVER_URI}',
    graphqlPath: '${process.env.GRAPHQL_PATH}',
    refreshTokenPath: '${process.env.REFRESH_TOKEN_PATH}'
};`;

console.log(
  colors.magenta(
    'The file `environment.ts` will be written with the following content: \n',
  ),
);
console.log(colors.grey(envConfigFile));
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      colors.magenta(
        `React environment.ts file generated correctly at ${targetPath} \n`,
      ),
    );
  }
});
console.log(
  colors.magenta(
    'The file `environment.prod.ts` will be written with the following content: \n',
  ),
);
console.log(colors.grey(envConfigProdFile));
fs.writeFile(targetProdPath, envConfigProdFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      colors.magenta(
        `React environment.prod.ts file generated correctly at ${targetProdPath} \n`,
      ),
    );
  }
});
