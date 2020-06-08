$(ready);

function ready(){
  console.log('JS and jQ successfully sourced.');
  eventHandler();
  getList();
}

function eventHandler(){
  $('#taskPost').on('click', postList);
  $('#list').on('click','.close', deleteList);
  $('#list').on('click', '.complete', putList);
  $('#list').on('click', '.edit', editTask);
  $('#list').on('click', '.save', saveTask);
}

function getList(){
  $('#list').empty();
  $.ajax({
    method: 'GET',
    url: '/list',
  }).then((res) => {
    console.log('List successfully retrieved!');
    let priority = '';
    let color = '';
    let check = 'grey';
    for(let task of res){
      switch (task.priority) {
        case 1:
          priority = 'Urgent';
          color = 'danger';
          break;
        case 2:
          priority = 'High';
          color = 'warning';
          break;
        case 3:
          priority = 'Normal';
          color = 'success'
          break;
        case 4:
          priority = 'Low';
          color = 'info';
          break;
        default:
          console.log('Error! A problem occurred calculating the priority.');
      }
      if(task.status === true){
        color = 'dark';
        check = 'green';
      }
      $('#list').append(`
        <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3 my-3">
          <div class="card h-100 alert alert-${color} alert-dismissable fade show" role="alert"
            style="border-radius: 20px; box-shadow: 0px 7px 10px -3px rgba(0,0,0,0.75);">
            <div class="card-body p-0">
              <button data-id="${task.id}" type="button" class="close" data-dismiss="alert">
                <span>&times;</span>
              </button>
              <h5 class="card-title text-muted">${task.name}</h5>
              <h6 class="card-subtitle mb-2">
                <svg class="bi bi-check-square-fill align-text-bottom" width="1em" height="1em" viewBox="0 0 16 16" fill="${check}" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <span class="align-baseline">${priority}</span>
              </h6>
              <p class="card-text text-muted editable">${task.detail}</p>
            </div>
            <div class="card-footer alert-${color} border-top-0 px-0 py-2">
              <div class="btn-group float-right" role="group">
                <button data-id="${task.id}" type="button" class="btn btn-outline-primary edit"
                  style="border-top-left-radius: 10px; border-bottom-left-radius: 10px;">Edit</button>
                <button data-id="${task.id}" type="button" class="btn btn-outline-success save"
                  style="display: none;">Save</button>
                <button data-id="${task.id}" type="button" class="btn btn-outline-success complete"
                  style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">Complete</button>
              </div>
            </div>
          </div>
        </div>
      `);
    }
  }).catch((res) => {
    alert('Request failed. Try again later.');
  });
}

function postList(){
  const name = $('#taskName').val();
  const detail = $('#taskDetail').val();
  const priority = $('#taskPriority').val();
  const taskObj = {
    name: name,
    detail: detail,
    priority: priority
  };
  if(name === '' || detail === ''){
    $('#emptyInputs').modal('show');
    return;
  }
  $.ajax({
    method: 'POST',
    url: '/list',
    data: taskObj,
  }).then((res) => {
    console.log('Success!', res);
    $('#taskName').val('');
    $('#taskDetail').val('');
    $('#taskPriority').val('3');
    getList();
  }).catch((res) => {
    alert('Request failed. Try again later.');
  });
}

function deleteList(event){
  const id = $(event.target).closest('.close').data().id;
  $.ajax({
  method: 'DELETE',
  url: `/list/${id}`,
  }).then((res) => {
    console.log('Successfully deleted task!', res);
    getList();
  }).catch((res) => {
    alert('Request failed. Try again later.');
  });
}

function putList(event){
  const id = $(event.target).closest('.complete').data().id;
  $.ajax({
    method: 'PUT',
    url: `/list/${id}`,
    }).then((res) => {
      console.log('Successfully updated task!', res);
      getList();
    }).catch((res) => {
      alert('Request failed. Try again later.');
    });
}

function editTask(event){
  const makeEditable = $(event.target).parent().parent().prev().find('p.editable');
  $(event.target).attr('id', 'edit-active');
  $('.edit').prop('disabled', true);
  $('.complete').prop('disabled', true);
  makeEditable.prop('contenteditable', true).focus();
  $(event.target).siblings('.save').slideDown();
}

function saveTask(event){
  const makeEditable = $(event.target).parent().parent().prev().find('p.editable');
  $('.edit').removeAttr('id');
  $('.edit').prop('disabled', false);
  $('.complete').prop('disabled', false);
  makeEditable.prop('contenteditable', false);
  $(event.target).slideUp();
  const id = $(event.target).data().id;
  const detail = $(event.target).parent().parent().siblings('.card-body').find('p.editable').text();
  $.ajax({
    method: 'PUT',
    url: `/list/${id}`,
    data: {
      detail: `${detail}`
    },
  }).then((res) => {
    console.log('Success!', res);
  }).catch((res) => {
    alert('Request failed. Try again later.');
  });
}