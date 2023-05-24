<template>

  <!-- :class="{ 'has-error': ErrorLogin}" -->
  <!-- :class="{ 'has-error': !!errorMessage, success: meta.valid }" -->
    <div
     class="base-input"
    >
      <label :for="name">{{ label }}</label>
      <input
      class="base-input"
        :name="name"
        :id="name"
        :ErrorLogin="hasError"
        :hasError="hasError"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"
        @blur="handleBlur"
        />
        <!-- autofocus -->
  
      <div class="help-message" v-if="errorMessage || meta.valid">
      <p class="red">
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

  </style>
  