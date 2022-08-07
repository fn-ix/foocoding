const fs = require('fs');

module.exports = (todoList, todoFile, item, arr) => {
  todoList.push(item);
  const newtodoList = todoList.concat(arr);
  const writeStream = fs.createWriteStream(todoFile);
  writeStream.write(JSON.stringify(newtodoList), 'utf-8');
  writeStream.end();
};
