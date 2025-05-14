<script setup lang="ts">
    import InputForm from '../chat/components/InputFrom.vue';

</script>

<template>
    <div class="bg-[#062D69] absolute w-[100%] min-h-[100%]">
        <main class="border-[#25477C] border-t-1 border-b-1 my-10 px-20">
            <img src="./assets/message-square-01-svgrepo-com.svg" class="w-[40px] bg-[#1C4C9B] rounded-xl p-2 m-1" alt="">
            <h1 class="text-2xl text-[#F0F4F6] my-10">Hi there!</h1>
            <h1 class="text-2xl text-[#F0F4F6] my-10">What would you like to know?</h1>
            <p class="text-2xl text-[#97AACC] mt-10 mb-20">Use one of the most common prompsts below <br> or ask your own question</p>
        </main>
        <footer class="px-20 my-15">
            <InputForm></InputForm>
        </footer>
    </div>
</template>

<style scoped>

</style>
