<template>
  <div>
  <div class="fixed z-50 left-0 bottom-0 w-full" v-if="isOpen">
    <div class="blur-background-update"></div>
    <div class="modal-view-update">    
        <div class="px-7 py-7 grid ">
          <div v-if="success==true">
            <div class="flex justify-center w-full">
              <Icon name="ph:check-circle-light" size="72" class="green mb-3" />
            </div>
            <p class="edit-message-modal"><span class="green">Gratulacje!</span> Twoje zmiany zostały poprawnie zapisane </p>            
          </div>
          <div v-else>
            <div class="flex justify-center w-full">
              <Icon name="ph:x-circle-light" size="72" class="red mb-3" />
            </div>
            <p class="edit-message-modal"><span class="red">Wystąpił błąd!</span> Wprowadzone dane są błędne, sprawdź poprawność danych</p>            
          </div>
        </div>    
      <div v-if="success==true" class="border-top flex justify-end">
        <button class="button-modal primary-color" @click="Modal()">Okej</button>
      </div>
      <div v-else class="border-top flex justify-end">
        <button class="button-modal primary-color" @click="ModalError()">Popraw błędy</button>
      </div>
    </div>
  </div>
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
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { useUser } from "@/store/useUser";
import { onInvalidSubmit, ChangePlaceholderInput,  ChangeDataInput } from "@/utils/function";
import { isNullableTypeAnnotation } from "@babel/types";

definePageMeta({
  middleware: "auth",
});

const isOpen = ref(false)
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
  isOpen.value =! isOpen.value
  await userStore.updateUserFinancial(ibanNew, bank_nameNew, swiftNew);

}

function Modal() {
isOpen.value =! isOpen.value
window.location.reload();
}

function ModalError() {
  isOpen.value =! isOpen.value
  errorMessage.value = null
  // success.value = ''
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