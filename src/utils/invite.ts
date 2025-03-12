import { post } from "./api"; 


export const sendInvitation = async (email: string, role: string, language: string, domain: string) => {
    return post(`/auth/invite/${domain}`, { email, role, language })
        .then((data) => {
            console.log("Invitation sent:", data);
            return data;
        })
        .catch((error) => {
            console.error("Failed to send invitation:", error);
            throw error;
        });
}