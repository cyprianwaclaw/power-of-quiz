<template>
  <div class="flex w-full flex-col">
    <p class="text-3xl font-semibold mb-5">Faktury i płatności</p>
    <p class="text-xl font-semibold mb-10">Historia płatności</p>
    <!-- <div class="grid place-items-center my-10" v-if="payments.data.length < 0">
      <Icon name="ph:clock-clockwise-light" size="166" color="#CFD8E0" />
      <p class="empty">Brak płatności</p>
    </div> -->
    <!-- v-else -->
    <!-- {{ allPayments?.last_page}} -->
    <div
      v-for="(single, index) in allPayments?.data "
      :key="index"
      :class="{
        bgGray: index % 2 === 0,
      }"
      class="px-[24px] py-[21px] place-items-center flex justify-between border-own bordeer-transparent rounded-[12px]"
    >
      <div class="flex place-items-center gap-20 justify-between">
        <p class="text-[15px]">{{ changeDateFormat(single.created_at) }}</p>
        <p class="text-[15px] font-semibold">Plan premium</p>
        <p :class="changePaymentStatus(single.status).class">{{ changePaymentStatus(single.status).name}}</p>
      </div>
      <button @click="downloadInvoice1(single.id)" class="button-primary" v-if="single.status == 'success' ">Pobierz fakture</button>
    </div>
    <div class="flex justify-end">
      <Pagination v-if="allPayments?.last_page > 1" :last_page="allPayments?.last_page" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
import { useUser } from "@/store/useUser";

const userStore = useUser();
const { currentUser, payments } = storeToRefs(userStore);
await userStore.getUser();
let user = currentUser.value;
const router = useRouter();

const allPayments = ref(null) as any

onMounted(async () => {
  let page = (router.currentRoute.value.query.page
    ? router.currentRoute.value.query.page
    : 1) as number;
  await userStore.getPaymentsObject(page);
  allPayments.value = payments.value;
});
onBeforeRouteUpdate(async (to, from) => {
  let page = Number(to.query.page ? to.query.page : 1);
  await userStore.getPaymentsObject(page);
  allPayments.value = payments.value;
});
// export const changeDateFormat=(date:any)=>{
//  return  new Date(date)
//       .toISOString()
//       .split("T")[0]
//       .split("-")
//       .reverse()
//       .join(".")
// }

// const download = async (payment_id:number)=>{
// // alert(payment_id)
// // await  userStore.getPaymentInvoice(payment_id)
//  const response = await userStore.getPaymentInvoice(payment_id) as any;
//   const blob = new Blob([response], { type: 'arraybuffer' });
//   const url = URL.createObjectURL(blob);

//   // Open PDF in a new tab
//   window.open(url, '_blank');
// }
// const download1 = async (payment_id: number) => {
//   const response = await userStore.getPaymentInvoice(payment_id);
//   const blob = new Blob([response], { type: 'application/pdf' });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement('a');
//   a.href = url;
//   a.download = 'invoice.pdf';
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
// };

// const downloadInvoice = async (payment_id: number) => {
//   try {
//     const response = await userStore.getPaymentInvoice(payment_id) as any;

//     // Sprawdź, czy odpowiedź jest poprawna
//     if (response && typeof response === 'string') {
//       // Konwertuj odpowiedź na tablicę bajtów
//       const bytes = new Uint8Array(response.length);
//       for (let i = 0; i < response.length; i++) {
//         bytes[i] = response.charCodeAt(i);
//       }

//       // Utwórz Blob z tablicy bajtów
//       const blob = new Blob([bytes], { type: 'application/pdf' });

//       // Utwórz link do pobrania pliku
//       const link = document.createElement('a');
//       link.href = window.URL.createObjectURL(blob);
//       link.download = 'nazwa_pliku.pdf';

//       // Dodaj link do elementu body
//       document.body.appendChild(link);

//       // Kliknij na link, aby uruchomić pobieranie
//       link.click();

//       // Usuń link po pobraniu
//       document.body.removeChild(link);
//     }
//   } catch (error) {
//     console.error('Błąd podczas pobierania pliku PDF', error);
//     // Dodaj obsługę błędu, jeśli to konieczne
//   }
// };

const downloadInvoice1 = (id: string) => {
  axiosInstance.get(`/payments/${id}/download`).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
  });
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.invite-text {
  font-style: normal;
  font-weight: 800;
  font-size: 38px;
  color: #cfd8e0;
}
.empty {
  margin-top: 12px;
  margin-bottom: 12px;
  color: #cfd8e0;
  font-size: 38px;
  font-weight: 800;
}
.vl {
  border-left: 1px solid rgb(156 163 175);
  margin-top: 4px;
  margin-bottom: 4px;
}

.date-text {
  font-size: 14px;
  font-weight: 300;
  color: $text-gray;
  margin-bottom: -2px;
}
.bgGray {
  background-color: rgb(231, 231, 231);
}
</style>
