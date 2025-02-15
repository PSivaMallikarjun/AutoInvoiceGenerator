document.getElementById('addItem').addEventListener('click', addItem);
document.getElementById('generatePDF').addEventListener('click', generatePDF);

function addItem() {
    const table = document.getElementById('invoiceTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const itemCell = newRow.insertCell(0);
    const descCell = newRow.insertCell(1);
    const qtyCell = newRow.insertCell(2);
    const priceCell = newRow.insertCell(3);
    const totalCell = newRow.insertCell(4);

    itemCell.innerHTML = '<input type="text" placeholder="Item Name">';
    descCell.innerHTML = '<input type="text" placeholder="Description">';
    qtyCell.innerHTML = '<input type="number" value="1" min="1" oninput="calculateTotal()">';
    priceCell.innerHTML = '<input type="number" value="0.00" min="0" step="0.01" oninput="calculateTotal()">';
    totalCell.innerHTML = '0.00';
}

function calculateTotal() {
    const table = document.getElementById('invoiceTable').getElementsByTagName('tbody')[0];
    let subtotal = 0;

    for (let row of table.rows) {
        const qty = row.cells[2].getElementsByTagName('input')[0].value;
        const price = row.cells[3].getElementsByTagName('input')[0].value;
        const total = qty * price;
        row.cells[4].innerText = total.toFixed(2);
        subtotal += total;
    }

    const tax = subtotal * 0.10; // 10% tax
    const total = subtotal + tax;

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('tax').innerText = tax.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
}

function generatePDF() {
    const element = document.querySelector('.invoice-container');
    html2pdf()
        .from(element)
        .save('invoice.pdf');
}
