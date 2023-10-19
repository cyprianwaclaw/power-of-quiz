<template>
  <div class="base-input" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label :for="name" class="label">{{ placeholder}}</label>
    <input
      class="base-input -mt-[2px]"
      :class="color"
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      />
      <div class="absolute w-[250px]">
        <p class="help-message" v-show="errorMessage || meta.valid">
          {{ errorMessage || successMessage }}
        </p>
      </div>
  </div>
  </template>
  
  <script setup lang="ts">
  import { toRef } from 'vue';
  import { useField } from 'vee-validate';
  
  const props = defineProps({
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    maxlength:{
      type: Number,
    },
    label: {
      type: String,
    },
    successMessage: {
      type: String,
      default: '',
    },
    hasError: {
      type: Boolean,
    },
    errorMessage: {
      type: String, 
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  });

  let ErrorLogin:any = props.hasError;

  const name = toRef(props, 'name');
  const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
  } = useField(name, undefined, {
    initialValue: props.value,
  });
  </script>
  <style scoped >
  .success input {
    border: 2px solid transparent;
    outline: none;
    color:#212427;
    background: white;
    border-color: #e6e8ea;
    padding: 0.5rem 0.75rem;
    transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out, background-color 0.2s ease-in-out;

}

.success input:focus {
    border-color: #618CFB;
}

input[type='number'] {
  -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
  </style>
  