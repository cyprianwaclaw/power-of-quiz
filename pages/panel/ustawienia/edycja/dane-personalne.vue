<template>
  <ModalAlert
    v-if="isOpenSuccess"
    title="Zapisano dane"
    des="Wprowadzone dane zostały pomyślnie zapisane"
    closeButton="Okej"
    @close="ModalSuccess()"
  />

  <NuxtLayout name="edit-settings">
    <div class="mb-8">
      <h1 class="title-h1">Dane personalne</h1>
    </div>
    <div class="white-retangle">
      <Form
      @submit="updatePersonal"
      :validation-schema="schemaPersonal"
      v-slot="{ values, meta }"
      >
        <div class="row-table -mt-2">
          <InputNotSuccess
          name="name"
          :value="personal.name"
          type="text"
          placeholder="Imię"
        />
        </div>
        <div class="row-table">
          <InputNotSuccess
          name="surname"
          :value="personal.surname"
          type="text"
          placeholder="Nazwisko"
        />
        </div>
        <div class="row-table">
          <InputNotSuccess
          name="email"
          :value="personal.email"
          type="text"
          placeholder="Adres e-mail"
        />
        </div>
        <div class="row-table-end">
               <InputNotSuccess
              name="phone"
              :value="personal.phone"
              type="number"
              placeholder="Numer telefonu"
              />
        </div>
        <div class="mt-3 mb-4 mr-7 justify-end flex">
        <button class="button-primary" v-if="checkPersonal(values, meta.valid, personal)">
          Zapisz zmiany
        </button>
        <button class="button-primary-disabled cursor-not-allowed" v-else disabled>
          Zapisz zmiany
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
import { onInvalidSubmit, ChangePlaceholderInput,  ChangeDataInput } from "@/utils/function";

definePageMeta({
  middleware: "auth",
});


const isOpenSuccess = ref(false)

const userStore = useUser();
const { currentUser, getPersonal } = storeToRefs(userStore);
await userStore.getUser();
await userStore.getSettingsUser();
let user = currentUser.value;
let personal = getPersonal.value;

const updatePersonal = (values: any) => {
  userStore.updateUserPersonal(values.name, values.surname, values.email, values.phone);
  ModalSuccess();
};

const schemaPersonal = yup.object().shape({
  name: yup
    .string()
    .test("valid-name", "Nieprawidłowe imię", (value) => {
      if (!value) return true;
      const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż\s]*$/u;
      return nameRegex.test(value);
    })
    .max(20, "Imię nie może mieć więcej niż 20 znaków"),
  surname: yup
    .string()
    .test("valid-surname", "Nieprawidłowe nazwisko", (value) => {
      if (!value) return false;
      const surnameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż\s]*$/u;
      return surnameRegex.test(value);
    })
    .max(20, "Nazwisko nie może mieć więcej niż 20 znaków"),
  email: yup.string().test("valid-email", "Nieprawidłowy adres e-mail", (value) => {
    // if (!value) return false;
    if (!value || value === "") return true;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(value);
  }),
  phone: yup.string().test("valid-phone", "Błędny format numeru telefonu", (value) => {
    if (!value || value === "") return true;
    const phoneRegex = /^\d{9}$/;
    return phoneRegex.test(value) && parseInt(value) > 0;
  }),
});

const ModalSuccess=()=> {
isOpenSuccess.value =! isOpenSuccess.value
}
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