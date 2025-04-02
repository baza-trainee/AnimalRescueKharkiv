import apiClient from "./api";

export const uploadFiles = async (files: FileList) => {
  try {
    if (files.length > 1) {
      const promises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await apiClient.post("/media/assets", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return { id: response.data.id };
      });

      const uploadedFiles = await Promise.all(promises);
      return uploadedFiles;
    } else {
      const formData = new FormData();
      formData.append("file", files[0]);

      const response = await apiClient.post("/media/assets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return { id: response.data.id };
    }
  } catch (error) {
    throw error;
  }
};
