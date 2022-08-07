const fs = require('fs');

module.exports = (todoList, todoFile, index, item) => {
  if (index - 1 > todoList.length || index < 1) {
    console.log('there is no such todo!');
  }
  else {
    todoList[(index - 1)] = item[0];
    const writeStream = fs.createWriteStream(todoFile);
    writeStream.write(JSON.stringify(todoList), 'utf-8');
    writeStream.end();
  }
};
