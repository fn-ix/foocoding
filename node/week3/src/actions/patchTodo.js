'use strict';

const deserializeTodo = require('./deserializeTodo');

function patchTodo(todo, request, response) {
  deserializeTodo(request, response)
    .then(({ description, done }) => {
      if (description == null && done == null) throw new Error('description and done not set');
      if (typeof description === 'string' && description.length === 0) throw new Error('description not set');
      if (done != null && typeof done != 'boolean') throw new Error('done not set');

      const id = request.params.id;
      return todo.patch(id, description, done);
    })
    .then(todo => {
      response.status(200);
      response.json({ todo });
    })
    .catch(({ message, code }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
};

module.exports = patchTodo;
