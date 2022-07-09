import throttle from 'lodash.throttle';
const formEl = document.querySelector('form');

checkLocalStorageFormValue();
formEl.addEventListener(
  'input',
  throttle(onInputForm, 500, { leading: false })
);
formEl.addEventListener('submit', onSubmitForm);

function checkLocalStorageFormValue() {
  const formValue = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formValue === null) {
    return;
  }
  setStartFormValue(formValue);
}

function setStartFormValue({ email, message }) {
  formEl.elements.email.value = email;
  formEl.elements.message.value = message;
}
function onInputForm() {
  const formValue = getFormValue();

  localStorage.setItem('feedback-form-state', JSON.stringify(formValue));
}
function getFormValue() {
  const email = formEl.elements.email.value;
  const message = formEl.elements.message.value;
  return { email, message };
}
function onSubmitForm(e) {
  e.preventDefault();
  const formValue = getFormValue();
  console.log(formValue);
  formEl.reset();
  localStorage.removeItem('feedback-form-state');
}
