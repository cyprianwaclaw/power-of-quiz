<template>
    <div
    class="base-input"
     :class="{ 'has-error': !!errorMessage, success: meta.valid }"
   >
    <div class="base-input">
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
  
      <div class="help-message" v-if="errorMessage || meta.valid">
        <!-- <p class="red"> -->
          {{ errorMessage || successMessage }}
        <!-- </p> -->
      </div>
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { toRef } from "vue";
  import { useField } from "vee-validate";
  
  export type Input ={
    type?: string,
    value?: any,
    name: string,
    label?: string,
    successMessage?: string,
    hasError?: boolean,
    errorMessage?: string,
    placeholder?: any,
  }
  const props = defineProps<Input>()
  
  const name = toRef(props, "name");
  const { value: inputValue, errorMessage, handleBlur, handleChange, meta } = useField(
    name,
    undefined,
    {
      initialValue: props.value,
    }
  );
  </script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";
  .success input {
    border: 2px solid transparent;
    outline: none;
    color:#212427;
    background: white;
    border-color: white;
    padding: 0px;
    transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out, background-color 0.2s ease-in-out;

}
.has-error input{
  background-color: white;
  padding: 0px;
  color:#212427;
}
.has-error input:focus{
  padding: 0px;
  border-color: white;
}
.success input:focus {
  padding: 0px;
  border-color: white;
}

  input {
    outline: none;
    font-size: 16px;
    width: 100%;
    overflow: hidden;
    min-height: 30px;
  padding: 0px;
    max-height: 100px;
    font-weight: 500;
    border-color: white;
  }
  input::placeholder {
    font-size: 16px;
    font-weight: 400;
    color:$icon;
  }

  .help-message {
    position: absolute;
    margin-top: -3px;
    margin-bottom: 8px;
    font-size: 12px;
    width: 100vh;
}
  </style>
  