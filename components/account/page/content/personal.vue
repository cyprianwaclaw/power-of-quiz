<template>
    <ModalAlert
      :modalActive="isSuccess"
      title="Zapisano"
      des="Gratulację! Twoje ustawienia zostały poprawnie zapisane"
      closeButton="Gotowe"
      status="success"
      @close="successShow()"
    />
    <ModalAlert :modalActive="isOpen" :title="titleImage()" @close="isModal()">
      <template #content>
        <LazyModalContentCropAvatar @close="isModal()" />
      </template>
    </ModalAlert>
      <div class="retangle">
        <p class="text-[22px] font-medium mb-8">Dane personalne</p>
        <Form
          @submit="updatePersonal"
          :validation-schema="schemaPersonal"
          @invalid-submit="onInvalidSubmit"
          v-slot="{ values, meta }"
        >
          <div class="flex place-items-center gap-12">
            <div v-if="user.avatar_path" class="relative w-[140px]">
              <img :src="user.avatar_path" class="avatar" />
              <div @click="isModal()">
                <div
                  class="bg-gray-500 w-8 h-8 border-none rounded-full absolute bottom-2 right-0"
                >
                  <Icon name="ph:camera" color="white" size="20" class="camera" />
                </div>
              </div>
            </div>
            <div class="relative w-[120px] flex" v-else>
              <Icon name="carbon:user-avatar-filled" color="#BFCBEE" class="w-36 h-36" />
              <div @click="isModal()">
                <div
                  class="bg-gray-500 w-8 h-8 border-none rounded-full absolute bottom-4 right-3"
                >
                  <Icon name="ph:camera" color="white" size="20" class="camera" />
                </div>
              </div>
            </div>
            <div class="flex flex-col w-full gap-4">
              <div class="flex flex-row  gap-6">
                <InputNotSuccess
                  name="name"
                  :value="personal.name"
                  type="text"
                  placeholder="Imię"
                />
                <InputNotSuccess
                  name="surname"
                  :value="personal.surname"
                  type="text"
                  placeholder="Nazwisko"
                />
              </div>
              <div class="flex flex-row  gap-6">
                <InputNotSuccess
                  name="email"
                  :value="personal.email"
                  type="text"
                  placeholder="Imię"
                />
                <InputNotSuccess
                  name="phone"
                  :value="personal.phone"
                  type="number"
                  placeholder="Numer telefonu"
                  />
              </div>
            </div>
          </div>
          <div class="justify-end flex mt-10">
            <button class="button-primary" v-if="checkPersonal(values, meta, personal)">
              Zapisz zmiany
            </button>
            <button class="button-primary-disabled cursor-not-allowed" v-else disabled>Zapisz zmiany</button>
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
  const { currentUser, getPersonal } = storeToRefs(userStore);
  await userStore.getUser();
  await userStore.getSettingsUser();
  let user = currentUser.value;
  let personal = getPersonal.value;
  
  const updatePersonal = (values: any) => {
        userStore.updateUserPersonal(values.name, values.surname, values.email, values.phone);
        successShow();
  };
  
  const titleImage = () => {
    let results: string = "";
    if (user.avatar_path) {
      results = "Zmień zdjęcie profilowe";
    } else {
      results = "Dodaj zdjęcie";
    }
    return results;
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
      phone: yup.string().test(
      "valid-phone",
      "Błędny format numeru telefonu",
      (value) => {
        if (!value || value === "") return true;
        const phoneRegex = /^\d{9}$/;
        return phoneRegex.test(value) && parseInt(value) > 0;
      }
    ),
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
  