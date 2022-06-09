const tasksContainer = document.getElementById('tasksList');

const task1 = new Task('task1', 'Sa termin drag&drop de implementat');
task1.render(tasksContainer);

const task2 = new Task('task2', 'alt task important');
task2.render(tasksContainer);

const task3 = new Task('task3', 'Imi plac gogosile');
task3.render(tasksContainer);

let dragItem = null;

const tasks = document.querySelectorAll('.task');

function dragStart() {
  console.log('drag started');
  dragItem = this;
  setTimeout(() => this.classList.add('faded'), 0);
}

function dragEnd() {
  console.log('drag ended');
  this.classList.remove('faded');
  dragItem = null;
}

tasks.forEach((task) => {
  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragend', dragEnd);
});

// container area
function dragOver(e) {
  e.preventDefault();
  console.log('drag over');
}
function dragEnter(e) {
  console.log('drag entered');
  if (e.target.classList.contains('droppableZone')) {
    e.target.style.background = 'red';
    e.target.style.opacity = 1;
  }
}
function dragLeave(e) {
  console.log('drag left');
  if (e.target.classList.contains('droppableZone')) e.target.style.opacity = 0;
}
function dragDrop(e) {
  console.log('drag dropped');
  if (e.target.classList.contains('droppableZone')) e.target.style.opacity = 0;
  this.append(dragItem);
}

tasksContainer.addEventListener('dragover', dragOver);
tasksContainer.addEventListener('dragenter', dragEnter);
tasksContainer.addEventListener('dragleave', dragLeave);
tasksContainer.addEventListener('drop', dragDrop);

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function addDroppableZones() {
  const children = document.querySelectorAll('.tasksList > *');
  let dropZone = document.createElement('div');
  dropZone.classList.add('droppableZone');

  children.forEach((c) => insertAfter(dropZone, c));
}

addDroppableZones();
