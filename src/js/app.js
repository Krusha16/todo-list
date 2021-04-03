class RepairList {
  constructor() {

    //keeps track of the list of repairs
    this.repairs = [];
    this.idCounter = 0;
  };

  //adds new repair to the list of repairs
  addRepair(description) {

    //adds every individual repair job to repairs array
    this.repairs.push(new Repair(description, this.idCounter));
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    li.setAttribute('data-id', this.idCounter++);
    let div = document.createElement('div');
    div.className = "view";
    li.appendChild(div);
    div.innerHTML = `<input type="checkbox" class="toggle"><label>${description}</label><button class="destroy"></button> `;
    ul.insertBefore(li, ul.firstElementChild);
  };

  //decides if remove repair from the list or mark it as complete
  deleteOrMark(e) {
    if (e.target.className === 'destroy') {
      RepairList.deleteRepair(e);
      return;
    } else if (e.target.className === 'toggle') {
      RepairList.markAsComplete(e);
      return;
    }
  };

  //removes corresponding repair
  static deleteRepair(e) {
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
  };

  //marks corresponding repair as complete
  static markAsComplete(e) {
    let att = document.createAttribute('checked');
    e.target.setAttributeNode(att);
    let checkedElement = e.target.parentNode.parentNode;
    checkedElement.className = "completed";
    let id = checkedElement.getAttribute("data-id");
    repairList.repairs[id].completed = true;
  };

  //removes each completed repair
  clearCompleted(e) {
    let completed = document.querySelectorAll('.completed');
    for (let i = 0; i < completed.length; i++) {
      completed[i].parentNode.removeChild(completed[i]);
    }
  }
};

//keeps track of the information about each individual repair
class Repair {
  constructor(description, idCounter) {
    this.description = description;
    this.completed = false;
    this.idCounter = idCounter;
  }
};

let repair = new Repair();
let repairList = new RepairList();

//loads event listeners to elements
document.querySelector('.new-repair').addEventListener('keypress', newRepair);
document.querySelector('.clear-completed').addEventListener('click', repairList.clearCompleted);
document.querySelector('ul').addEventListener('click', repairList.deleteOrMark);

function newRepair(e) {

  //checks if input is submitted with the enter key
  if (e.key === 'Enter') {
    e.preventDefault();
    let input = document.querySelector('input');
    if (input.value !== '') {
      repairList.addRepair(input.value);
      input.value = '';
    }
  }
};
