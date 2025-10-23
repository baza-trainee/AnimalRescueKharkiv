"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetch } from "../../../utils/api";
import { ICONS } from "../../../constants/icons/icons";
import PhotoGallery from "../PhotoGallery";
import MainInfoCard from "../MainInfoCArd";
import MadicalInfoCard from "../MadicalInfoCard";
import Modal from "./helpers/editingModal";
import SterilizationModalContent from "./modalsContent/sterilization";
import MicrochippingModalContent from "./modalsContent/chiping";
import VaccinationModalContent from "./modalsContent/vaccination";
import { updateAnimalSection, unlockSection, lockSection } from "./helpers/updateAnimalSection";

const API_CRM_PATH = process.env.NEXT_PUBLIC_API_CRM_PATH;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Animal {
  id: string;
  name: string;
  origin: {
    origin__city: string;
    origin__arrival_date: string;
    origin__address?: string | null;
  };
  general: {
    general__animal_type: { name: string };
  };
  locations: {
    location: { name: string };
    date_from: any;
    date_to: any;
  }[];
  current_location: {
    location: { name: string };
  };
  media?: { uri: string }[];
  owner: { owner__info: string };
  comment: { comment__text: string };
  adoption: {
    adoption__country: string;
    adoption__city: string;
    adoption__date: any;
    adoption__comment: string;
  };
  death: {
    death__dead: boolean;
    death__date: any;
    death__comment: string;
  };
  sterilization: {
    sterilization__done: boolean;
    sterilization__comment: string;
    sterilization__date: any;
  };
  microchipping: {
    microchipping__done: boolean;
    microchipping__comment: string;
    microchipping__date: any;
  };
  vaccinations: {
    is_vaccinated: boolean;
    vaccine_type: string;
    date: any;
    comment: string;
  }[];
  diagnoses: { name: string; date: any; comment: string }[];
  procedures: { name: string; date: any; comment: string }[];
}

interface Props {
  animalId: string;
}

const AnimalCard = ({ animalId }: Props) => {
  const router = useRouter();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [activeTab, setActiveTab] = useState<"Main info" | "Medical info">("Main info");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "sterilization" | "microchipping" | "vaccinations" | "diagnoses" | "procedures" | null
  >(null);
  const [modalData, setModalData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const openModal = async (
    type: "sterilization" | "microchipping" | "vaccinations" | "diagnoses" | "procedures"
  ) => {
    if (!animalId || !animal) return;

    try {
      await lockSection(animalId, type);
      setModalType(type);

      switch (type) {
        case "sterilization":
          setModalData(animal.sterilization);
          break;
        case "microchipping":
          setModalData(animal.microchipping);
          break;
        case "vaccinations":
          setModalData(animal.vaccinations);
          break;
        case "diagnoses":
          setModalData(animal.diagnoses);
          break;
        case "procedures":
          setModalData(animal.procedures);
          break;
        default:
          setModalData(null);
      }

      setModalOpen(true);
    } catch (error) {
      console.error("Помилка при блокуванні секції:", error);
    }
  };

  useEffect(() => {
    if (animalId) {
      fetch<Animal>(`${API_CRM_PATH}/animals/${animalId}`)
        .then(setAnimal)
        .catch((err) => console.error("Помилка при завантаженні тварини:", err));
    }
  }, [animalId]);

  const handleSave = async () => {
    if (!animal || !modalType || !modalData) return;
    setIsSaving(true);
    try {
      await updateAnimalSection(animal.id, modalType, modalData);
      const updated = await fetch<Animal>(`${API_CRM_PATH}/animals/${animalId}`);
      setAnimal(updated);
      setModalOpen(false);
    } catch (err) {
      console.error("Помилка при збереженні:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseModal = async () => {
    if (animal && modalType) {
      try {
        await unlockSection(animal.id, modalType);
      } catch (err) {
        console.error("Помилка unlockSection:", err);
      }
    }
    setModalOpen(false);
  };

  const getModalContent = () => {
    if (!animal) return null;

    switch (modalType) {
      case "sterilization":
        return (
          <SterilizationModalContent
            data={modalData || animal.sterilization}
            onChange={setModalData}
            animalId={animal.id}
            isOpen={modalOpen}
          />
        );
      case "microchipping":
        return (
          <MicrochippingModalContent
            data={modalData || animal.microchipping}
            onChange={setModalData}
            animalId={animal.id}
            isOpen={modalOpen}
          />
        );
      case "vaccinations":
        return (
          <VaccinationModalContent
            data={modalData || animal.vaccinations}
            onChange={setModalData}
            animalId={animal.id}
            isOpen={modalOpen}
          />
        );
      default:
        return null;
    }
  };

  const fallbackImage = "/assets/imagescrm/сat.png";
  if (!animal) return <p>Завантаження...</p>;

  const images: string[] =
    animal.media?.map((m) => (m.uri ? `${BASE_URL}${m.uri}` : fallbackImage)) || [];

  return (
    <div className="conteiner">
      <div className="w-[342px] mx-6 pb-20">
        <header className="h-14 border-b border-lightBlue flex justify-between pt-5 pb-1 mb-6">
          <button onClick={() => router.back()}>
            <ICONS.COMEBACK_BTN />
          </button>
          <div>
            <ICONS.UPLOAD_BTN />
          </div>
        </header>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <div className="font-bold text-[32px] leading-[48px] text-crm-black">
              {animal.name}
            </div>
            <div className="font-normal text-xl leading-[28px] text-crm-secondary-blue">
              ID {animal.id}
            </div>
          </div>
          <button className="self-start">
            <ICONS.EDIT_BTN />
          </button>
        </div>

        <PhotoGallery animalId={animal.id} images={images} />

        <div className="mt-6 flex border border-mainBlue rounded-[10px] overflow-hidden w-full h-[80px] mx-auto">
          <button
            onClick={() => setActiveTab("Main info")}
            className={`px-4 py-1 text-2xl text-center font-bold ${
              activeTab === "Main info"
                ? "bg-mainBlue text-lightBlue"
                : "bg-transparent text-mainBlue"
            }`}
          >
            Основна інформація
          </button>
          <button
            onClick={() => setActiveTab("Medical info")}
            className={`px-4 py-1 text-2xl text-center font-bold ${
              activeTab === "Medical info"
                ? "bg-mainBlue text-lightBlue"
                : "bg-transparent text-mainBlue"
            }`}
          >
            Медична інформація
          </button>
        </div>

        <div className="mt-5">
          {activeTab === "Main info" ? (
            <MainInfoCard animal={animal} />
          ) : (
            <MadicalInfoCard animal={animal} openModal={openModal} />
          )}
        </div>

        {modalOpen && animal && (
          <Modal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            onSave={handleSave}
            isLoading={isSaving}
            title="Редагування"
          >
            {getModalContent()}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AnimalCard;
