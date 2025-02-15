export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCountryStats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/stats/countries`);
    if (!response.ok) throw new Error("Дані не знайдені");

    return await response.json();
  } catch (error) {
    console.error("Помилка при загрузці статистики", error);
    throw error;
  }
};

export const fetchDepartmentStats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/stats/departments`);
    if (!response.ok) throw new Error("Дані не знайдені");

    return await response.json();
  } catch (error) {
    console.error("Помилка при загрузці статистики", error);
    throw error;
  }
};