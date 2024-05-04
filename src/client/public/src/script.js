function request() {
  fetch("http://localhost:3000/")
    .then((response) => response.json())
    .then((data) => {
      textField = document.getElementById("text");
      textField.value = data.test;
      console.log(data);
    });
}
