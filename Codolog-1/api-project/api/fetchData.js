export async function fetchUsers() {
    let res = await fetch("https://jsonplaceholder.typicode.com/users");
    return await res.json();
}