// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (todo instanceof Todo) {
    this.todos.push(todo);
    } else {
    throw new TypeError('can only add Todo objects');
    }
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) { // _ in name suggests a "private" method
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(item => item.isDone())
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }

  toString() {
    console.log(`---- Today's Todos ----`);
    let list = this.todos.map(item => item.toString()).join('\n');
    return list;
  }
  
  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(callback) {
    let newList = new TodoList(this.title);
    this.forEach(item => {
      if(callback(item)) newList.add(item);
    });

    return newList;
  }

  findByTitle(title) {
    let rtrnVal;
    this.forEach(item => {
      if (item.getTitle() === title) rtrnVal = item;
    });
    return rtrnVal;
  }

  allDone() {
    return this.filter(item => item.isDone());
  }

  allNotDone() {
    return this.filter(item => !item.isDone());
  }

  markDone(title) {
    if (this.findByTitle(title)) {
    this.findByTitle(title).markDone();
    }
  }

  markUndone(title) {
    if (this.findByTitle(title)) {
      this.findByTitle(title).markUndone();
      }
  }

  markAllDone() {
    this.forEach(item => this.markDone(item.getTitle()));
  }

  markAllUndone() {
    this.forEach(item => this.markUndone(item.getTitle()));
  }

  toArray() {
    return this.todos.map(item => item);
  }
}

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);

list.markAllUndone();
console.log(`${list}`);