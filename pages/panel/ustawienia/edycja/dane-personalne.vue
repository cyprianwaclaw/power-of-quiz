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
      <h1 class="title-h1">Dane personalne</h1>
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
            :color="namePlaceholder.class"
            name="name"
            label="Imię"
            id="name"
            type="name"
            :placeholder="namePlaceholder.placeholder"
          />
        </div>
        <div class="row-table">
          <InputSettings
            :color="surnamePlaceholder.class"
            name="surname"
            label="Nazwisko"
            id="surname"
            type="surname"
            :placeholder="surnamePlaceholder.placeholder"
          />
        </div>
        <div class="row-table">
          <InputSettings
            :color="emailPlaceholder.class"
            name="email"
            label="Adres e-mail"
            id="email"
            type="email"
            :placeholder="emailPlaceholder.placeholder"
          />
        </div>
        <div class="row-table-end">
          <InputSettings
            :color="phonePlaceholder.class"
            name="phone"
            label="Numer telefonu"
            id="phone"
            type="tel"
            :placeholder="phonePlaceholder.placeholder"
          />
        </div>
        <div
        class="mt-3 mb-4 mr-7 justify-end flex"
        v-if="
          values.name ||
          values.surname ||
          values.email||
          values.phone
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
const { getPersonal, errorMessage, success } = storeToRefs(userStore);
const personal = getPersonal.value;

const schema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*$/, "Imię nie może zawiarać cyfr")
    .max(20, "Imię nie może być dłuższe niż 20 znaków"),
  surname: Yup.string()
    .matches(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*$/, "Nazwisko nie może zawiarać cyfr")
    .max(35, "Nazwisko nie może być dłuższe niż 35 znaków"),
  email: Yup.string()
    .email("Błędny email")
    .max(35, "Email nie może być dłuższe niż 35  znaków"),
  // odpowiedź z api
  phone: Yup.string()
    .matches(/^[0-9 ]*$/)
    .max(9, "Numer telefonu musi mieć 9 cyfr"),
});

const namePlaceholder = ChangePlaceholderInput(personal.name, "Wprowadź imię");
const surnamePlaceholder = ChangePlaceholderInput(personal.surname, "Wprowadź nazwisko");
const emailPlaceholder = ChangePlaceholderInput(personal.email, "Wprowadź adres e-mail");
const phonePlaceholder = ChangePlaceholderInput(
  personal.phone,
  "Wprowadź numer telefonu"
);

async function onSubmit(values: any) {
  let { name, surname, email, phone } = values;
  let nameNew = ChangeDataInput(name, personal.name);
  let surnameNew = ChangeDataInput(surname, personal.surname);
  let emailNew = ChangeDataInput(email, personal.email);
  let phoneNew = ChangeDataInput(phone, personal.phone);
  await userStore.updateUserPersonal(nameNew, surnameNew, emailNew, phoneNew);
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