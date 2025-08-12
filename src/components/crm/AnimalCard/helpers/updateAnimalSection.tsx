import apiClient from "@/src/utils/api";

export const updateAnimalSection = async (
  animal_id: string | number,
  section_name: string,
  data: Record<string, any>
) => {
  try {
    const res = await apiClient.put(
      `/crm/animals/${animal_id}/${section_name}`,
      data
    );
    return res.data;
  } catch (error) {
    console.error("Ошибка обновления раздела:", error);
    throw error;
  }
};

export const lockSection = async (
  animal_id: string | number,
  section_name: string
) => {
  try {
    await apiClient.post(`/crm/animals/${animal_id}/${section_name}/lock`);
  } catch (error) {
    console.error("Ошибка при блокировке раздела:", error);
    throw error;
  }
};

export const unlockSection = async (
  animal_id: string | number,
  section_name: string
) => {
  try {
    await apiClient.delete(`/crm/animals/${animal_id}/${section_name}/lock`);
  } catch (error) {
    console.error("Ошибка при разблокировке раздела:", error);
    throw error;
  }
};
