<template>
  <ModalAlert
    :modalActive="isOpenSuccess"
    title="Zapisano dane"
    des="Wprowadzone dane zostały pomyślnie zapisane"
    closeButton="Okej"
    @close="ModalSuccess()"
  />
  <ModalAlert
    :modalActive="isOpenError"
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
        v-slot="{ values, meta }"
        :validation-schema="schemaFinancial"
      >
        <div class="row-table -mt-2">
          <InputNotSuccess
            name="bank_name"
            :value="financial?.bank_name"
            type="text"
            placeholder="Nazwa banku"
          />
        </div>
        <div class="row-table">
          <InputNotSuccess
          name="iban"
          :value="financial?.iban"
          type="text"
          placeholder="Number IBAN"
        />
        </div>
        <div class="row-table-end">
          <InputNotSuccess
              name="swift"
              :value="financial?.swift"
              type="text"
              placeholder="Numer SWIFT"
            />
        </div>
        <div class="mt-3 mb-4 mr-7 justify-end flex">
          <button  v-if="checkFinancial(values, meta.valid, financial)" class="button-primary" id="submit" type="submit">Gotowe</button>
          <button class="button-primary-disabled" disabled v-else>
            Gotowe
          </button>
        </div>
      </Form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { useUser } from "@/store/useUser";

definePageMeta({
  middleware: "auth",
});

const isOpenError = ref(false);
const isOpenSuccess = ref(false);
const userStore = useUser();
await userStore.getSettingsUser();
const { getFinancial, errorMessage, success } = storeToRefs(userStore);
const financial = getFinancial.value;

const schemaFinancial = yup.object().shape({
  bank_name: yup
    .string()
    .test("valid-name", "Nieprawidłowa nazwa banku", (value) => {
      if (!value) return true;
      const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ0-9][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s]*$/u;
      return nameRegex.test(value);
    })
    .required("Pole wymagane"),
  iban: yup
    .string()
    .test("valid-iban", "Nieprawidłowy numer IBAN", (value) => {
      if (!value || value === "") return true;
      const polishIbanRegex = /^[A-Z]{2}\d{26}$/;
      return polishIbanRegex.test(value);
    })
    .max(28, "Numer IBAN ma 28 znaków")
    .required("Pole wymagane"),

  swift: yup
    .string()
    .test("valid-swift", "Nieprawidłowy numer SWIFT", (value) => {
      if (!value || value === "") return true;
      const swiftRegex = /^[A-Z]{2}[A-Z0-9]{4}([A-Z0-9]{2})?$/;
      return swiftRegex.test(value);
    })
    .required("Pole wymagane"),
});

const updateFinancial = (values: any) => {
  userStore.updateUserFinancial(values.iban, values.bank_name, values.swift);
  ModalSuccess();
};

const witchModal = () => {
  if (success) {
    return ModalSuccess();
  } else {
    return ModalError();
  }
};

const ModalSuccess = () => {
  isOpenSuccess.value = !isOpenSuccess.value;
};
const ModalError = () => {
  isOpenError.value = !isOpenError.value;
};

const test = ref("raz");
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
