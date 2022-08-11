'use strict';

async function deserializeTodo(request) {
  const { todo } = request.body;
  if (todo == null)
    throw new Error('todo not set');

  if (todo.description != null)
    todo.description = todo.description.trim();

  // moved the below error handler to updateTodo.js & createTodo.js as it's not relevant when deserializeTodo() gets called by patchTodo()
  // if (todo.description == null || todo.description.length === 0)
  //   throw new Error('description not set');

  return todo;
};

module.exports = deserializeTodo;
