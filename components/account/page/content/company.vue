<template>
  <ModalAlert
    :modalActive="isSuccess"
    title="Zapisano"
    des="Gratulację! Twoje ustawienia zostały poprawnie zapisane"
    closeButton="Gotowe"
    status="success"
    @close="successShow()"
  />
  <div class="retangle">
    <p class="text-[22px] font-medium">Dane do faktury</p>
    <p class="mb-8 text-sm font-medium primary-color mt-1">
      Uzupełnij w przypadku chęci otrzymania faktury za zakupione pakiety
    </p>
    <Form
      @submit="updateCompany"
      :validation-schema="schemaCompany"
      @invalid-submit="onInvalidSubmit"
      v-slot="{ values, meta }"
    >
      <div class="flex place-items-center gap-12 flex-col">
        <div class="flex flex-col w-full gap-4">
          <InputNotSuccess
            name="name"
            :value="company.name"
            type="text"
            placeholder="Nazwa działalności gospodarczej"
          />
          <div class="flex flex-row gap-6">
            <InputNotSuccess
              name="nip"
              :value="company.nip"
              type="text"
              placeholder="Numer NIP"
            />
            <InputNotSuccess
              name="regon"
              :value="company.regon"
              type="number"
              placeholder="Numer REGON"
            />
          </div>
        </div>
        <div class="flex flex-col w-full gap-4">
          <div class="flex flex-row gap-3">
            <div class="w-[112px]">
              <InputNotSuccess
                name="postcode"
                :value="company.address.postcode"
                type="text"
                placeholder="Kod"
              />
            </div>
            <InputNotSuccess
              name="city"
              :value="company.address.city"
              type="text"
              placeholder="Miejscowość"
            />
          </div>
          <div class="flex flex-row gap-3">
            <InputNotSuccess
              name="street"
              :value="company.address.street"
              type="text"
              placeholder="Nazwa ulica"
            />
            <div class="w-[142px]">
              <InputNotSuccess
                name="building"
                :value="company.address.building_number"
                type="text"
                placeholder="Budynek"
              />
            </div>
            <div class="w-[142px]">
              <InputNotSuccess
                name="house"
                :value="company.address.house_number"
                type="text"
                placeholder="Lokal"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="justify-end flex mt-10">
        <button class="button-primary" v-if="checkCompany(values, meta, company)">
          Zapisz zmiany
        </button>
        <button class="button-primary-disabled cursor-not-allowed" v-else disabled>
          Zapisz zmiany
        </button>
      </div>
    </Form>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";
import * as yup from "yup";
import { Form, Field, useForm } from "vee-validate";

let isOpen = ref(false);
const isModal = () => {
  isOpen.value = !isOpen.value;
};
const isSuccess = ref(false);
const successShow = () => {
  isSuccess.value = !isSuccess.value;
};
const userStore = useUser();
const { getCompany } = storeToRefs(userStore);
await userStore.getUser();
await userStore.getSettingsUser();
let company = getCompany.value;

const updateCompany = (values: any) => {
      userStore.updateUserCompany(values.name, values.nip,values.regon, values.city, values.postcode, values.street, values.building, values.house );
      successShow();
};

const schemaCompany = yup.object().shape({
  name: yup
  .string()
    .test("valid-name", "Nieprawidłowe imię", (value) => {
      if (!value) return true;
      const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż\s]*$/u;
      return nameRegex.test(value);
    })
    .max(35, "Nazwa działalności nie może mieć więcej niż 35 znaków"),
  nip: yup.string()
    .matches(/^[0-9 ]*$/, "Dozwolone tylko cyfry")
    .max(10, "NIP ma 10 cyfr"),
  regon: yup.string()
    .matches(/^[0-9 ]*$/, "Dozwolone tylko cyfry")
    .max(9, "REGON ma 9 cyfr"),
    postcode: yup  .string()
    .test("valid-name", "Nieprawidłowy kod pocztowy", (value) => {
      if (!value) return true;
      const  nameRegex = /^[0-9]{2}-[0-9]{3}$/;
      return nameRegex.test(value);
    }),
    street: yup.string(),
    city: yup
    .string()
    .test("valid-name", "Nieprawidłowe imię", (value) => {
      if (!value) return true;
      const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż\s]*$/u;
      return nameRegex.test(value);
    })
    .max(20, "Nazwa miescowości nie może mieć więcej niż 20 znaków"),
    building: yup.string(),
    house: yup.string(),

});

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.retangle {
  border-radius: 12px;
  padding: 42px 80px;
  background-color: white;
  box-shadow: -6px 6px 7px 0px rgba(0, 0, 0, 0.05);
}
.avatar {
  border: 1px solid $border;
  border-radius: 2000px;
  width: 150px;
}
.camera {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
