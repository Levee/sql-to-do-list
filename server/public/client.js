$(ready);

function ready(){
  console.log('JS and jQ successfully sourced.');
  eventHandler();
  getList();
}

function eventHandler(){
  $('#taskPost').on('click', postList);
}

function getList(){
  $.ajax({
    method: 'GET',
    url: '/list',
    }).then((res) => {
      console.log('List successfully retrieved!');
      const list = res;
      let priority = '';
      let color = '';
      for(let task of list){
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
        }
        $('#list').append(`
          <div class="card col-4-auto mx-auto alert alert-${color} alert-dismissable fade show"
            role="alert"style="width: 18rem;">
            <div class="card-body p-0">
              <button type="button" class="close" data-dismiss="alert">
                <span>&times;</span>
              </button>
              <h5 class="card-title text-muted">${task.name}</h5>
              <h6 class="card-subtitle mb-2">${priority}</h6>
              <p class="card-text text-muted">${task.detail}</p>
            </div>
            <div class="card-footer alert-${color} border-top-0 text-center">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-primary">Edit</button>
                <button type="button" class="btn btn-outline-success">Complete</button>
              </div>
            </div>
          </div>
        `);
      }
    }).catch((res) => {
      alert('Request failed. Try again later.');
    }
  );
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
  $.ajax({
    method: 'POST',
    url: '/list',
    data: taskObj,
    }).then((res) => {
      console.log('Success!', res);
      $('#taskName').val('');
      $('#taskDetail').val('');
      $('#taskPriority').val('3');
      $('#list').empty();
      getList();
    }).catch((res) => {
      alert('Request failed. Try again later.');
    }
  );
}