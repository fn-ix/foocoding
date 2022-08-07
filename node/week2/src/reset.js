const fs = require('fs');

module.exports = (todoList, todoFile) => {
  todoList.length = 0;
  const writeStream = fs.createWriteStream(todoFile);
  writeStream.write(JSON.stringify(todoList), 'utf-8');
  writeStream.end();
};
