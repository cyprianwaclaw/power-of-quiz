<script setup lang="ts">
import { Form } from 'vee-validate';
import * as yup from 'yup';

function onSubmit(values:any) {
  alert(JSON.stringify(values, null, 2));
}

const schema = yup.object({
  email: yup.string().email().required(),
});
</script>

<template>
  <div>
    <h1>vee-validate Dynamic validation Triggers</h1>
    <p>
      This input can customize the validation triggers using "interaction
      modes". Try passing either `passive`, `aggressive`, `lazy` or `eager` and
      see how it changes the validation behavior.
    </p>

    <Form @submit="onSubmit" :validation-schema="schema">
      <label for="email">Email</label>
      <CustomField name="email" type="email" mode="aggressive"
      placeholder="tet"
      />

      <button type="submit">Submit</button>
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
  margin-bottom: 20px;
}

button {
  display: block;
}

form {
  padding: 20px;
  border: 1px solid black;
}
</style>
