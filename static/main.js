function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


function getAllTodos(url) {
  fetch(url, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    }
  })
  .then(response => response.json())
  .then(data => {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    (data.context).forEach(todo => {
      const todoHTMLElement = `
        <li>
          <p>Task: ${todo.task}</p>
          <p>Completed?: ${todo.completed}</p>
        </li>`
        todoList.innerHTML += todoHTMLElement;
    });
  });
}


function addTodo(url, payload) {
  fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      'X-CSRFToken': getCookie("csrftoken"),
    },
    body: JSON.stringify({payload: payload})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
}


function updateTodo(url, payload) {
  fetch(url, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      'X-CSRFToken': getCookie("csrftoken"),
    },
    body: JSON.stringify({payload: payload})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
}


function deleteTodo(url) {
  fetch(url, {
    method: "DELETE",
    credentials: "same-origin",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      'X-CSRFToken': getCookie("csrftoken"),
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
}


function getAllTodosJQuery(url) {
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success: (data) => {
      const todoList = $("#todoList");
      todoList.empty();

      (data.context).forEach(todo => {
        const todoHTMLElement = `
          <li>
            <p>Task: ${todo.task}</p>
            <p>Completed?: ${todo.completed}</p>
          </li>`
        todoList.append(todoHTMLElement);
      });
    },
    error: (error) => {
      console.log(error);
    }
  });
}


function addTodoJQuery(url, payload) {
  $.ajax({
    url: url,
    type: "POST",
    dataType: "json",
    data: JSON.stringify({payload: payload,}),
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      'X-CSRFToken': getCookie("csrftoken"),
    },
    success: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.log(error);
    }
  });
}


function updateTodoJQuery(url, payload) {
  $.ajax({
    url: url,
    type: "PUT",
    dataType: "json",
    data: JSON.stringify({payload: payload,}),
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      'X-CSRFToken': getCookie("csrftoken"),
    },
    success: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.log(error);
    }
  });
}


function deleteTodoJQuery(url) {
  $.ajax({
    url: url,
    type: "DELETE",
    dataType: "json",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      'X-CSRFToken': getCookie("csrftoken"),
    },
    success: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.log(error);
    }
  });
}
