import apiClient from "./api";

const API_CRM_PATH = process.env.NEXT_PUBLIC_API_CRM_PATH;
const API_LOCATIONS_PATH = process.env.NEXT_PUBLIC_API_LOCATIONS_PATH;

export const createLocation = async (name: string) => {
  try {
    const response = await apiClient.post(
      `${API_CRM_PATH}${API_LOCATIONS_PATH}`,
      [{ name }]
    );

    const location = response.data?.[0];

    return { id: location.id };
  } catch (error) {
    throw error;
  }
};
