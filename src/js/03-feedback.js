import throttle from 'lodash.throttle';
const formEl = document.querySelector('form');

formEl.addEventListener(
  'input',
  throttle(onInputForm, 500, { leading: false })
);
formEl.addEventListener('submit', onSubmitForm);

startValueForm();

function startValueForm() {
  const formValue = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formValue === null) {
    return;
  }
  formEl.elements.email.value = formValue.email;
  formEl.elements.message.value = formValue.message;
}

function onInputForm() {
  const email = formEl.elements.email.value;
  const message = formEl.elements.message.value;
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ email, message })
  );
}
function onSubmitForm(e) {
  e.preventDefault();
  const email = formEl.elements.email.value;
  const message = formEl.elements.message.value;
  console.log({ email, message });
  formEl.reset();
  localStorage.removeItem('feedback-form-state');
}
