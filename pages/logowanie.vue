<template>
  <div class="auth-background">
    <div class="auth-des hidden sm:flex">
      <!-- <h1>Test</h1> -->
    </div>
    <div class="width-login sm:shaddow-effect" @click="inputColor()">
      <h1 class="text-[24px] ">Logowanie</h1>
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        @invalid-submit="onInvalidSubmit"
      >
        <InputSettings ref="inputField" class="base-input" type="email" :class="{
        errorInput: ErrorLogin.errorInput }" hasError: true name="email"
        placeholder="E-mail" />
        <InputSettings 
          type="password"
          :class="{ errorInput: ErrorLogin.errorInput }"
          class="mt-3"
          name="password"
          placeholder="Hasło"
        />
        <div v-if="!hideAfter">
          <!-- TODO:Chowanie komunikatu gdy nie ma błędu -->
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
        <button class="submit-auth w-full mt-10" id="submit" type="submit">Zaloguj się</button>
      </Form>
      <div class="sm:flex hidden">
        <p class="text-des">
          Nie masz jeszcze konta?
          <NuxtLink to="/rejestracja"
            ><span class="navigate">Zarejestruj się</span></NuxtLink
          >
        </p>
      </div>
      <div class="sm:hidden md:hidden flex flex-col">
        <p class="text-des">Nie masz jeszcze konta?</p>
        <p class="navigate -mt-7 mb-8">
          <NuxtLink to="/rejestracja">Zarejestruj się</NuxtLink>
        </p>
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
const submissionQuiz = useCookie("submissionQuiz") as any;
submissionQuiz.value = false
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

async function onSubmit(values) {
  const { email, password } = values;
  await authStore.loginUser(email, password);
  let input = ErrorInput(error.value);
  ErrorLogin = input;
  hideAfter = false;
}

const schema = Yup.object().shape({
  email: Yup.string().email("Błędny email").required("Proszę wpisać adres e-mail"),
  password: Yup.string()
    .min(8, "Hasło musi mieć powyżej 8 znaków")
    .required("Uzupełnij hasło"),
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
