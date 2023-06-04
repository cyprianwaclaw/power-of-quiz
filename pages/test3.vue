<template>
  <div>
    <h1>vee-validate array fields</h1>

    <Form
      @submit="handleSubmit"
      :initial-values="initialData"
      :validation-schema="schema"
      v-slot="{ errors, meta, values }"
    >
      <p></p>

      <FieldArray name="users" v-slot="{ fields, push, remove }">
        <fieldset
          class="InputGroup"
          v-for="(field, idx) in fields"
          :key="field.key"
        >
          <legend>User #{{ idx }}</legend>
          <CustomField
            :name="`users[${idx}].name`"
            mode="aggressive"
            v-model="field.value.name"
            :onBlur="() => handleBlur(idx)"
          />
          <ErrorMessage :name="`users[${idx}].name`" :should-show="shouldShowError(idx, errors)" />

          <CustomField
            :name="`users[${idx}].email`"
            mode="aggressive"
            v-model="field.value.email"
            type="email"
            :onBlur="() => handleBlur(idx)"
          />
          <ErrorMessage :name="`users[${idx}].email`" :should-show="shouldShowError(idx, errors)" />
          <button type="button" @click="remove(idx)">X</button>
        </fieldset>

        <button type="button" @click="addUser(fields, push)">
          Add User +
        </button>
      </FieldArray>

      <button type="submit">Submit</button>
      <!-- {{ values }}
      <pre>{{ errors }}</pre>
      <pre>{{ meta }}</pre> -->
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Field, Form, ErrorMessage, FieldArray, useForm, useField } from 'vee-validate';
import * as yup from 'yup';

interface User {
  name: string;
  email: string;
}

interface FormData {
  users: User[];
}

const initialData: FormData = {
  users: [
    {
      name: '',
      email: '',
    },
  ],
};


const { handleSubmit: handleFormSubmit, resetForm } = useForm<FormData>();

const schema = yup.object().shape({
  users: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().test(
          'valid-name',
          'Invalid name format',
          (value) => {
            if (!value) return true;
            const nameRegex = /^[A-Z][a-zA-Z\s]*$/;
            return nameRegex.test(value);
          }
        ),
        email: yup.string().test(
          'valid-email',
          'Invalid email format',
          (value) => {
            if (!value) return true;
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            return emailRegex.test(value);
          }
        ),
      })
    )
    .strict(),
});

// function addUser(fields: any[], push: (value: User) => void) {
//   push({ email: '', name: '' });
// }

function addUser(fields: any[], push: (value: User) => void) {
  // const { value: email, meta: emailMeta, errors: emailErrors } = useField('email');
  // const { value: name, meta: nameMeta, errors: nameErrors } = useField('name');

  // const form = useForm();
  
  // if (!form.value.meta.valid) {
  //   // Jeśli istnieją błędy walidacji w formularzu, nie dodawaj nowego użytkownika
  //   return;
  // }

  // if (emailErrors.value || nameErrors.value) {
  //   // Jeśli istnieją błędy walidacji na polu email lub name, nie dodawaj nowego użytkownika
  //   return;
  // }
  push({ email: '', name: '' });
}

function handleSubmit(values: any) {
  if (values.errors && values.errors.length > 0) {
    // Jeśli występują błędy, nie wykonuj akcji
    return;
  }
  // Sprawdź, czy ostatni wiersz w tabeli jest pusty
  const lastIndex = values.users.length - 1;
  const lastUser = values.users[lastIndex];
  if (!lastUser.name && !lastUser.email) {
    // Jeśli ostatni wiersz jest pusty, usuń go z tablicy
    values.users.splice(lastIndex, 1);
  }
  initialData.push({ email: '', name: '' });
  console.log(JSON.stringify(values, null, 2));
  // Tutaj możesz dodać logikę wysyłania danych do serwera lub inną odpowiednią akcję

  // Jeśli chcesz zresetować formularz po zatwierdzeniu
  // możesz wywołać funkcję resetForm()
  // np. resetForm();
}
const activeFields: number[] = [];

function shouldShowError(idx: number, errors: any) {
  return activeFields.includes(idx) && errors && errors.length > 0;
}

function handleBlur(idx: number) {
  const index = activeFields.indexOf(idx);
  if (index > -1) {
    activeFields.splice(index, 1);
  }
}
</script>

<style scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  max-width: 500px;
}

input {
  display: block;
}

span {
  display: block;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 20px;
}

button {
  display: block;
}

button[type='submit'] {
  margin-top: 10px;
}

form {
  padding: 20px;
  border: 1px solid black;
}

form + form {
  margin-top: 20px;
}

.InputGroup {
  padding: 10px;
  border: 2px dotted black;
  margin-bottom: 30px;
  position: relative;
}

.InputGroup button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>