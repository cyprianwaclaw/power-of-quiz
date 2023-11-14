<template>
  <NuxtLayout name="my-account">
    <div class="pb-[-30px]">
      <h1 class="title-h1 mb-5">Faktury i płatności</h1>
<!-- {{ allPayments.total  }} -->
  <div class="mb-[25px]">
    <div class="retangle">
      <div v-if=" allPayments?.total == 0">
        <p>brak wypłat</p>
      </div>
      <div
        v-else
        v-for="(single, index) in allPayments?.data "
        :key="index"
        :class="{ notBorder: index == allPayments?.data?.length - 1 ? true : false }"
        class="px-[28px] py-[18px] grid grid-cols-2 justify-between border-own"
      >
        <div>
          <p class="date-text">{{ changeDateFormat(single.created_at) }}</p>
     <p :class="changePaymentStatus(single.status).class">{{ changePaymentStatus(single.status).name}}</p>
        </div>
        <div class="grid justify-end content-center">
            <button @click="downloadInvoice1(single.id)" class="button-primary" v-if="single.status == 'success' ">Faktura</button>
        </div>
      </div>
    </div>
    <Pagination v-if="allPayments?.last_page > 1" :last_page="allPayments?.last_page" />
  </div>
    </div>
  </NuxtLayout>
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
.retangle {
  background-color: $white;
  border-radius: 24px;
}
.border-own {
  border-bottom: 1px solid $border;
}
.notBorder {
  border-bottom: transparent;
}
.date-text {
  font-size: 14px;
  font-weight: 300;
  color: $text-gray;
  margin-bottom: -2px;
}
</style>
