import apiClient from "./api";

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

    if (login) {
      login(response.data.access_token);
    }

    window.location.href = "/crm/statistic";
  } catch (error) {
    console.error("Login failed:", error);
  }
};
