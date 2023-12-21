<template>
  <div class="auth-background">
    <div class="width-login sm:shaddow-effect">
      <div v-if="route.query.id">
        <h1 class="text-[24px] font-semibold">Potwierdzono adres email</h1>
        <p class="text-[17px] mt-3 leading-[28px]">
          Twój adres został potwierdzony, za chwile zostaniesz przekierowany na stronę
          panelu swojego konta
        </p>
          <button class="button-primary w-[185px] mt-6" @click="change()">Przejdź teraz</button>
      </div>
      <div v-else>
            <h1 class="text-[24px] font-semibold">Potwierdź swój adres e-mail</h1>
          <p class="text-[17px] mt-3 leading-[28px]">
        Dziękujemy za rejestrację w naszej społeczności! Abyś mógł pełnić korzystać ze wszystkich funkcji naszej platformy, prosimy o potwierdzenie swojego adresu e-mail
          </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { axiosInstance } from "~~/utils/axios.config";
const route = useRoute() as any;
const router = useRouter() as any;
if (route.query.id) {
  (await axiosInstance.get(`/verify-email/${route.query.id}`)) as any;
}
const change=()=>{
router.push({ path: "/panel" })
}
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
    width: 500px;
    background: white;
    border-radius: 16px;
    padding: 42px;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  }
}

@media only screen and (min-width: 1024px) {
  .width-login {
    position: absolute;
    width: 700px;
    background: white;
    border-radius: 16px;
    padding: 42px;
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
</style>
