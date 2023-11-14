<template>
  <div class="flex w-full flex-col">
    <p class="text-3xl font-semibold mb-5">Faktury i płatności</p>
    <p class="text-xl font-semibold mb-5">Historia płatności</p>
    <button @click="downloadInvoice1(49)">Pobierz</button>
    <pre>
      {{ payments.data }}
    </pre>
    <div class="grid place-items-center my-10">
      <Icon name="ph:clock-clockwise-light" size="166" color="#CFD8E0" />
      <p class="empty">Brak  płatności</p>
      <!-- <NuxtLink to="/panel/quiz/dodaj-nowy">
        <p class="font-base font-semibold primary-color place-items-center">
          Dodaj nowy
          <Icon name="carbon:chevron-right" size="21" class="primary-color" />
        </p>
      </NuxtLink> -->
    </div>
  </div>
  </template>
  <script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
import { useUser } from "@/store/useUser";

const userStore = useUser();
const { currentUser,payments} = storeToRefs(userStore);
await userStore.getUser();
await userStore.getPaymentsObject() ;

let user = currentUser.value;
const download = async (payment_id:number)=>{
// alert(payment_id)
// await  userStore.getPaymentInvoice(payment_id)
 const response = await userStore.getPaymentInvoice(payment_id) as any;
  const blob = new Blob([response], { type: 'arraybuffer' });
  const url = URL.createObjectURL(blob);

  // Open PDF in a new tab
  window.open(url, '_blank');
}
const download1 = async (payment_id: number) => {
  const response = await userStore.getPaymentInvoice(payment_id);
  const blob = new Blob([response], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'invoice.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const downloadInvoice = async (payment_id: number) => {
  try {
    const response = await userStore.getPaymentInvoice(payment_id) as any;
    
    // Sprawdź, czy odpowiedź jest poprawna
    if (response && typeof response === 'string') {
      // Konwertuj odpowiedź na tablicę bajtów
      const bytes = new Uint8Array(response.length);
      for (let i = 0; i < response.length; i++) {
        bytes[i] = response.charCodeAt(i);
      }

      // Utwórz Blob z tablicy bajtów
      const blob = new Blob([bytes], { type: 'application/pdf' });

      // Utwórz link do pobrania pliku
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'nazwa_pliku.pdf';

      // Dodaj link do elementu body
      document.body.appendChild(link);

      // Kliknij na link, aby uruchomić pobieranie
      link.click();

      // Usuń link po pobraniu
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error('Błąd podczas pobierania pliku PDF', error);
    // Dodaj obsługę błędu, jeśli to konieczne
  }
};

const downloadInvoice1 = (id: string) => {
    axiosInstance.get(`/payments/${id}/download`).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    });
  }
</script>
  
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.invite-text {
  font-style: normal;
  font-weight: 800;
  font-size: 38px;
  color: #cfd8e0;
}
.empty{
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
</style>
