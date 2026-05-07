const tabs = document.querySelectorAll('[role="tab"]');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');

    tabPanels.forEach(panel => panel.hidden = true);
    const controls = tab.getAttribute('aria-controls');
    const selectedPanel = document.getElementById(controls);
    if (selectedPanel) {
      selectedPanel.hidden = false;
    }
  });
});

const modal = document.getElementById('modal-container');
let previousFocusedElement;

function showModal() {
  previousFocusedElement = document.activeElement;
  modal.hidden = false;
  setTimeout(() => modal.focus(), 10);

  document.addEventListener('keydown', handleKeyDown);
  document.body.classList.add('modal-open');
}

function hideModal() {
  modal.hidden = true;
  document.removeEventListener('keydown', handleKeyDown);
  document.body.classList.remove('modal-open');

  if (previousFocusedElement) {
    previousFocusedElement.focus();
  }
}

function handleKeyDown(event) {
  // Закриття вікна при натисканні клавіші Escape
  if (event.key === 'Escape') {
    hideModal();
  }

  // Обробка клавіші Tab для зациклювання фокусу
  if (event.key === 'Tab') {
    // Отримуємо всі елементи, які можуть приймати фокус усередині модального вікна
    const focusableElements = modal.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) { 
      // Якщо натиснуто Shift + Tab (рух назад)
      // Якщо ми на першому елементі — перекидаємо фокус на останній
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault(); // Скасовуємо стандартну дію, щоб не вийти за межі
      }
    } else { 
      // Якщо натиснути просто Tab рух вперед
      // Якщо ми на останньому елементі — перекидаємо фокус на перший
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault(); // Запобігаємо виходу фокусу на адресу сторінку чи панель браузера
      }
    }
  }
}