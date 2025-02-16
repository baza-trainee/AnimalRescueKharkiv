import apiClient from "./api";
import Cookies from "js-cookie";

export const handleLogin = async (
  data: { email: string; password: string },
  domain: string,
  login: Function | undefined
) => {
  try {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("domain", domain);
    formData.append("username", data.email);
    formData.append("password", data.password);

    const response = await apiClient.post("/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    });

    Cookies.set("access_token", response.data.access_token, { secure: true, sameSite: "Strict" });
    Cookies.set("token_type", response.data.token_type, { secure: true, sameSite: "Strict" });

    if (login) {
      login(response.data.access_token);
    }

    window.location.href = "/crm/statistic";
  } catch (error) {
    console.error("Login failed:", error);
  }
};
