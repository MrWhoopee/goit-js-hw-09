const formData = { email: '', message: '' };

const refs = {
  form: document.querySelector('.feedback-form'),
};

const loadFormData = () => {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      const elements = refs.form.elements;

      formData.email = parsedData.email;
      formData.message = parsedData.message;

      elements.email.value = formData.email;
      elements.message.value = formData.message;
    } catch (error) {
      console.error('Помилка при завантаженні даних:', error);
    }
  }
};

loadFormData();

refs.form.addEventListener('input', event => {
  const { name, value } = event.target;

  formData[name] = value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem('feedback-form-state');

  formData.email = '';
  formData.message = '';

  refs.form.reset();
});
