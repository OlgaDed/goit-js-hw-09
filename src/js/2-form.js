console.log('Form script loaded');

// Ключ для локального сховища
const STORAGE_KEY = 'feedback-form-state';

// Об'єкт для збереження даних форми
const formData = {
  email: '',
  message: '',
};

// Отримуємо форму та її поля
const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

// --- 1. Відновлюємо дані з локального сховища при завантаженні ---
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  const parsedData = JSON.parse(savedData);
  formData.email = parsedData.email || '';
  formData.message = parsedData.message || '';
  emailInput.value = formData.email;
  messageInput.value = formData.message;
}

// --- 2. Слухаємо подію input на формі ---
form.addEventListener('input', event => {
  const { name, value } = event.target;

  // Оновлюємо об'єкт formData
  formData[name] = value.trim();

  // Зберігаємо в локальне сховище
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// --- 3. Слухаємо подію submit ---
form.addEventListener('submit', event => {
  event.preventDefault();

  // Перевіряємо, чи обидва поля заповнені
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  // Виводимо об'єкт у консоль
  console.log(formData);

  // Очищаємо форму, об'єкт і сховище
  form.reset();
  formData.email = '';
  formData.message = '';
  localStorage.removeItem(STORAGE_KEY);
});
