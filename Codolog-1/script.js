function fetchData() {
    alert("Working!");

    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });
}