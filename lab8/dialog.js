// Знаходимо основні елементи інтерфейсу
const openBtn = document.getElementById('open-dialog-btn');
const modal = document.getElementById('modal-container');
const closeBtn = document.getElementById('close-btn');

// Змінна для зберігання елемента, який був активним до відкриття модального вікна
let previousFocusedElement;

/**
 * Функція для відкриття модального вікна
 */
function showModal() {
  // Запам'ятовуємо елемент, на якому стояв фокус
  previousFocusedElement = document.activeElement;

  // Робимо модальне вікно видимим
  modal.hidden = false;

  // Переносимо фокус всередину модального вікна
  modal.focus();

  // Додаємо слухач подій для відстеження натискань клавіш (Esc та Tab)
  document.addEventListener('keydown', handleKeyDown);

  // Додаємо допоміжний клас до body, щоб вимкнути прокрутку фонової сторінки
  document.body.classList.add('modal-open');
}

/**
 * Функція для закриття модального вікна
 */
function hideModal() {
  // Приховуємо модальне вікно
  modal.hidden = true;

  // Видаляємо слухач подій клавіатури
  document.removeEventListener('keydown', handleKeyDown);

  // Дозволяємо прокрутку основної сторінки
  document.body.classList.remove('modal-open');

  // Повертаємо фокус на елемент, на якому він був до відкриття модального вікна
  if (previousFocusedElement) {
    previousFocusedElement.focus();
  }
}