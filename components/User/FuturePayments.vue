<template>
    <div>
      <div class="retangle mb-[35px]">
        <div class=" pt-2 border-b border-gray-200">
            <div class="padding-retangle">
                <h3 class="punkty">{{ point }} zł</h3>
                <p class="saldo-test mb-1 mt-[8px]">Twoje aktualne saldo</p>
                <NuxtLink to="/panel">
                    <p class="primary-color font-semibold  w-[230px] ml-[-6px] pl-[6px] mt-[6px]"> Jak zdobyć więcej punktów ? </p>
                </NuxtLink>
            </div>
        </div>
        {{ payments }}
        <div class="padding-retangle flex w-full justify-end">
            <button class="button-primary-disabled" v-if="point == 0">
                Zleć wypłatę <Icon name="carbon:chevron-right" class="-mr-2" size="24" />
            </button>
    <NuxtLink to="/wypłata" v-else>
        <button class="button-primary">
            Zleć wypłatę <Icon name="carbon:chevron-right" class="-mr-2" size="24" />
        </button>
    </NuxtLink>
        </div>
        <div  class="bg-purple-own">
            <p class="leading-6">
                Aby móc wypłacić zgromadzone środki, najpierw musisz uzupełnić dane do przelewu w <NuxtLink to="/panel/ustawienia/edycja/wyplata"><span class="navigate">ustawieniach</span></NuxtLink>
            </p>
        </div>
      </div>
      <p class="w-[250px] leading-6 text-sm text-gray-400">Wypłacić można dowolną kwotę, tylko i wyłącznie cała kwota do wypłaty </p>
      </div>
    </template>
    <script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import {useUser} from '@/store/useUser'
    
    const user = useUser()
    await user.getUser()
    await user.getPaymentsObject()
    const {currentUser, payments} = storeToRefs(user)
    const point = currentUser.value.points;
    </script>
    
    <style scoped lang="scss">
    @import "@/assets/style/variables.scss";
    .retangle {
      background-color: $white;
      border-radius: 24px;
      height: 385px;
    }
    .padding-retangle{
        padding: 30px;
    }
    .saldo-test {
      font-weight: 400;
      font-size: 18px;
      color: #bebebe;
    }
    
    .punkty {
      font-style: normal;
      font-weight: 500;
      font-size: 28px;
    }
    .border1 {
      border-bottom: 1px solid #ededed;
    }
    .bg-purple-own{
        background: #E9EBFD;
    border-radius: 0px 0px 24px 24px;
    padding: 30px;
    }
    </style>
    