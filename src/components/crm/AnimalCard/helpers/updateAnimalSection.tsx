import apiClient from "@/src/utils/api";

export const updateAnimalSection = async (
  animal_id: string | number,
  section_name: string,
  data: Record<string, any>
) => {
  try {
    let payload = data;

  if (section_name === "name") {
      payload =  data;
    }
    if (section_name === "vaccinations") {
      payload = { vaccinations: data };
    }

    if (section_name === "diagnoses") {
      payload = { diagnoses: data };
    }
    if (section_name === "procedures") {
      payload = { procedures: data };
    }
    const res = await apiClient.put(
      `/crm/animals/${animal_id}/${section_name}`,
      payload
    );

    return res.data;
  } catch (error) {
    console.error("Помилка при оновленні секції:", error);
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
    console.error("Помилка при блокуванні секції:", error);
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
    console.error("Помилка при розблокуванні секції:", error);
    throw error;
  }
};
