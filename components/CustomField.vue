<template>
    <div class="relative">
      <input type="text" v-on="handlers" :value="value" :placeholder="placeholder" />
      <span class="errorM">{{ errorMessage }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, toRef } from 'vue';
  import { useField } from 'vee-validate';
  import { modes } from '@/interactionModes';
  
  const props = defineProps({
    name: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    mode: {
      type: String,
      default: 'aggressive',
    },
  });
  
  // use `toRef` to create reactive references to `name` prop which is passed to `useField`
  // this is important because vee-validte needs to know if the field name changes
  // https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
  const { meta, value, errorMessage, handleChange, handleBlur } = useField(
    toRef(props, 'name'),
    null,
    {
      validateOnValueUpdate: false,
    }
  );
  
  // generates the listeners
  const handlers = computed(() => {
    const on = {
      blur: handleBlur,
      // default input event to sync the value
      // the `false` here prevents validation
      input: [(e) => handleChange(e, false)],
    };
  
    // Get list of validation events based on the current mode
    const triggers = modes[props.mode]({
      errorMessage,
      meta,
    });
  
    // add them to the "on" handlers object
    triggers.forEach((t) => {
      if (Array.isArray(on[t])) {
        on[t].push(handleChange);
      } else {
        on[t] = handleChange;
      }
    });
  
    return on;
  });
  </script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
input{
  border: 1px solid white;
  margin: 0px;
  padding: 7px 0px 0px 0px;
  font-size: 16px;
  font-weight: 500;
}
input::placeholder {
  font-size: 16px;
  font-weight: 400;
  color:$icon;
}
.errorM{
  position: absolute;
 // margin-top: -3px;
 // margin-bottom: 8px;
  font-size: 12px;
  width: 100vh;
  left: 0px;
  bottom: -14px;
color: $color-error;
}
</style>
  