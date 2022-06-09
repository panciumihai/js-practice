let TASKS_MOCK = [
  '1. Plimba catelul',
  '2. Cumpara paine',
  '3. Mergi la sala',
  '4. Curatenie',
];

const SPACE_BETWEEN = 30;

let tasks = [];
let dropAreas = [];
let currentTask = null;
let currentDropArea = null;

const container = document.getElementById('taskList');
const containerOffset = container.getBoundingClientRect();

function arrayMove(arr, old_index, new_index) {
  console.log(old_index + ' -> ' + new_index);
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

const generateTasks = (taskNames) => {
  for (let i = 0; i < taskNames.length; i++) {
    let currentY = SPACE_BETWEEN;
    if (i > 0) {
      currentY = SPACE_BETWEEN + (tasks[i - 1].height + SPACE_BETWEEN) * i;
    }
    const task = new Task(i, taskNames[i], 50, currentY);

    task.onMouseDown = mouseDown;
    task.onCloneMove = mouseMove;
    task.onMouseUp = mouseUp;

    tasks.push(task);
  }
};

const updateTasks = (tasks) => {
  for (let i = 0; i < tasks.length; i++) {
    let currentY = SPACE_BETWEEN;
    if (i > 0) {
      currentY = SPACE_BETWEEN + (tasks[i - 1].height + SPACE_BETWEEN) * i;
    }
    tasks[i].y = currentY;
    tasks[i].index = i;
  }
};

const renderTasks = (tasks) => {
  tasks.forEach((t) => {
    console.log(t);
    t.render(container);
  });
};

const updateTaskList = (task, dropArea) => {
  let dropAreaIndex = dropArea.index;
  if (dropArea.index >= task.index + 1) {
    dropAreaIndex -= 1;
  }
  arrayMove(tasks, task.index, dropAreaIndex);
};

const generateDropAreas = (tasks) => {
  for (let i = 0; i <= tasks.length; i++) {
    let startY = 0;
    let endY = 30;

    if (i > 0) {
      startY = tasks[i - 1].y + tasks[i - 1].height;
      endY = startY + 30;
    }

    const dropArea = { index: i, startY: startY, endY: endY };

    dropAreas.push(dropArea);
  }
};

const refresh = () => {
  tasks.forEach((t) => {
    t.ref.remove();
    updateTasks(tasks);
    t.render(container);
  });
};

const mouseDown = (e, task) => {
  // nothing
  console.log(task);
  currentDropArea = dropAreas[task.index];
  resizeBox.setFocus(task);
};

const mouseMove = (e) => {
  let currentY = e.y - containerOffset.top;

  for (let i = 0; i < dropAreas.length; i++) {
    dropZone.changePosition(-100);
    if (currentY < dropAreas[0].endY) {
      dropZone.changePosition(dropAreas[0].endY - 15);
      currentDropArea = dropAreas[0];
      break;
    }
    if (currentY > dropAreas[dropAreas.length - 1].startY) {
      dropZone.changePosition(dropAreas[dropAreas.length - 1].endY - 15);
      currentDropArea = dropAreas[dropAreas.length - 1];
      break;
    }
    if (currentY > dropAreas[i].startY && currentY < dropAreas[i].endY) {
      dropZone.changePosition(dropAreas[i].endY - 15);
      currentDropArea = dropAreas[i];
      break;
    }
  }
};

const mouseUp = (e, task) => {
  document.removeEventListener('mousemove', mouseMove);
  document.removeEventListener('mouseup', mouseUp);

  updateTaskList(task, currentDropArea);
  console.log(tasks);
  refresh();
  dropZone.changePosition(-100);
  resizeBox.bringToFront();
};

generateTasks(TASKS_MOCK);
renderTasks(tasks);

generateDropAreas(tasks);
console.log(dropAreas);

const dropZone = new DropZone();
dropZone.render(container);
console.log(dropZone);

const resizeBox = new ResizeBox();
resizeBox.render(container);
resizeBox.setFocus(tasks[1]);
