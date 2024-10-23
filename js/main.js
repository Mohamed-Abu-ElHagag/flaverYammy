let darkMod = document.querySelector(".darkMode");
let myNav = document.querySelector(".navbar");
let myBody = document.querySelector("body");
let myHero = document.querySelector(".hero");
let whyYummy = document.querySelector(".whyYummy");
let showMoreTwo = document.querySelector(".showMoreTwo");
let ShowmoreMenu = document.querySelector(".ShowmoreMenu");
let ShowmoreMenuTow = document.querySelector(".ShowmoreMenuTow");
let showMoreThree = document.querySelector(".showMoreThree");
let ShowmoreMenuThree = document.querySelector(".ShowmoreMenuThree");
let showMoreFour = document.querySelector(".showMoreFour");
let ShowmoreMenuFour = document.querySelector(".ShowmoreMenuFour");
let bookTable = document.querySelector(".bookTable .bg");
let gallery = document.querySelector(".gallery");

darkMod.onclick = function () {
  myNav.classList.toggle("navbarDarkMod");
  myBody.classList.toggle("navbarDarkMod");
  myHero.classList.toggle("navbarDarkMod");
  if (myHero.style.backgroundColor == "rgb(46, 46, 46)") {
    myHero.style.backgroundColor = "#f2f2f2";
    whyYummy.style.backgroundColor = "#f2f2f2";
    bookTable.style.backgroundColor = "#f2f2f2";
    gallery.style.backgroundColor = "#f2f2f2";
  } else {
    myHero.style.backgroundColor = "rgb(46, 46, 46)";
    whyYummy.style.backgroundColor = "rgb(46, 46, 46)";
    bookTable.style.backgroundColor = "rgb(46, 46, 46)";
    gallery.style.backgroundColor = "rgb(46, 46, 46)";
  }
};
let playVid = document.querySelector(".btnPlay");
let aboutVideo = document.querySelector(".about-vid");
let iconAbout = document.querySelector(".button-with-icon .fa-play");
aboutVideo.removeAttribute("controls");
playVid.onclick = function () {
  aboutVideo.classList.toggle("play");
  if (aboutVideo.classList.contains("play")) {
    aboutVideo.play();
    iconAbout.classList.replace("fa-play", "fa-pause");
  } else {
    aboutVideo.pause();
    iconAbout.classList.replace("fa-pause", "fa-play");
  }
};
let showMenufun = () => {
  ShowmoreMenuTow.classList.toggle("none");
  if (ShowmoreMenuTow.classList.contains("none")) {
    showMoreTwo.textContent = "Show More";
  } else {
    showMoreTwo.textContent = "Show Less";
  }
};
showMoreTwo.addEventListener("click", showMenufun);
let showMenufun3 = () => {
  ShowmoreMenuThree.classList.toggle("none");
  if (ShowmoreMenuThree.classList.contains("none")) {
    showMoreThree.textContent = "Show More";
  } else {
    showMoreThree.textContent = "Show Less";
  }
};
showMoreThree.addEventListener("click", showMenufun3);
let showMenufun4 = () => {
  ShowmoreMenuFour.classList.toggle("none");
  if (ShowmoreMenuFour.classList.contains("none")) {
    showMoreFour.textContent = "Show More";
  } else {
    showMoreFour.textContent = "Show Less";
  }
};
showMoreFour.addEventListener("click", showMenufun4);
// getSalary
let productName = document.querySelector("#productName");
let category = document.querySelector("#category");
let inputSalary = document.querySelectorAll("#inputSalary input");
let addBtn = document.getElementById("addBtn");
let deleteAllMenu = document.getElementById("deleteAllMenu");
let count = document.getElementById("count");
let image = document.getElementById("image");
let cardMenu = document.getElementById("cardMenu");
let updateBtn = document.getElementById("updateBtn");
let allProduct;
let mood = "create";
let global;
if (localStorage.myProducts == null) {
  allProduct = [];
} else {
  allProduct = JSON.parse(localStorage.myProducts);
}

let getSalary = () => {
  let cost = inputSalary[0].value;
  let tax = inputSalary[1].value;
  let bonus = inputSalary[2].value;
  let discount = inputSalary[3].value;
  let salesCost = inputSalary[4].value;
  let netProfit = inputSalary[5].value;

  let taxCost = +cost * (+tax / 100);
  let taxAfterCost = +taxCost + +cost;
  let bonusAfterCost = +taxAfterCost + +bonus;
  let discountCost = +bonusAfterCost * (+discount / 100);
  let discountAfterCost = +bonusAfterCost - +discountCost;
  inputSalary[4].value = Math.floor(+discountAfterCost);
  inputSalary[5].value = Math.floor(+discountAfterCost - +taxAfterCost);
};

for (let i = 0; i < inputSalary.length; i++) {
  inputSalary[i].addEventListener("keyup", getSalary);
}
// create object

let createObject = () => {
  let newProduct = {
    productName: productName.value,
    category: category.value,
    cost: inputSalary[0].value,
    tax: inputSalary[1].value,
    bonus: inputSalary[2].value,
    discount: inputSalary[3].value,
    salesCost: inputSalary[4].value,
    netProfit: inputSalary[5].value,
    count: count.value,
    image: image.value,
  };
  if (mood === "create") {
    if (newProduct.count < 0) {
      allProduct.push(newProduct);
    } else {
      for (let i = 0; i < count.value; i++) {
        allProduct.push(newProduct);
      }
    }
  } else {
    allProduct[global] = newProduct;
    addBtn.style.backgroundColor = "#ce1212";
    addBtn.style.color = "#000";
    addBtn.style.transition = "all .5s";
    addBtn.innerHTML = "Add";
  }

  localStorage.setItem("myProducts", JSON.stringify(allProduct));
  showData();
};
addBtn.addEventListener("click", createObject);
// showData
let showData = () => {
  let menuItems = "";
  for (let i = 0; i < allProduct.length; i++) {
    menuItems += `
  
      <div class="col-lg-4">
          <div class="image">
              <img src="${allProduct[i].image}" alt="" />
          </div>
          <h4>${allProduct[i].productName}</h4>
          <p>${allProduct[i].category}</p>
          <h6>$${allProduct[i].salesCost}</h6>
   <button class="form-control mx-auto" onclick="update(${i})" id="updateBtn">Update</button>
      </div>
    `;
  }
  cardMenu.innerHTML = menuItems;
};
showData();
//deleteAll

let deleteAllMenufun = () => {
  localStorage.clear();
  allProduct.splice(0);
  showData();
};
deleteAllMenu.addEventListener("click", deleteAllMenufun);

let update = (i) => {
  addBtn.style.backgroundColor = "blue";
  addBtn.style.color = "White";
  addBtn.innerHTML = "Update";
  productName.value = allProduct[i].productName;
  category.value = allProduct[i].category;
  image.value = allProduct[i].image;
  cost.value = allProduct[i].cost;
  tax.value = allProduct[i].tax;
  bonus.value = allProduct[i].bonus;
  discount.value = allProduct[i].discount;
  count.style.display = "none";
  mood = "update";
  global = i;
};
