let productArray = [];
let quantityArray = [];
let priceArray = [];
let totalPriceArray = [];

// Функция, возвращающая новую кнопку
function getButton(text, className, className2) {
  let button = document.createElement('button');
  button.textContent = text;
  button.classList.add(className, className2);
  return button;
}

// Функция, возвращающая новый input
function getInput(placeholder, type, className) {
  let input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.classList.add(className);
  return input;
}

// Функция, возвращающая новый label
function getLabel(className) {
  let label = document.createElement('label');
  label.classList.add(className);
  return label;
}

// Функция, возвращающая новый блок
function getBox(className) {
  let div = document.createElement('div');
  div.classList.add(className);
  return div;
}

// Функция, возвращающая  таблицу
function getTable() {
  let table = document.createElement('table');
  table.classList.add('check-item__table');

  let thead = document.createElement('thead');
  thead.classList.add('check-item__thead');

  let theadTr = document.createElement('tr');
  theadTr.classList.add('check-item__thead-tr');

  let nameTd = document.createElement('td');
  nameTd.textContent = 'Название';
  nameTd.classList.add('check-item__thead-td');

  let quantityTd = document.createElement('td');
  quantityTd.textContent = 'Кол-во';
  quantityTd.classList.add('check-item__thead-td');

  let priceTd = document.createElement('td');
  priceTd.textContent = 'Цена';
  priceTd.classList.add('check-item__thead-td');

  let totalPriceTd = document.createElement('td');
  totalPriceTd.textContent = 'Общая цена';
  theadTr.classList.add('check-item__thead-td');

  theadTr.append(nameTd, quantityTd, priceTd, totalPriceTd);
  thead.append(theadTr);
  table.append(thead);

  return table;
}

// Функция, возвращающая строку таблицы
function getProductTr(productName, productQuantity, productPrice, productTotalPrice) {
  productTotalPrice = productQuantity * productPrice;

  let productTbody = document.createElement('tbody');
  productTbody.classList.add('check-item__tbody');

  let productTr = document.createElement('tr');
  productTr.classList.add('check-item__tbody-tr');

  let nameTd = document.createElement('td');
  nameTd.classList.add('check-item__tbody-td');

  let quantityTd = document.createElement('td');
  quantityTd.classList.add('check-item__tbody-td');

  let priceTd = document.createElement('td');
  priceTd.classList.add('check-item__tbody-td');

  let totalPriceTd = document.createElement('td');
  totalPriceTd.classList.add('check-item__tbody-td');

  nameTd.textContent = productName;
  quantityTd.textContent = productQuantity;
  priceTd.textContent = `${productPrice} руб`;
  totalPriceTd.textContent = `${productTotalPrice} руб`;

  productTr.append(nameTd, quantityTd, priceTd, totalPriceTd);
  productTbody.append(productTr);

  return productTbody;
}

// Функция, возвращающает список
function checksItem(index, product, quantity, price, totalPrice) {
  let getProduct = getProductTr(product, quantity, price, totalPrice);
  let table = getTable();
  table.append(getProduct);

  let checksItem = document.createElement('li');
  checksItem.classList.add('check-item');

  let checksItemNum = document.createElement('strong');
  checksItemNum.classList.add('check-item__strong');
  checksItemNum.textContent = index + 1;

  let editBtn = getButton('Изменить', 'btn', 'check-item__btn');

  editBtn.onclick = function () {
    let newProduct = prompt('Введите название товара', productArray[index]);
    productArray[index] = newProduct;

    let newQuantity = Number(prompt('Введите кол-во товара', quantityArray[index]));
    if (Math.sign(newQuantity) === -1) {
      newQuantity = Number(prompt('Введите положительное кол-во товара', quantityArray[index]));
    }
    quantityArray[index] = newQuantity;

    let newPrice = Number(prompt('Введите цену товара', priceArray[index]));
    if (Math.sign(newPrice) === -1) {
      newPrice = Number(prompt('Введите положительную цену товара', priceArray[index]));
    }
    priceArray[index] = newPrice;

    totalPriceArray[index] = newQuantity * newPrice;

    render(productArray, quantityArray, priceArray, totalPriceArray);
  };

  let removeBtn = getButton('Удалить', 'btn', 'check-item__btn--red');

  removeBtn.onclick = function () {
    let selectDelete = confirm(`Вы уверены, что хотите удалить товар "${productArray[index]}"?`);

    if (selectDelete === true) {
      productArray.splice(index, 1);
      quantityArray.splice(index, 1);
      priceArray.splice(index, 1);
      totalPriceArray.splice(index, 1);
    }
    render(productArray, quantityArray, priceArray, totalPriceArray);
  };

  checksItem.append(checksItemNum, table, editBtn, removeBtn);

  return checksItem;
}

// Блок контейнера
let container = getBox('container');

// Заголовок
let title = document.createElement('h1');
title.classList.add('title');
title.textContent = 'Чек покупки';

// Блок для текстовых полей
let productInpBox = getBox('box-product');

// Блок название продукта
let productInpWrap = getBox('box-product__wrap');
let productInp = getInput('Название товара', 'text', 'box-product__input');
let productErrorLabel = getLabel('error');

productInpWrap.append(productInp, productErrorLabel);

// Блок количество тавара
let quantityInpWrap = getBox('box-product__wrap');
let quantityInp = getInput('Количество', 'number', 'box-product__input');
let quantityErrorLabel = getLabel('error');

quantityInpWrap.append(quantityInp, quantityErrorLabel);

// Блок цены тавара
let priceInpWrap = getBox('box-product__wrap');
let priceInp = getInput('Цена', 'number', 'box-product__input');
let priceErrorLabel = getLabel('error');

priceInpWrap.append(priceInp, priceErrorLabel);

// Создание кнопки товара
let productInpBtn = getButton('Добавить', 'btn', 'box-task__btn');

productInpBtn.onclick = function () {
  let productValue = productInp.value;
  let quantityValue = Number(quantityInp.value);
  let priceValue = Number(priceInp.value);

  let validationResult = false;

  //Проверка название продукта
  productErrorLabel.textContent = '';

  if (productValue === '') {
    productErrorLabel.textContent = 'Введите название товара';
    validationResult = true;
  }

  //Проверка количество тавара
  quantityErrorLabel.textContent = '';

  if (Math.sign(quantityValue) === -1) {
    quantityErrorLabel.textContent = 'Вы ввели отрицательное число тавара';
    validationResult = true;
  }

  if (quantityValue === 0) {
    quantityErrorLabel.textContent = 'Введите количество тавара';
    validationResult = true;
  }

  //Проверка цены тавара
  priceErrorLabel.textContent = '';

  if (Math.sign(priceValue) === -1) {
    priceErrorLabel.textContent = 'Вы ввели отрицательную цену тавара';
    validationResult = true;
  }

  if (priceValue === 0) {
    priceErrorLabel.textContent = 'Введите цену тавара';
    validationResult = true;
  }

  if (validationResult === true) {
    return;
  }

  productArray.push(productValue);
  quantityArray.push(quantityValue);
  priceArray.push(priceValue);
  totalPriceArray.push(quantityValue * priceValue);

  render(productArray, quantityArray, priceArray, totalPriceArray);

  productInp.value = '';
  quantityInp.value = '';
  priceInp.value = '';
};

productInpBox.append(productInpWrap, quantityInpWrap, priceInpWrap, productInpBtn);

// Список чеков
let checkList = document.createElement('ul');
checkList.classList.add('check-list');

// Общая цена
let totalCost = getBox('total-cost');
let totalCostStrong = document.createElement('strong');
totalCostStrong.classList.add('total-cost__strong');
totalCostStrong.textContent = `Итоговая стоимость:`;
let totalCostStrongPrice = document.createElement('strong');
totalCostStrongPrice.classList.add('total-cost__strong--price');

totalCost.append(totalCostStrong, totalCostStrongPrice);

// Функция отрисовки списка
function render(arrProduct, arrQuantity, arrPrice, arrTotalPrice) {
  checkList.innerHTML = ''; // Очищаем список перед отрисовкой

  // Если товаров в списке нет, показываем сообщение
  if (arrProduct.length === 0) {
    let emptyChecksItem = document.createElement('li');
    emptyChecksItem.classList.add('check-item__empty');

    let textChecksItem = document.createElement('p');
    textChecksItem.classList.add('check-item__text');
    textChecksItem.textContent = 'Товары не добавлены';

    emptyChecksItem.append(textChecksItem);
    checkList.append(emptyChecksItem);

    totalCostStrongPrice.textContent = '0 руб';
    return;
  }

  let allTotalPrice = 0; // Общая цена

  // Начинаем отрисовку, используя массив и цикл
  for (let i = 0; i < arrProduct.length; i++) {
    let newChecksItem = checksItem(i, arrProduct[i], arrQuantity[i], arrPrice[i], arrTotalPrice[i]);

    allTotalPrice = allTotalPrice + arrTotalPrice[i];

    checkList.append(newChecksItem);
  }

  // Изменяем текст в элементе общей цены
  totalCostStrongPrice.textContent = `${allTotalPrice} руб`;
}

// Запускаем отрисовку списка при загрузке страницы
render(productArray, quantityArray, priceArray, totalPriceArray);

container.append(title, productInpBox, checkList, totalCost);

document.body.append(container);
