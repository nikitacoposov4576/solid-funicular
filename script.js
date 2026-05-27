const headerTitle = document.querySelector('.logo h1');
headerTitle.addEventListener('click', function() {
    const messages = [
        '�� ���� ����७��� ��� ���譥�',
        '100% От дохода поставляется создателю!',
        'А вы знали чем отличается ядерный реактор от термоядерного?',
        'бубу бебе',    
        'Купите что-нибудь или не заходите на сайт!',    
        'Все права защищены никем и никогда не были защищены!',
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    this.textContent = messages[randomIndex];       
});

let h1ClickCount = 0;
headerTitle.addEventListener('click', function() {
    h1ClickCount = h1ClickCount + 100;

    if (h1ClickCount === 1000) {
        alert('Вы нажали на заголовок 1000 раз! Автокликер?))))');
        h1ClickCount = 0;
    }

});

const productDetails = [
/* 1 Строка */    ['Самая лучшая посудомойка чтобы лениться и не мыть посуду', 'Моет посуду прям как(нейронка не справилась).', '⭐9/10'],
/* 2 Строка */    ['она сожрет все ваше электричство, но зато вы сможете поиграть в доту, а это самое лучшее в мире :)', 'энергопотребление несколько мегаватт', '⭐10/01'],
/* 3 Строка */    ['Самая умная умнейшая колонка яндекс, к слову реально хорошая имба', 'дорогоправдаписецаааааа', '⭐100000/100000'], 
/* 4 Строка */    ['пс5 чтобы играть.... ну в гта я хз... шестую например)', 'бебе бубу', '⭐0.01/100'], 
/* 5 Строка */    ['Эпл макбук омг премиум АИР!!!', 'заряда хватает на пару наносек', '⭐1/10'], 
/* 6 Строка */    ['Дождались! ГТА 6 эксклюзивно только в нашем магазине!', 'бубу бебе', '⭐1000/1000' ],
/* 7 Строка */    ['Робот - пылесос, чтобы еще больше лениться!', 'работает с алисой', '⭐10/10'],
/* 8 Строка */    ['Старая добрая вкусная пепперони... Идеальна для... сьедания!!!', '💥10510910397/имба'],
/* 9 Строка */    ['этот обогреватель с̶о̶ж̶ж̶ё̶т̶ ̶в̶а̶ш̶у̶ ̶к̶в̶а̶р̶т̶и̶р̶у̶ обогреет всю квартиру', 'энергопотребление несколько йоттаватт', '⭐999/1000-7'],
/* 10 Строка */   ['Датчик который показывает температуру с точностью в 100 градусов', 'Работает от батареек около 1 миллисекунды~', '⭐?/10'],
/* 11 Строка */   ['Лучший телефон для гей-минга', 'Очень дорогой, идеально подходит для понтов', '⭐11/10']
];

document.querySelectorAll('.product-card').forEach(function(card,i){
    const info = card.querySelector('.product-info');
    const footer = card.querySelector('.product-footer');

    if (!info || !footer) return;

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'product-details';
    detailsDiv.style.display = 'none';
    detailsDiv.innerHTML = '<div>'+(productDetails[i] || productDetails[0]).map(item=> `<div>${item}</div>`).join('')+'</div>';
    info.insertBefore(detailsDiv, footer);

    const btn = document.createElement('button');
    btn.className = 'details-btn';
    btn.textContent = 'Подробнее';


    footer.insertBefore(btn,footer.querySelector('.add-to-cart-btn'));

    let isVisible = false;
    btn.addEventListener('click',function() {
        isVisible = !isVisible;
        if (isVisible) {
            detailsDiv.style.display = 'block';
            btn.textContent = 'Скрыть';
            

        } else {
            detailsDiv.style.display = 'none';
            btn.textContent = 'Подробнее';
        }

    });


});

const scrollTopBtn = document.createElement('button');
scrollTopBtn.textContent = '↑';
scrollTopBtn.style.cssText = 'position: fixed; right: 20px; bottom: 20px; width: 50px; height: 50px; border-radius: 50%; background: rgb(125, 0, 174); color: black; font-size: 24px; border: none; cursor: pointer;z-index:1000;transition:all 0.3s:';
document.body.appendChild(scrollTopBtn);
window.addEventListener('scroll',function() {
    scrollTopBtn.style.display = this.window.scrollY > 800 ? 'block' : 'none';

    
}); 

scrollTopBtn.addEventListener('click',function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })

});



function filterProducts(FilterType) {

    const productCards = document.querySelectorAll('.product-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    filterButtons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(`'${FilterType}'`)){
            btn.classList.add('active');
        }

    });   

    productCards.forEach(function(card){
        const priceElement = card.querySelector('.price');
        const priceText = priceElement.textContent;
        const price = parseInt(priceText.replace(/\D/g, ''));
        let showProduct = false;

        if (FilterType === 'all'){
            showProduct = true;
        } else if (FilterType === 'cheaplow'){
            showProduct = price < 10000;
        } else if (FilterType === 'mediumnormal'){
            showProduct = price >= 10000 && price < 25000;
        } else if (FilterType === 'expensivehigh'){
            showProduct = price >= 25000;
        }

        if (showProduct){
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }




    });
}


let cart = [];


function addToCart(productName, price) {
    const item = cart.find(i => i.name === productName);
    if (item) {
        item.quantity ++;
    } else {
        cart.push({name: productName, price, quantity: 1});
    }
    updateCart(); //не было
    alert(`�� ���� ����७��� ��� ���譥 ${productName} добавлен(а) в корзину! за ${price} рублей`);


}


function removeFromCart(productName) { 
    cart = cart.filter(i => i.name !== productName);
    updateCart();

}


function changeQuantity(productName, delta) {
    const item = cart.find(i => i.name === productName);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        removeFromCart(productName);
    } else {
        updateCart();
    }

}


function clearCart() {
    cart = [];
    updateCart();
    alert(`�� ���� ����७��� ��� ���譥Корзина очищена`);
}

function checkout() {
    if (!cart.length) {
        alert(`�ты че попутал7���`); 
        return;
    }
    const totalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0); //не было умножения i.price
    alert(`Заказ оформлен�� ���� ����७��� ��� ���譥!\nКоличество товаров: ${totalQuantity}\nСумма заказа: ${totalPrice}�� ���� ����७��� ��� ���譥!`);
    clearCart();


}

function updateCart() {
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');

    // Очищаем содержимое корзины перед перерисовкой
    itemsEl.innerHTML = '';
    totalEl.style.display = 'block';

    // Если корзина пуста
    if (cart.length === 0) {
        // Создаём сообщение о пустой корзине заново
        itemsEl.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        totalEl.style.display = 'none';
        countEl.textContent = '0';
        return;
    }

    // Если есть товары
    totalEl.style.display = 'block';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-price">${item.price} руб.</div>
            <div class="item-quantity">
                <button onclick="changeQuantity('${item.name}', -1)" class="quantity-btn">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity('${item.name}', 1)" class="quantity-btn">+</button>
            </div>
            <div class="item-total">${itemTotal} руб.</div>
            <button onclick="removeFromCart('${item.name}')" class="remove-btn">✖</button>
        `;
        itemsEl.appendChild(row);
    });

    document.getElementById('total-price').textContent = total;
    countEl.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.product-card');
        if (!card) return;
        const name = card.querySelector('h3')?.textContent;
        const priceEl = card.querySelector('.price');
        if (!name || !priceEl) return;
        const price = parseInt(priceEl.textContent.replace(/\D/g, ''));     
        addToCart(name, price);    


    })
});
document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
document.getElementById('checkout-btn').addEventListener('click', checkout);


updateCart();



function setTheme(theme) {
    if (theme ==='dark'){
        document.body.classList.add('dark-theme');
        document

        const
        let

        const btn = document.getElementById('theme-switcher');
        if (btn) btn.textContent = 'light';
    } else {
        document.body.classList.remove('dark-theme');
        const btn = document.getElementById('theme-switcher');
        if (btn) btn.textContent = 'dark';
    }
    
    localStorage.setItem('theme', theme);

}


const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'dark'){
    setTheme('dark');
} else {
    setTheme('light');
}


const themeSwitcher = document.getElementById('theme-switcher');
if (themeSwitcher) {
    themeSwitcher.addEventListener('click', function() {
        const IsDark = document.body.classList.contains('dark-theme');
        setTheme(isDark ? 'light' : 'dark');
    });
}


const modal = document.getElementById('order-motal');                                              //бебебебеебебе
const closeModal = document.getElementById('close-modal');              //бебебебеебебе
const cancelOrder = document.getElementById('cancel-order');                           //бебебебеебебе
const orderForm = document.getElementById('order-form');               //бебебебеебебе

function showOrderModal() {
    if (modal) modal.style.display = 'flex';                                             //бебебебеебебе
}

function closeOrderModal() {
    if (modal) {
        modal.style.display = 'none';                                                //бебебебеебебе
        orderForm?.reset();                       //бебебебеебебе
    }
}

if (closeModal) closeModal.addEventListener('click', closeOrderModal);    //бебебебеебебе
if (cancelOrder) cancelOrder.addEventListener('click', closeOrderModal);                        //бебебебеебебе

//event -  ббебебее
//event.target - бебебебебебеебебеббебебе
windows.addEventListener('click', (e) => { // БЕБЕБЕБЕБЕБЕБЕБЕБЕБЕБЕБЕББЕБЕБЕЕБЕББЕБЕБЕБЕБЕБЕБЕБЕБЕБЕЕБЕБЕЕЕЕЕБЕЕЕЕБЕБЕЕБЕЕБЕБЕЕБЕББЕБЕББЕБЕЕЕБББЕБЕБЕЕБЕЕББЕЕБЕЕБЕЕБЕБЕЕБЕЕЕБЕБЕЕБЕБЕЕБЕЕБЕЕБЕБЕЕЕБЕЕБЕБ
    if (e.target === modal) closeOrderModal();
});



function validateCardNumber(card) {
    const cleaned = card.replace(/\s/g, ''); // убираем бебебебебебебебе
    return /^\d{16}$/.test(cleaned); // проверяем бебебебебебебе
}

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullname = document.getElementById('fullname').value.trim();    
        // БЕБКБЕББЕБЕБЕБЕБЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕББЕБББББЕБЕБЕБЕБ
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElemenyById('address').value.trim();
        const deliveryTime = document.getElemenyById('deliveryTime').value();
        const cardNumber = document.getElemenyById('cardNumber').value.trim();
        const cvv = document.getElemenyById('cvv').value.trim();

        if (!fullname || !phone || !address || !cardNumber || !cvv) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        const phoneDigits = phone.replace(/\D/g, ''); // возвращаем бебебебеббебе
        if (phoneDigits.length < 11) {
            alert('Пожалуйста, введите корректный номер телефона'); // ББЕБЕБЕБЕБЕБЕБЕБ
            return; // БЕБЕБЕБЕББЕБЕБЕЕБЕЕЕЕЕЕЕЕЕЕЕЕААААААААААААААААААААААААААААААААААААААААААААААА
        }

        if (!validateCardNumber(cardNumber)) {
            alert('Пожалуйста, введите корректные данные карты');
            return;
        }

        const orderData = {
            customer: fullname,
            phone: phoneDigits,
            address,
            deliveryTime: deliveryTime || "как можно скорее",
            cardLast4: cardNumber.replace(/\s/g, '').slice(-4),
            items: cart.map(i => `${i.name} x ${i.quantity} = ${i.price * i.quantity} руб.`).join(', '),
            total: cart.reduce((s,i) => s + i.price * i.quantity, 0)
        };
        console.log('Заказ отправлен:', orderData); // бебе. бебебебебебе. БНБЕББЕБЕБЕБЕБЕБЕБЕЕБЕББЕБЕЕБЕЕБЕБЕБЕБЕБЕББЕБЕБЕБЕБЕ.
        alert(`ура, ваши данные были успешно украдены и отправлены разработчику! молодец /n${fullname}, я обокрал вас на сумму ${orderData.total} руб.`);
        clearCart();
        closeOrderModal();
    });
}

window.checkout = function() {
    if (!cart.length) {
        alert('Корзина пуста');
        return;
    }

    showOrderModal();
};