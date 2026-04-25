export function showTable(data) {
    let table = document.getElementById("table");
    table.innerHTML = "";

    data.forEach(item => {
        table.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
        </tr>`;
    });
}