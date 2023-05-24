<template>
    <div class="text">
        Gratulujemy, Twoja subskrypcja <br>jest aktywna. Dzięki temu<br> masz dostęp do pełnej wersji <br>serwisu. Kolejne odnowienie <br> nastąpi <span class="text-gray-400 font-medium">{{ date }}</span> 
        
        <!-- <ul class="mt-2">
            <li>zdobywać punkty</li>
            <li>zapraszać znajomych</li>
            <li>grać i dodawać quizy</li>
            <li>i wiele, wiele innych</li>
        </ul> -->
        <!-- Kolejne odnowienie subskrypcji nastąpi w dniu:  -->
        <!-- 12.12.2023 -->
    </div>
</template>
<script setup lang="ts">
const date = "12.12.2023"
</script>
<style scoped>
.text {
    font-size: 15px;
    font-family: "Manrope", sans-serif;
    color: #212427;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.02em;
}
</style>

