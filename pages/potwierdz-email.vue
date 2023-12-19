<template>
  <div class="auth-background">
    <div class="width-login sm:shaddow-effect">
      <h1 class="text-[24px] font-semibold">Potwierdź swój adres e-mail</h1>


    </div>
  </div>
</template>

<script setup lang="ts">

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
    padding: 24px;
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
