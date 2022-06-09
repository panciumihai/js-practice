function Task(id, value) {
  this.id = id;
  this.value = value;
  this.ref = null;

  this.width = 500;
  this.height = null;

  this.startWidth = null;
  this.endWidth = null;

  this.startX = 0;
}

Object.assign(Task.prototype, {
  render: function (container) {
    let template = document.getElementById('taskTemplate');
    let task = document.importNode(template.content, true);
    task.querySelector('.task').id = this.id;
    task.querySelector('p').innerHTML = this.value;

    this.ref = task.querySelector('.task');

    container.appendChild(task);
    this.attachMouseEvents();
  },
  createClone: function () {},
  resize: function (e) {
    requestAnimationFrame(() => {
      let distance = -(this.startX - e.x);
      // let newWidth = this.startWidth + distance;
      // console.log(
      //   this.startX + ' - ' + e.x + ' = ' + distance + ' ,new ' + newWidth
      // );
      this.ref.style.width = `${this.startWidth + distance}px`;
    });
  },
  mouseup: function () {
    document.removeEventListener('mousemove', this.resize);
    this.ref
      .querySelector('.dotRight')
      .removeEventListener('mouseup', this.mouseup);
  },
  dragStart: function () {},
  attachMouseEvents: function () {
    // this.ref.addEventListener('click', (e) => {
    //   this.ref.classList.add('selected');
    // });
    //   this.ref.querySelector('.dotRight').addEventListener('mousedown', (e) => {
    //     this.startWidth = this.width;
    //     console.log(this.startWidth);
    //     this.startX = e.x;
    //     document.addEventListener('mousemove', this.resize.bind(this));
    //     this.ref
    //       .querySelector('.dotRight')
    //       .addEventListener('mouseup', this.mouseup.bind(this));
    //   });
    // },
  },
});

// const clone = this.ref.cloneNode(true);
// clone.style.position = 'absolute';
// clone.style.top = 0;
// clone.classList.add('selected');
// this.ref.appendChild(clone);
