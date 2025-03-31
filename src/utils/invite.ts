import { post } from "./api"; 


export const sendInvitation = async (email: string, role: string, language: string, domain: string) => {
    return post(`/auth/invite/${domain}`, { email, role, language })
        .then((data) => {
            console.log("Запрошення відправлено:", data);
            return data;
        })
        .catch((error) => {
            console.error("Помилка відправки запрошення:", error);
            throw error;
        });
}