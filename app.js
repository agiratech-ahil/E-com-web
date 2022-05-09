window.onload = function () {
  //adding data to local storage

  const addTo = document.getElementsByClassName("add");

  const cart = document.querySelector(".cartbox");

  var items = [];
  for (let i = 0; i < addTo.length; i++) {
    addTo[i].addEventListener("click", function (e) {
      if (typeof Storage !== "undefined") {
        var item = {
          id: i + 1,
          model: e.target.parentElement.children[1].textContent,
          price: e.target.parentElement.children[3].textContent,
          no: 1,
        };
        console.log(item);
        if (JSON.parse(localStorage.getItem("products")) === null) {
          items.push(item);
          localStorage.setItem("products", JSON.stringify(items));
          window.location.reload();
        } else {
          const localItems = JSON.parse(localStorage.getItem("products"));
          localItems.map((data) => {
            if (item.id == data.id) {
              item.no = data.no + 1;
            } else {
              items.push(data);
            }
          });
          items.push(item);
          localStorage.setItem("products", JSON.stringify(items));
          window.location.reload();
        }
      }
    });
  }

  //Store and display no. of. items
  const scart = document.querySelector(".count p");
  let no = 0;
  JSON.parse(localStorage.getItem("products")).map((data) => {
    no = no + data.no;
  });

  scart.innerHTML = no;
  //Store and display no. of. items
  const totalp = document.querySelector(".price p");
  var p = 0;
  var str = JSON.parse(localStorage.getItem("products"));
  var s = str.map((item) => item.price * item.no);

  for (let i = 0; i < s.length; i++) {
    p += s[i];
  }

  console.log(p);
  totalp.innerHTML = "₹" + p;

  // adding data to the table
  var carttable = cart.querySelector("table");

  let tabledata = "";
  tabledata +=
    "<tr><th>Item Name</th><th>No of Items</th><th>Item Price</th><th>Total Price</th></tr>";

  if (JSON.parse(localStorage.getItem("products")) === null) {
    tabledata += '<tr><td colspan="4"> No items found<td></tr>';
  } else {
    JSON.parse(localStorage.getItem("products")).map((data) => {
      tabledata += `<tr><td> 
        ${data.model} 
        </td><td id='number'> 
        ${data.no} 
        </td><td id = 'rate'>
        ₹${data.price} 
        </td><td >
        ₹${data.price * data.no} 
        </td></tr>`;
    });
  }
  carttable.innerHTML = tabledata;
};

