if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger');

  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }
  var quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
  var addToCartButtons = document.getElementsByClassName('btn');
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
  }
}
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updatePretTotal();
}
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatePretTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement;
  var title = shopItem.getElementsByClassName('item-title')[0].innerText;
  var price = shopItem.getElementsByClassName('item-price')[0].innerText;
  var shopImg = button.parentElement.parentElement;
  var imgSrc = shopImg.getElementsByClassName('item-img')[0].src;
  console.log(title, price, imgSrc);
  addItemToCart(title, price, imgSrc);
}

function addItemToCart(title, price, imgSrc) {
//   var cartRow = document.createElement('div');
//   cartRow.innerText = title;
//   cartRow.classList.add('cart-row');
//   var cartItems = document.getElementsByClassName('cart-items')[0];
//   var cartRowContents = `
//     <div class="cart-item cart-column">
//         <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
//         <span class="item-title">${title}</span>
//     </div>
//     <span class="cart-price cart-column">${price}</span>
//     <div class="cart-quantity cart-column">
//         <input class="cart-quantity-input" type="number" value="2">
//         <button class="btn btn-danger" type="button">REMOVE</button>
//     </div>`;
//   cartRow.innerHTML = cartRowContents;
//   cartItems.appendChild(cartRow);
var cartRow = document.createElement('div');
cartRow.classList.add('cart-row');
var cartItems = document.getElementsByClassName('container content-section')[0];
var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
        alert('This item is already added to the cart');
        return;
    }
}
var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
cartRow.innerHTML = cartRowContents;
cartItems.append(cartRow);
cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updatePretTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName(
      'cart-quantity-input'
    )[0];
    var price = parseFloat(priceElement.innerText.replace('RON', ''));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText =
    total + ' Ron';
}
