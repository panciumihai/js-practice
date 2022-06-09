function TaskList(taskNames) {
  this.tasks = [];
  this.dropAreas = [];

  this.container = null;
  this.containerOffset = null;

  this.selectedTask = null;
  this.selectedDropArea = null;

  this.dropZone = new DropZone();

  this.resizeBox = new ResizeBox();
  this.resizeBox.onEndResize = this.refresh.bind(this);

  this.createTasks(taskNames);
}

Object.assign(TaskList.prototype, {
  render(container) {
    this.container = container;
    this.containerOffset = container.getBoundingClientRect();

    this.renderTasks(container);
    this.generateDropAreas();
    this.dropZone.render(container);
    this.resizeBox.render(container);
    this.refresh();

    container.addEventListener('click', this.clickHandler.bind(this));
  },
  listIndexMove(list, oldIndex, newIndex) {
    if (newIndex >= list.length) {
      var k = newIndex - list.length + 1;
      while (k--) {
        list.push(undefined);
      }
    }
    list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
    return list;
  },
  createTasks(taskNames) {
    taskNames.forEach((name, index) => {
      const task = new Task(index, name);

      task.onMouseDown = this.mouseDown.bind(this);
      task.onCloneMove = this.mouseMove.bind(this);
      task.onMouseUp = this.mouseUp.bind(this);

      this.tasks.push(task);
    });
  },
  renderTasks() {
    this.tasks.forEach((t) => {
      t.render(container);
    });
  },
  refreshTasks() {
    let currentY = SPACE_BETWEEN;
    for (let i = 0; i < this.tasks.length; i++) {
      if (i > 0) {
        currentY += SPACE_BETWEEN + this.tasks[i - 1].height;
      }
      this.tasks[i].y = currentY;
      this.tasks[i].index = i;
      this.tasks[i].refresh();
    }
  },
  dropTask(task, dropArea) {
    let dropAreaIndex = dropArea.index;
    if (dropArea.index >= task.index + 1) {
      dropAreaIndex -= 1;
    }
    this.listIndexMove(this.tasks, task.index, dropAreaIndex);
  },
  // Drop areas section
  generateDropAreas() {
    this.dropAreas = [];
    for (let i = 0; i <= this.tasks.length; i++) {
      let startY = 0;
      let endY = SPACE_BETWEEN;

      if (i > 0) {
        startY = this.tasks[i - 1].y + this.tasks[i - 1].height;
        endY = startY + SPACE_BETWEEN;
      }

      const dropArea = { index: i, startY: startY, endY: endY };

      this.dropAreas.push(dropArea);
    }
  },
  refresh() {
    this.refreshTasks();
    this.generateDropAreas();
    this.dropZone.changePosition(-100);
  },
  // events
  mouseDown(e, task) {
    this.selectedDropArea = this.dropAreas[task.index];
    this.resizeBox.setFocus(task);
  },
  mouseMove(e) {
    let currentY = e.y - this.containerOffset.top;

    for (let i = 0; i < this.dropAreas.length; i++) {
      this.dropZone.changePosition(-100);
      if (currentY < this.dropAreas[0].endY) {
        this.dropZone.changePosition(this.dropAreas[0].endY - 15);
        this.selectedDropArea = this.dropAreas[0];
        break;
      }
      if (currentY > this.dropAreas[this.dropAreas.length - 1].startY) {
        this.dropZone.changePosition(
          this.dropAreas[this.dropAreas.length - 1].endY - 15
        );
        this.selectedDropArea = this.dropAreas[this.dropAreas.length - 1];
        break;
      }
      if (
        currentY > this.dropAreas[i].startY &&
        currentY < this.dropAreas[i].endY
      ) {
        this.dropZone.changePosition(this.dropAreas[i].endY - 15);
        this.selectedDropArea = this.dropAreas[i];
        break;
      }
    }
  },
  mouseUp(e, task) {
    // document.removeEventListener('mousemove', this.mouseMove);
    // document.removeEventListener('mouseup', this.mouseUp);

    this.dropTask(task, this.selectedDropArea);
    this.refresh();
    this.resizeBox.setFocus(task);
  },
  clickHandler(e) {
    this.resizeBox.hide();
  },
});

var SPACE_BETWEEN = 30;

var TASK_NAMES_MOCK = [
  '1. Plimba catelul',
  '2. Cumpara paine',
  '3. Mergi la sala',
  '4. Curatenie',
];

const container = document.getElementById('taskList');

const taskList = new TaskList(TASK_NAMES_MOCK);
taskList.render(container);
