<template>
  <div>

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
      <div class="mb-10">
        <h1 class="title-h1">Dane do faktury</h1>
      </div>
      <Form
        v-slot="{ values }"
        @submit="onSubmit"
        :validation-schema="schema"
        @invalid-submit="onInvalidSubmit"
      >
        <div class="white-retangle">
          <div class="row-table -mt-3">
            <InputSettings
              :color="company_namePlaceholder.class"
              name="company_name"
              label="Nazwa działalności"
              id="company_name"
              type="company_name"
              :placeholder="company_namePlaceholder.placeholder"
            />
          </div>
          <div class="row-table">
            <InputSettings
              :color="nipPlaceholder.class"
              name="nip"
              label="Numer NIP"
              id="nip"
              type="nip"
              :placeholder="nipPlaceholder.placeholder"
            />
          </div>
          <div class="row-table-end">
            <InputSettings
              :color="regonPlaceholder.class"
              name="regon"
              label="Numer REGON"
              id="regon"
              type="regon"
              :placeholder="regonPlaceholder.placeholder"
            />
          </div>
        </div>
        <div class="mb-7 mt-14">
          <h1 class="title-h2">Siedziba działalności</h1>
        </div>
        <div class="white-retangle">
          <div class="row-table -mt-3">
            <InputSettings
              :color="postcodePlaceholder.class"
              name="postcode"
              label="Kod pocztowy"
              id="postcode"
              type="postcode"
              :placeholder="postcodePlaceholder.placeholder"
            />
          </div>
          <div class="row-table">
            <InputSettings
              :color="cityPlaceholder.class"
              name="city"
              label="Miejscowość"
              id="city"
              type="city"
              :placeholder="cityPlaceholder.placeholder"
            />
          </div>
          <div class="row-table">
            <InputSettings
              :color="streetPlaceholder.class"
              name="street"
              label="Nazwa ulicy"
              id="street"
              type="street"
              :placeholder="streetPlaceholder.placeholder"
            />
          </div>
          <div class="row-table">
            <InputSettings
              :color="building_numberPlaceholder.class"
              name="building_number"
              label="Numer mieszkania"
              id="building_number"
              type="building_number"
              :placeholder="building_numberPlaceholder.placeholder"
            />
          </div>
          <div class="row-table-end">
            <InputSettings
              :color="house_numberPlaceholder.class"
              name="house_number"
              label="Numer lokalu"
              id="house_number"
              type="house_number"
              :placeholder="house_numberPlaceholder.placeholder"
            />
          </div>
        </div>
        <!-- wszystkie dane value, z pól, czyli to co wpisujemy. gdy choć jedno jest 
        'napisane' zmienić button na aktywny plus dodać v-slot do form -->
        <div
          class="mt-8 justify-end flex"
          v-if="
            values.company_name ||
            values.nip ||
            values.regon ||
            values.city ||
            values.street ||
            values.postcode ||
            values.building_number ||
            values.house_number
              ? false
              : true
          "
        >
          <button class="button-primary-disabled" disabled id="submit" type="submit">
            Gotowe
          </button>
        </div>
        <div v-else class="mt-8 justify-end flex">
          <button class="button-primary" id="submit" type="submit">Gotowe</button>
        </div>
        <!-- koniec button disabled -->
      </Form>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { useUser } from "@/store/useUser";
import {
  onInvalidSubmit,
  ChangePlaceholderInput,
  ChangeDataInput,
} from "@/utils/function";

definePageMeta({
  middleware: "auth",
});

const isOpenError = ref(false)
const isOpenSuccess = ref(false)
const userStore = useUser();
await userStore.getSettingsUser();
const { getCompany, success, errorMessage } = storeToRefs(userStore);
const allCompany = getCompany.value;
const company = allCompany.address;

const schema = Yup.object().shape({
  company_name: Yup.string(),
  nip: Yup.string()
    .matches(/^[0-9 ]*$/, "Dozwolone tylko cyfry")
    .max(10, "NIP ma 10 cyfr"),
  regon: Yup.string()
    .matches(/^[0-9 ]*$/, "Dozwolone tylko cyfry")
    .max(9, "REGON ma 9 cyfr"),
    postcode: Yup.string(),
    street: Yup.string(),
    city: Yup.string(),
    building_numbere: Yup.string(),
    house_number: Yup.string(),

});

const company_namePlaceholder = ChangePlaceholderInput(
  allCompany.name,
  "wprowadź nazwę działalności"
);
const nipPlaceholder = ChangePlaceholderInput(allCompany.nip, "wprowadź numer NIP");
const regonPlaceholder = ChangePlaceholderInput(allCompany.regon, "wprowadź numer REGON");
const cityPlaceholder = ChangePlaceholderInput(company.city, "wprowadź imię");
const postcodePlaceholder = ChangePlaceholderInput(company.postcode, "wprowadź imię");
const streetPlaceholder = ChangePlaceholderInput(company.street, "wprowadź nazwisko");
const building_numberPlaceholder = ChangePlaceholderInput(
  company.building_number,
  "wprowadź adres e-mail"
);
const house_numberPlaceholder = ChangePlaceholderInput(
  company.house_number,
  "wprowadź numer telefonu"
);

async function onSubmit(values: any) {
  let {
    company_name,
    nip,
    regon,
    city,
    postcode,
    street,
    building_number,
    house_number,
  } = values;

  let company_nameNew = ChangeDataInput(company_name, allCompany.name);
  let nipNew = ChangeDataInput(nip, allCompany.nip);
  let regonNew = ChangeDataInput(regon, allCompany.regon);
  let cityNew = ChangeDataInput(city, company.city);
  let postcodeNew = ChangeDataInput(postcode, company.postcode);
  let streetNew = ChangeDataInput(street, company.street);
  let building_numberNew = ChangeDataInput(building_number, company.building_number);
  let house_numberNew = ChangeDataInput(house_number, company.house_number);

  await userStore.updateUserCompany(
    company_nameNew,
    nipNew,
    regonNew,
    cityNew,
    postcodeNew,
    streetNew,
    building_numberNew,
    house_numberNew
  );
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
  padding: 16px 28px 14px 9px;
  margin-left: 20px;
}

</style>
