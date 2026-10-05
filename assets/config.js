/* Единственное место для реквизитов. Заменяйте значения в кавычках.
 * Телефон — международный формат. Telegram — полный https://t.me/... URL.
 * PAYMENT: после создания и проверки настоящего платёжного процесса
 * укажите HTTPS URL входа в него. Не указывайте пароли/API keys.
 * Сейчас URL пустой и кнопка disabled. Этот файл не реализует оплату.
 */
window.DESTINY22_CONFIG = Object.freeze({
  fullName: '[FULL_NAME]',
  inn: '[INN]',
  city: '[CITY]',
  email: '[EMAIL_SUPPORT]',
  phone: '[PHONE]',
  telegram: '[TELEGRAM_OPTIONAL]',
  paymentUrl: ''
});
