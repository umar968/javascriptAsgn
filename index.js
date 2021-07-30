var isTotalCalculated = false;
let productData = [];
const handleAddProduct = (target) => {
  const formElement = document.getElementById("productForm");
  if (formElement.style.display == "") {
    formElement.style.display = "block";
    target.innerHTML = "Hide Add Product Form";
  } else {
    formElement.style.display = "";
    target.innerHTML = "Add a new Product";
  }
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  var productName = document.getElementById("productName");
  var productPrice = document.getElementById("productPrice");
  var numberOfProducts = document.getElementById("numberOfProducts");
  const data = {
    name: productName.value,
    price: productPrice.value,
    number: numberOfProducts.value,
  };
  productData.push(data);
  productName.value = "";
  productPrice.value = "";
  numberOfProducts.value = "";
  updateTable();
};

const handleCancel = () => {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = 0;
  document.getElementById("numberOfProducts").value = 0;
};

const checkInteger = (event) => {
  if (event.target.value !== "") {
    if (!Number.isInteger(parseFloat(event.target.value))) {
      event.target.nextElementSibling.innerHTML =
        "Only Integer values are allowed";
      document.getElementById("addbtn").disabled = true;
    } else {
      event.target.nextElementSibling.innerHTML = "";
      document.getElementById("addbtn").disabled = false;
    }
  }
};

const updateTable = () => {
  const table = document.getElementById("tableBody");
  table.innerHTML = null;
  productData.forEach((product, index) => {
    var row = table.insertRow(index);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = index + 1;
    cell2.innerHTML = product.name;
    cell3.innerHTML = product.price;
    cell4.innerHTML = product.number;
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Delete";
    // Creating on Click Attribute and Add to Remove Button
    var onClickAtt = document.createAttribute("onClick");
    onClickAtt.value = "handleRemovebtn()";
    btn.setAttributeNode(onClickAtt);
    // Createing a id Attribute and adding to Remove btn
    var idAtt = document.createAttribute("id");
    idAtt.value = index;
    btn.setAttributeNode(idAtt);
    //
    cell5.appendChild(btn);
  });
};

const handleCalculateTotal = () => {
  isTotalCalculated = true;
  let totalSum = 0;
  productData.forEach((product) => {
    totalSum += product.price * product.number;
  });
  document.getElementById("totalDisplay").innerHTML = totalSum;
};

const handleClearAll = () => {
  productData = [];
  updateTable();
  handleCalculateTotal();
};

const handleRemovebtn = () => {
  productData.splice(event.target.id, 1);
  updateTable();
  if (isTotalCalculated) {
    handleCalculateTotal();
  }
};
