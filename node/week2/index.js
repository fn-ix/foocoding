'use strict';

const fs = require('fs');
const { program } = require('commander');

const list = require('./list');
const add = require('./add');
const remove = require('./remove');
const reset = require('./reset');
const update = require('./update');

const todoFile = './src/todo.json';

program
  .name('index.js')
  .description('A simple command-line to-do list manager')
  .option('--list', 'show the to-do list')
  .option('--add [items]', 'add item(s) to the list')
  .option('--update <index> [item]', 'overwrite the item at the specified index')
  .option('--remove <index>', 'remove the item at the specified index')
  .option('--reset', 'empty the to-do list');

program.parse();

const options = program.opts();

let chunks = '';
const readStream = fs.createReadStream(todoFile, 'utf-8');

readStream.on('data', (chunk) => {
  chunks += chunk;
});
readStream.once('end', processCommand);

function processCommand() {
  const todoList = chunks ? JSON.parse(chunks) : [];

  if (options.list) list(todoList);
  if (options.add) add(todoList, todoFile, options.add, program.args);
  if (options.update) update(todoList, todoFile, Number(options.update), program.args);
  if (options.remove) remove(todoList, todoFile, Number(options.remove));
  if (options.reset) reset(todoList, todoFile);
}

if (!process.argv[2]) program.help();