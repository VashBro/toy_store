// Обработчик клика по кнопке "Найти"
document.getElementById('searchButton').addEventListener('click', function() {
    searchProducts();
});

// Обработчик ввода в поле поиска
document.getElementById('searchInput').addEventListener('keyup', function(event) {
    // Если нажат Enter
    if (event.key === 'Enter') {
        searchProducts();
    }
});

// Основная функция поиска
function searchProducts() {
    // Получаем запрос и приводим к нижнему регистру
    let searchText = document.getElementById('searchInput').value.toLowerCase();

    // Находим все карточки товаров
    let products = document.querySelectorAll('.block1');

    // Счетчик найденных
    let foundCount = 0;

    // Перебираем каждую карточку
    products.forEach(product => {
        let productName = product.querySelector('.name').textContent.toLowerCase();

        // Если есть совпадение или поиск пустой
        if (productName.includes(searchText) || searchText === '') {
            // Показываем товар
            product.style.display = 'block';
            // Считаем только реальные совпадения
            if (searchText !== '' && productName.includes(searchText)) {
                foundCount++;
            }
        } else {
            // Иначе скрываем
            product.style.display = 'none';
        }
    });

    // Если ничего не нашли
    if (searchText !== '' && foundCount === 0) {
        alert(`❌ Товар "${searchText}" не найден!\nПопробуйте изменить запрос.`);
    }
}