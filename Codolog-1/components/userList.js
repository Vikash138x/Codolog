export function showUsers(users) {
    let list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach(user => {
        list.innerHTML += `<li>${user.name}</li>`;
    });
}
