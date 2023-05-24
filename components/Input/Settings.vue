<template>
  <div class="base-input" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label :for="name" class="label">{{ label }}</label>
    <input
      class="base-input"
      :class="color"
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="help-message" v-show="errorMessage || meta.valid">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { provide } from 'vue'
import { useField } from "vee-validate";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  }, 
});

const name = toRef(props, "name");

const { value: inputValue, errorMessage, handleBlur, handleChange, meta } = useField(
  name,
  undefined,
  {
    initialValue: props.value,
  }
);

provide(/* key */ 'count', /* value */ 0)

const message = ref('hello')
provide('message', message)

// provide(/* key */ 'message', /* value */ 'hello!')
// console.log(meta)
</script>
<style scoped>
.base-input::placeholder {
  color: #212427;
  font-weight: 400;
  font-size: 16px;
}

.base-input:focus::placeholder {
  font-size: 0px;
}
.label {
  font-size: 14px;
  margin-bottom: -1px;
}
.success input {
  border: 2px solid transparent;
  outline: none;
  color: #212427;
  background: white;
  border-color: #e6e8ea;
  padding: 0.5rem 0.75rem;
  transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
}

.success input:focus {
  border-color: #618cfb;
}
</style>
