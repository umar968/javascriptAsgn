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
const idGenerator = () => productData.length + 1;

const handleFormSubmit = (event) => {
  event.preventDefault();
  var productName = document.getElementById("productName");
  var productPrice = document.getElementById("productPrice");
  var numberOfProducts = document.getElementById("numberOfProducts");
  const data = {
    id: idGenerator(),
    name: productName.value,
    price: productPrice.value,
    number: numberOfProducts.value,
  };
  productData.push(data);
  console.log(productData);
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
  productData.forEach((product) => {
    var row = table.insertRow(product.id - 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.scope = "row";
    cell1.innerHTML = product.id;
    cell2.innerHTML = product.name;
    cell3.innerHTML = product.price;
    cell4.innerHTML = product.number;
  });
};

const handleCalculateTotal = () => {
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
