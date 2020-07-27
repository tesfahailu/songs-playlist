function modelTSConstructor() {
  'use strict';
  const fs = require('fs');
  const args = require('yargs').argv;
  let name = args.name;
  let date = new Date();
  let dateStamp =
    date.toISOString().slice(0, 10).replace(/-/g, '') +
    date.toISOString().slice(11, 19).replace(/:/g, '');
  let tableName = name
    .replace(/(?:^|\.?)([A-Z])/g, (x, y) => {
      return '_' + y.toLowerCase();
    })
    .replace(/^_/, '');
  let fileName = name + '.ts';
  let attributes;
  let data = '';

  attributes = args.attributes.split(',').map((item) => {
    return item.split(':');
  });

  const columnAnnotation = '@Column';
  let types = attributes.map((type) => {
    if (type[1] === 'integer' || type[1] === 'real' || type[1] === 'bigint') {
      return `${columnAnnotation}\n  ${type[0]}: number;\n`;
    } else if (type[1] === 'date') {
      return `${columnAnnotation}\n  ${type[0]}: Date;\n`;
    } else {
      return `${columnAnnotation}\n  ${type[0]}: ${type[1]};\n`;
    }
  });

  let typeSequelizeConstructor = attributes.map((type) => {
    return `\n\t\t  ${type[0]
      .replace(/(?:^|\.?)([A-Z])/g, (x, y) => {
        return '_' + y.toLowerCase();
      })
      .replace(/^_/, '')}: { 
        type: Sequelize.${
          type[1] !== number ? type[1].toUpperCase() : 'INTEGER'
        },
        allowNull: false,
        unique: true,  
      }`;
  });

  let writeFirstStream = fs.createWriteStream(`./../src/db/models/${fileName}`);
  writeFirstStream.write(
    `import {
  Model,
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';

@Table({ tableName: '${tableName}', modelName: '${name}', underscored: true })
export class ${name} extends Model<${name}> {
  ${types.join('\n  ')}
  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}
  `,
  );

  let writeSecondStream = fs.createWriteStream(
    `./../src/db/migrations/${
      dateStamp + '-' + 'create' + '-' + tableName + '.js'
    }`,
  );
  writeSecondStream.write(`'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('${tableName}', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },${typeSequelizeConstructor.join(',')},
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        unique: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('${tableName}');
  },
};
`);
}

modelTSConstructor();
