<template>
  <div class="auth-background">
    <div class="auth-des hidden sm:flex">
      <h1>Test</h1>
    </div>
    <div class="width-login sm:shaddow-effect" @click="inputColor()">
      <h1 class="title-form">Zarejestruj się</h1>
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        @invalid-submit="onInvalidSubmit"
      >
      <div class="gap-[17px] flex flex-col">
        <InputNotSuccess ref="inputField" class="base-input" type="text"
        :class="{errorInput: ErrorLogin.errorInput }" hasError: true name="name"
        placeholder="Twoje imię" /> 
        <InputNotSuccess ref="inputField" class="base-input" type="text"
        :class="{errorInput: ErrorLogin.errorInput }" hasError: true name="invitation"
        placeholder="Kod polecający" /> 
        <InputNotSuccess ref="inputField" class="base-input"
        type="email" :class="{errorInput: ErrorLogin.errorInput }" hasError: true
        name="email" placeholder="E-mail" />
        <InputNotSuccess
          type="password"
          :class="{ errorInput: ErrorLogin.errorInput }"
          class="base-input"
          name="password"
          placeholder="Hasło"
          />
          <InputNotSuccess
          type="password"
          :class="{ errorInput: ErrorLogin.errorInput }"
          class="base-input"
          name="password_confirmation"
          placeholder="Potwierdz hasło"
          />
        </div>
        <div v-if="!hideAfter">
          <div v-if="ErrorLogin.plMessage">
            <p class="errorUser red font-medium">
              <Icon
                name="ph:warning-circle-light"
                color="red"
                size="20"
                class="mb-1 mr-1.5"
              />{{ ErrorLogin.plMessage }}
            </p>
          </div>
        </div>
        <button class="submit-auth w-full mt-10" id="submit" type="submit">
          Zarejestruj się
        </button>
      </Form>
      <div class="flex flex-col">
        <p class="text-des">Rejestrując się aklceptujesz regulamin serwisu</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { useAuth } from "@/store/useAuth";
import { ErrorInput, onInvalidSubmit } from "@/utils/function";

definePageMeta({
  middleware: "guest",
});

const authStore = useAuth();
const { error, loggedIn } = storeToRefs(authStore);

var hideAfter = true;
var ErrorLogin: any = false;

function inputColor() {
  ErrorLogin = false;
}

const onSubmit = async (values: any) => {

  
  const { name, invitation, email, password, password_confirmation } = values;
  await authStore.registerUser(name, invitation, email, password, password_confirmation);

console.log(values)



  let input = ErrorInput(error.value);
  ErrorLogin = input;
  hideAfter = false;
};

const schema = Yup.object().shape({
  name: Yup
      .string()
      .test("valid-name", "Nieprawidłowe imię", (value:any) => {
        if (!value) return true;
        const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż\s]*$/u;
        return nameRegex.test(value);
      })
      .max(20, "Imię nie może mieć więcej niż 20 znaków")
      .required("Uzupełnij swoję imię"),
  email: Yup.string().email("Błędny email").required("Proszę wpisać adres e-mail"),
  password: Yup.string()
    .min(6, "Hasło musi mieć przynajmniej 6 znaków")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      "Hasło musi zawierać przynajmniej jedną dużą literę i jeden znak specjalny"
    )
    .required("Uzupełnij hasło"),
    invitation: Yup.string().required("Uzupełnij kod polecający"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same') // Dodaj walidację na potwierdzenie hasła
    .required('Potwierdź hasło'), // Dodaj komunikat o wymaganym polu
});
</script>

<style scoped>
@media only screen and (max-width: 5200px) {
  .width-login {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
  }
}

@media only screen and (min-width: 520px) {
  .width-login {
    position: absolute;
    width: 300px;
    background: white;
    border-radius: 16px;
    padding: 24px 24px 4px 24px;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  }
}

@media only screen and (min-width: 1024px) {
  .width-login {
    position: absolute;
    width: 400px;
    background: white;
    border-radius: 16px;
    padding: 42px 55px 4px 55px;
    top: 45%;
    right: 0%;
    transform: translate(-50%, -50%);
  }
}

@media only screen and (min-width: 1536px) {
  .width-login {
    position: absolute;
    width: 400px;
    background: white;
    border-radius: 16px;
    padding: 42px 55px 4px 55px;
    top: 45%;
    right: 5%;
    transform: translate(-50%, -50%);
  }
}

@media only screen and (min-width: 1536px) {
  .width-login {
    position: absolute;
    width: 400px;
    background: white;
    border-radius: 16px;
    padding: 42px 55px 4px 55px;
    top: 45%;
    right: 5%;
    transform: translate(-50%, -50%);
  }
}
.errorUser {
  padding-top: 36px;
  font-size: 14px;
  margin-bottom: -30px;
}

.auth-des {
  position: absolute;
  border-radius: 16px;
  top: 45%;
  left: 5%;
  transform: translate(-50%, -50%);
}

.text-des {
  font-size: 14px;
  padding-top: 14px;
  border-top: 1px solid #ededed;
  margin-top: 44px;
  margin-bottom: 32px;
  color: #a7a2a2;
}
</style>
