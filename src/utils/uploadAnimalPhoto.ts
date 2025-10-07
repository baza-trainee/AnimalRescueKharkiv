import apiClient from "@/src/utils/api";

export const uploadAnimalPhoto = async (
  animal_id: string,
  section_name: string,
  file: File
) => {
  try {
    // блокировка секции
    await apiClient.post(`/crm/animals/${animal_id}/${section_name}/lock`);

    // загрузка файла
    const formData = new FormData();
    formData.append("file", file);
    const uploadRes = await apiClient.post("/media/assets", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const mediaId = uploadRes.data.id;

    // добавление к животному
    await apiClient.put(`/crm/animals/${animal_id}/${section_name}`, {
       media: [{ id: mediaId }],
    });

    // получаем URL с сервера
    const mediaRes = await apiClient.get(`/media/assets/${mediaId}`);
    const url = mediaRes.data.uri.startsWith("http")
      ? mediaRes.data.uri
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}${mediaRes.data.uri}`;

    return { id: mediaId, url };
  } catch (err) {
    console.error("Ошибка при загрузке фото:", err);
    throw err;
  }
};
