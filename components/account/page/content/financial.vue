<template>
  <ModalAlert
    :modalActive="isSuccess"
    title="Zapisano"
    des="Gratulację! Twoje ustawienia zostały poprawnie zapisane"
    closeButton="Gotowe"
    status="success"
    @close="successShow()"
  />
  <!-- assasasa -->
  <div class="retangle">
    <p class="text-[22px] font-medium mb-8">Dane do wypłaty środków</p>
    <Form
      @submit="updateFinancial"
      :validation-schema="schemaFinancial"
      v-slot="{ values, meta }"
      >
      <div class="flex place-items-center gap-12">
        <div class="flex flex-col w-full gap-4">
          <InputNotSuccess
            name="bank_name"
            :value="financial?.bank_name"
            type="text"
            placeholder="Nazwa banku"
          />
          <div class="flex flex-row gap-6">
            <InputNotSuccess
              name="iban"
              :value="financial?.iban"
              type="text"
              placeholder="Number IBAN Twojego konta"
            />
            <InputNotSuccess
              name="swift"
              :value="financial?.swift"
              type="text"
              placeholder="Numer SWIFT banku"
            />
          </div>
        </div>
      </div>
      <div class="justify-end flex mt-10">
        <button class="button-primary" v-if="checkFinancial(values, meta, financial)">
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
import { Form } from "vee-validate";

const isSuccess = ref(false);
const successShow = () => {
  isSuccess.value = !isSuccess.value;
};
const userStore = useUser();
const { getFinancial } = storeToRefs(userStore);
await userStore.getSettingsUser();
let financial = getFinancial.value;


const updateFinancial = (values: any) => {
  userStore.updateUserFinancial(values.iban, values.bank_name, values.swift);
  console.log(values)
  successShow();
};

const schemaFinancial = yup.object().shape({
  bank_name: yup.string()
  .test("valid-name", "Nieprawidłowa nazwa banku", (value) => {
      if (!value) return true;
      const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ0-9][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s]*$/u;
      return nameRegex.test(value);
    }),
  iban: yup.string()
      .test("valid-iban", "Nieprawidłowy numer IBAN", (value) => {
        if (!value || value === "") return true;
        const polishIbanRegex = /^[A-Z]{2}\d{26}$/;
        return polishIbanRegex.test(value);
      })
      .max(28, "Numer IBAN ma 28 znaków"),

  swift: yup.string()
  .test("valid-swift", "Nieprawidłowy numer SWIFT", (value) => {
    if (!value || value === "") return true;
        const swiftRegex = /^[A-Z]{2}[A-Z0-9]{4}([A-Z0-9]{2})?$/;;
        return swiftRegex.test(value);
      })
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
