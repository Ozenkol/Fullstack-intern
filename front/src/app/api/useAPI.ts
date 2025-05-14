import { computed, ref } from "vue";

const URLS = {
    CHAT: "https://petprojectdlyaintern.netlify.app/.netlify/functions/app/send-message"
}

const get = (url: string) => fetch(url);
const post = (url: string, data: string) => 
    fetch(url, { method: 'POST', body: JSON.stringify(data)});

export function useAPI() {
    const isLoading = ref(false)
    const API = computed(
        () => {
            const wrap = (promise: Promise<any>) => {
                isLoading.value = false;
                return (
                    promise
                        .finally(() => isLoading.value = false)
                        .then((res) => {
                            // if(!res.ok) {
                            //     throw new Error("Error");
                            // }
                            return res.json();
                        })
                        .catch((e) => {
                            throw e
                        })
                )
            };
            const postChat = (data:string) => wrap(post(URLS.CHAT, data)) 
            return {
                postChat
            };
        }
    )
    return {isLoading, API};
}

