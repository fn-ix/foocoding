const fs = require('fs');

module.exports = (todoList, todoFile, item) => {
  if ((item - 1) > todoList.length || item < 1) {
    console.log('there is no such todo!');
  }
  else {
    todoList.splice((item - 1), 1);
    const writeStream = fs.createWriteStream(todoFile);
    writeStream.write(JSON.stringify(todoList), 'utf-8');
    writeStream.end();
  }
};
