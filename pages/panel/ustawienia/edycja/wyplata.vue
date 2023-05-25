<template>
  <ModalAlert
    v-if="isOpenSuccess"
    title="Zapisano dane"
    des="Wprowadzone dane zostały pomyślnie zapisane"
    closeButton="Okej"
    @close="ModalSuccess()"
  />
  <ModalAlert
  v-if="isOpenError"
  title="Uups!"
  des="Wprowdzone dane są błędne, zweryfikuj ich poprawność i spróbuj ponownie"
  closeButton="Próbuje dalej"
  @close="ModalError()"
/>

  <NuxtLayout name="edit-settings">
    <div class="mb-8">
      <h1 class="title-h1">Wypłata środków</h1>
    </div>
    <div class="white-retangle">
      <Form
        @submit="onSubmit"
        v-slot="{values}"
        :validation-schema="schema"
        @invalid-submit="onInvalidSubmit"
      >
        <div class="row-table -mt-2">
          <InputSettings
            :color="ibanPlaceholder.class"
            name="iban"
            label="Numer IBAN"
            v-model="test"
            id="iban"
            type="text"
            :placeholder="ibanPlaceholder.placeholder"
          />
        </div>
        <div class="row-table">
          <InputSettings
            :color="bank_namePlaceholder.class"
            name="bank_name"
            label="Nazwa banku"
            id="bank_name"
            type="text"
            :placeholder="bank_namePlaceholder.placeholder"
          />
        </div>
        <div class="row-table-end">
          <InputSettings
            :color="swiftPlaceholder.class"
            name="swift"
            label="Kod SWIFT"
            id="swift"
            type="text"
            :placeholder="swiftPlaceholder.placeholder"
          />
        </div>
        <div
        class="mt-3 mb-4 mr-7 justify-end flex"
        v-if="
          values.iban ||
          values.bank_name ||
          values.swift
            ? false
            : true
        "
      >
        <button class="button-primary-disabled" disabled id="submit" type="submit">
          Gotowe
        </button>
      </div>
      <div v-else   class="mt-3 mb-4 mr-7 justify-end flex">
        <button class="button-primary" id="submit" type="submit">Gotowe</button>
      </div>
      </Form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { useUser } from "@/store/useUser";
import { onInvalidSubmit, ChangePlaceholderInput,  ChangeDataInput } from "@/utils/function";

definePageMeta({
  middleware: "auth",
});

const isOpenError = ref(false)
const isOpenSuccess = ref(false)
const userStore = useUser();
await userStore.getSettingsUser();
const { getFinancial, errorMessage, success } = storeToRefs(userStore);
const financial = getFinancial.value;

const schema = Yup.object().shape({
  iban: Yup.string().matches(/[A-Z]{2}\d{26}$/, "Błędny numer IBAN"),

  bank_name: Yup.string(),

  swift: Yup.string().max(8, "Kod SWIFT posiada 8 znaków"),


});

const ibanPlaceholder = ChangePlaceholderInput(financial.iban, "Wprowadź numer IBAN");
const bank_namePlaceholder = ChangePlaceholderInput(financial.bank_name, "Wprowadź nazwę banku");
const swiftPlaceholder = ChangePlaceholderInput(financial.swift, "Wprowadź kod SWIFT");


async function onSubmit(values: any) {
  let { iban, bank_name, swift } = values;

  let ibanNew = ChangeDataInput(iban, financial.iban);
  let bank_nameNew = ChangeDataInput(bank_name, financial.bank_name);
  let swiftNew = ChangeDataInput(swift, financial.swift);
  await userStore.updateUserFinancial(ibanNew, bank_nameNew, swiftNew);
witchModal()
}

const witchModal = () => {
if(success){
  return ModalSuccess()
} else{
  return ModalError()
}
}


const ModalSuccess=()=> {
isOpenSuccess.value =! isOpenSuccess.value
}
const ModalError=()=> {
isOpenError.value =! isOpenError.value
}


const test = ref('raz')

</script>

<style scoped>
.row-table {
  border-bottom: 1px solid #ededed;
  padding: 17px 28px 21px 9px;
  margin-left: 20px;
}
.row-table-end {
  padding: 16px 28px 16px 9px;
  margin-left: 20px;
}
</style>