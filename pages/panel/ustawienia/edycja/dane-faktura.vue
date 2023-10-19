<template>
  <div>
    <ModalAlert
      v-if="isOpenSuccess"
      title="Zapisano dane"
      des="Wprowadzone dane zostały pomyślnie zapisane"
      closeButton="Okej"
      @close="ModalSuccess()"
    />
    <NuxtLayout name="edit-settings">
      <div class="mb-10">
        <h1 class="title-h1">Dane do faktury</h1>
      </div>
      <Form
      @submit="updateCompany"
      :validation-schema="schemaCompany"
      v-slot="{ values, meta }"
        >
        <div class="white-retangle">
          <div class="row-table -mt-3">
            <InputNotSuccess
            name="name"
            :value="company?.name"
            type="text"
            placeholder="Nazwa działalności gospodarczej"
          />
          </div>
          <div class="row-table">
            <InputNotSuccess
            name="nip"
            :value="company?.nip"
            type="text"
            placeholder="Numer NIP"
          />
          </div>
          <div class="row-table-end">
            <InputNotSuccess
            name="regon"
            :value="company?.regon"
            type="text"
            placeholder="Numer REGON"
          />
          </div>
        </div>
        <div class="mb-7 mt-14">
          <h1 class="title-h2">Siedziba działalności</h1>
        </div>
        <div class="white-retangle">
          <div class="row-table -mt-3">
            <InputNotSuccess
            name="postcode"
            :value="company?.address?.postcode"
            type="text"
            placeholder="Kod"
          />
          </div>
          <div class="row-table">
            <InputNotSuccess
            name="city"
            :value="company?.address?.city"
            type="text"
            placeholder="Miejscowość"
          />
          </div>
          <div class="row-table">
            <InputNotSuccess
              name="street"
              :value="company?.address?.street"
              type="text"
              placeholder="Nazwa ulica"
            />
          </div>
          <div class="row-table">
            <InputNotSuccess
                name="building"
                :value="company?.address?.building_number"
                type="text"
                placeholder="Budynek"
              />
          </div>
          <div class="row-table-end">
            <InputNotSuccess
            name="house"
            :value="company?.address?.house_number"
            type="text"
            placeholder="Lokal"
          />
          </div>
        </div>
      <div class="justify-end flex mt-10">
     <button class="button-primary" v-if="checkCompany(values, meta.valid, company)">
         Zapisz zmiany
        </button>
        <button class="button-primary-disabled cursor-not-allowed" v-else disabled>
          Zapisz zmiany
        </button>
      </div>
   </Form> 
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { useUser } from "@/store/useUser";

definePageMeta({
  middleware: "auth",
});

const userStore = useUser();
const { getCompany } = storeToRefs(userStore);
await userStore.getUser();
await userStore.getSettingsUser();
let company = getCompany.value;

const isOpenSuccess = ref(false);
const updateCompany = (values: any) => {
      userStore.updateUserCompany(values.name, values.nip,values.regon, values.city, values.postcode, values.street, values.building, values.house );
      ModalSuccess ();
};

const schemaCompany = yup.object().shape({
  name: yup
    .string()
    .test("valid-name", "Nieprawidłowa nazwa działalności", (value) => {
      if (!value) return true;
      const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s]*$/u;
      return nameRegex.test(value);
    })
    .max(35, "Nazwa działalności nie może mieć więcej niż 35 znaków")
    .required("Pole wymagane"),
  nip: yup
    .string()
    .matches(/^[0-9 ]*$/, "Dozwolone tylko cyfry")
    .min(10, "NIP ma 10 cyfr")
    .max(10, "NIP ma 10 cyfr")
    .required("Pole wymagane"),
  regon: yup
    .string()
    .matches(/^[0-9 ]*$/, "Dozwolone tylko cyfry")
    .min(9, "REGON ma 9 cyfr")
    .max(9, "REGON ma 9 cyfr"),
  postcode: yup
    .string()
    .test("valid-name", "Nieprawidłowy kod pocztowy", (value) => {
      if (!value) return true;
      const nameRegex = /^[0-9]{2}-[0-9]{3}$/;
      return nameRegex.test(value);
    })
    .required("Pole wymagane"),
  street: yup.string().test("valid-name", "Nieprawidłowa nazwa ulicy", (value) => {
    if (!value) return true;
    const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ0-9][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s]*$/u;
    return nameRegex.test(value);
  }),
  city: yup
    .string()
    .test("valid-name", "Nieprawidłowa nazwa miejscowości", (value) => {
      if (!value) return true;
      const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż\s]*$/u;
      return nameRegex.test(value);
    })
    .required("Pole wymagane")
    .max(20, "Nazwa miescowości nie może mieć więcej niż 20 znaków"),
  building: yup.string().required("Pole wymagane"),
  house: yup.string().required("Pole wymagane"),
});

const ModalSuccess = () => {
  isOpenSuccess.value = !isOpenSuccess.value;
};
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
