// Загружаем корзину из localStorage (или создаем пустую)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Сохраняем корзину в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Добавление товара в корзину по клику
function addToCartFromCard(button) {
    // Ищем родительский блок товара
    const block = button.closest('.block1');

    // Получаем название
    const name = block.querySelector('.name').innerText;

    // Смотрим цену (со скидкой или обычную)
    let price = block.querySelector('.new');
    if (price) {
        // Если есть скидка, берем цену со скидкой
        price = parseInt(price.innerText.replace(' Р', ''));
    } else {
        // Иначе берем обычную цену
        price = block.querySelector('.price');
        price = parseInt(price.innerText.replace(' Р', ''));
    }

    // Проверяем, есть ли уже такой товар в корзине
    const existing = cart.find(item => item.name === name);

    if (existing) {
        // Если есть - увеличиваем количество
        existing.quantity++;
    } else {
        // Если нет - добавляем новый
        cart.push({ name, price, quantity: 1 });
    }

    // Сохраняем корзину
    saveCart();

    // Показываем уведомление
    alert(`✅ ${name} добавлен в корзину!`);

    // Обновляем отображение корзины
    updateCartDisplay();
}

// Отрисовка корзины
function updateCartDisplay() {
    // Находим элементы на странице
    const cartItemsList = document.getElementById('cartItemsList');
    const totalPriceSpan = document.getElementById('totalPrice');

    // Если мы не на странице корзины - выходим
    if (!cartItemsList) return;

    // Если корзина пуста
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">Корзина пуста</div>';
        if (totalPriceSpan) totalPriceSpan.innerText = '0 Р';
        return;
    }

    // Очищаем список перед отрисовкой
    cartItemsList.innerHTML = '';
    let total = 0; // Переменная для общей суммы

    // Перебираем товары в корзине
    cart.forEach((item, index) => {
        // Считаем сумму за этот товар
        const sum = item.price * item.quantity;
        total += sum; // Прибавляем к общей сумме

        // Создаем HTML-элемент для товара
        const row = document.createElement('div');
        row.className = 'cart-item'; // Добавляем класс для стилей

        // Заполняем данными
        row.innerHTML = `
            <div><strong>${item.name}</strong></div>       
            <div>${item.price} Р</div>                     
            <div>
                <!-- Минус -->
                <button class="qty-btn" onclick="changeQuantity(${index}, -1)" style="margin: 0 5px; padding: 2px 8px; cursor: pointer;">-</button>
                <span class="qty">${item.quantity}</span>  
                <!-- Плюс -->
                <button class="qty-btn" onclick="changeQuantity(${index}, 1)" style="margin: 0 5px; padding: 2px 8px; cursor: pointer;">+</button>
                
                <!-- Кнопка удаления (красный крестик) -->
                <button class="remove-btn" onclick="removeItem(${index})" style="margin-left: 10px; padding: 2px 8px; cursor: pointer; background: none; border: none; color: red; font-weight: bold; font-size: 16px;">✖</button>
            </div>
            <div><strong>${sum} Р</strong></div>        
        `;

        // Добавляем товар в корзину на странице
        cartItemsList.appendChild(row);
    });

    // Обновляем общую сумму
    if (totalPriceSpan) totalPriceSpan.innerText = total + ' Р';
}

// Изменение количества товара
// index - позиция в массиве, delta - на сколько изменить (+1 или -1)
function changeQuantity(index, delta) {
    // Проверяем, есть ли такой товар
    if (!cart[index]) return;

    // Вычисляем новое количество
    const newQuantity = cart[index].quantity + delta;

    if (newQuantity <= 0) {
        // Если количество <= 0, удаляем товар
        cart.splice(index, 1);
    } else {
        // Иначе обновляем количество
        cart[index].quantity = newQuantity;
    }

    // Сохраняем и обновляем отображение
    saveCart();
    updateCartDisplay();
}

// Удаление товара из корзины
function removeItem(index) {
    cart.splice(index, 1); // Удаляем товар из массива
    saveCart();            // Сохраняем и обновляем
    updateCartDisplay();
}

// Оформление заказа
function checkout() {
    // Проверяем, не пустая ли корзина
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }

    // Получаем общую сумму
    const total = document.getElementById('totalPrice').innerText || '0 Р';

    // Показываем сообщение с деталями заказа
    alert(`🎉 Спасибо за заказ!\nСумма: ${total}\nТовары: ${cart.map(i => `${i.name} (${i.quantity} шт.)`).join(', ')}`);

    // Очищаем корзину
    cart = [];
    saveCart(); // Сохраняем и обновляем
    updateCartDisplay();
}

// Ждем загрузки DOM и отрисовываем корзину
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay(); // Отрисовываем корзину
});