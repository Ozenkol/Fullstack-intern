<script setup lang="ts">
    import { ref } from 'vue';
    import { useMessagesStore } from '../store/useMessages';
    import { useSpeech } from '../composables/useSpeech';
    import { useAPI } from '@/app/api/useAPI';
    
    const message = ref('')
    const messagesStore = useMessagesStore()
    const {isListening, toggleListening, note, error} = useSpeech()
    const {isLoading, API} = useAPI()

    function sendMessage(data: string) {
        API.value.postChat(`"message":${data}`).then((res) => messagesStore.addMessage(res));
        messagesStore.addMessage(data)
    }

</script>

<template>
        <div class="pl-7 my-3">
        <div v-if="messagesStore.messages.length > 0">
            <div class="text-[#92AACB] text-2xl pl-20" v-for="message of messagesStore.messages">
                <p>{{ message }}</p>
            </div>
        </div>
    </div>
    <div class="border-1 border-[#2255A7] rounded-2xl text-[#92AACB] text-2xl pl-7 flex w-fit items-center">
        {{ isListening }}
        {{ note }}
        {{ message }}
        <img src="../assets/microphone-svgrepo-com.svg" class="h-[30px] m-3" alt="" @click="toggleListening()">
        <input v-model="note" @keyup.enter="sendMessage(message)"
        class="focus:outline-none mx-7 m-3" type="text" placeholder="Ask whatever you want">
        <button @click="sendMessage(message)" class="btn rounded-2xl bg-[#2255A7] w-15 font-black p-4"><img src="../assets/next-svgrepo-com (1).svg" alt=""></button>
        <div v-if="isLoading">
            Loading...
        </div>
    </div>
</template>

<style scoped>

</style>