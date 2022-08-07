module.exports = (todoList) => {
  if (todoList.length === 0) {
    console.log('no todos');
  }
  else {
    console.log(todoList.join('\n'));
  }
};
