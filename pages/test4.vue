<!-- <script setup lang="ts">
import { Field, Form, ErrorMessage, FieldArray, useForm } from 'vee-validate';
import * as yup from 'yup';

const initialData = {
  users: [
    {
      name: '',
      email: '',
    },
  ],
};

const schema = yup.object().shape({
  users: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required().label('Name'),
        email: yup.string().email().required().label('Email'),
      })
    )
    .strict(),
});

function onSubmit(values) {
  if (values.errors && values.errors.length > 0) {
    // Jeśli występują błędy, nie wykonuj akcji
    return;
  }

  console.log(JSON.stringify(values, null, 2));
}

function addUser(fields, push) {
  push({ email: '', name: '' });
}

const { meta, handleSubmit } = useForm(); // Zmienione
</script>

<template>
  <div>
    <h1>vee-validate array fields</h1>
    <Form
      @submit="handleSubmit(onSubmit)" 
      :initial-values="initialData"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <p></p>

      <FieldArray name="users" v-slot="{ fields, push, remove }">
        <fieldset
          class="InputGroup"
          v-for="(field, idx) in fields"
          :key="field.key"
        >
          <legend>User #{{ idx }}</legend>
          <label :for="`name_${idx}`">Name</label>
          <Field
            :id="`name_${idx}`"
            :name="`users[${idx}].name`"
            v-model="field.value.name"
            @input="field.value.name = $event.target.value"
          />
          <ErrorMessage :name="`users[${idx}].name`" />

          <label :for="`email_${idx}`">Email</label>
          <Field
            :id="`email_${idx}`"
            :name="`users[${idx}].email`"
            type="email"
            v-model="field.value.email"
            @input="field.value.email = $event.target.value"
          />
          <ErrorMessage :name="`users[${idx}].email`" />
          <button type="button" @click="remove(idx)">X</button>
        </fieldset>

        <button type="button" @click="addUser(fields, push)">
          Add User +
        </button>
      </FieldArray>

      <button type="submit">Submit</button>
      <pre>{{ errors }}</pre>
      <pre>{{ meta }}</pre>
    </Form>
  </div>
</template>

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
</style> -->
<template>
  <div>
    <button @click="loadComponent('archive')">Load Archive Component</button>
    <button @click="loadComponent('posts')">Load Posts Component</button>
    <button @click="loadComponent('home')">Load Home Component</button>

    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentComponent = ref();

const loadComponent = async (componentName) => {
  const component = await import(`@/components/${componentName}.vue`);
  currentComponent.value = component.default || component;
};

onMounted(() => {
  // Inicjalnie ładujemy komponent home jako domyślny
  loadComponent('home');
});
</script>