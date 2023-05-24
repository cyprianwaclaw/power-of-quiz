<template>
  <div
  class="base-input"
   :class="{ 'has-error': !!errorMessage, success: meta.valid }"
 >
  <div class="-mb-4">
    <label :for="name">{{ label }}</label>
    <textarea
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
  },
  successMessage: {
    type: String,
    default: "",
  },
  hasError: {
    type: Boolean,
  },
  errorMessage: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

let ErrorLogin: any = props.hasError;

const name = toRef(props, "name");
const { value: inputValue, errorMessage, handleBlur, handleChange, meta } = useField(
  name,
  undefined,
  {
    initialValue: props.value,
  }
);
</script>
<style scoped>

.success input:focus {
  border-color: #618cfb;
}
textarea {
  outline: none;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  padding-right: 6px;
  overflow: hidden;
height: 200px;
  border-color: white;
}
textarea::placeholder {
  font-size: 16px;
}
textarea:focus::placeholder {
  font-size: 0px;
}

.help-message {
  margin-top: -2px;
  margin-bottom: 8px;
  font-size: 12px;
}
</style>
