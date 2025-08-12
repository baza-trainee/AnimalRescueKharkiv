"use client";

import InfoCardBlock from "../InfoCardBlock";

interface Props {
  animal: {
    locations: {
      location: {
        name: string;
      }
      date_from: any;
      date_to: any;
    }[],
    current_location: {
      location: {
        name: string;
      };
    }
    general:
    {
      general__gender?: string | null;
      general__age?: number | null;
      general__specials?: string | null;
      general__weight?: number | null;
      general__animal_type: {
        name: string;
      }
    };
    
     origin: {
    origin__city: string;
      origin__arrival_date: string;
      origin__address?: string | null;
    };
    owner: {
  owner__info: string;
    };
    comment: {
      comment__text: string;
    },
    adoption: {
      adoption__country: string;
      adoption__city: string;
      adoption__date: any;
      adoption__comment: string;

    };
    death: {
death__dead: boolean,
death__date: any,
death__comment: string
}
  };
}

const genderMap: Record<string, string> = {
  male: "Чол",
  female: "Жін",
 
};

export default function MainInfoCard({ animal }: Props) {
  const { origin__city, origin__arrival_date, origin__address } = animal.origin;
  const { general__animal_type, general__gender, general__weight, general__age, general__specials } = animal.general;
  const locationName = animal.current_location?.location?.name ?? "Немає даних";

  const isAdoptionEmpty =
  !animal.adoption ||
  (!animal.adoption.adoption__city &&
   !animal.adoption.adoption__country &&
   !animal.adoption.adoption__date &&
      !animal.adoption.adoption__comment);
  
  
  const formatDateShort = (dateStr: string | null | undefined) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2); 
  return `${day}.${month}.${year}`;
  };
  const formatDateLong = (dateStr: string | null | undefined) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()); 
  return `${day}.${month}.${year}`;
};

  return (
     <>
       <InfoCardBlock title="Дата прибуття">
      <div className="font-normal text-[20px] leading-[30px] text-crm-black"> {formatDateLong(origin__arrival_date)}</div>  
      <div className="flex gap-4">
        <div className="flex-row w-1/2">
          <p className="font-medium text-lg text-crm-secondary-blue">Звідки (місто)</p>
          <div className="font-normal text-[20px] leading-[30px] text-crm-black"> {origin__city}</div>
        </div>
        <div className="w-1/2">
          <p className="font-medium text-lg text-crm-secondary-blue">
          Адреса
          </p>
          <div className="font-normal text-xl text-crm-black break-words">
          {origin__address && origin__address.trim() !== ""
            ? origin__address
            : "Немає данних"}</div>
     </div>
        
      </div>
      </InfoCardBlock>
      
      <InfoCardBlock title="Тип тварини">
            <div className="font-normal text-[20px] leading-[30px] text-crm-black break-words">{ general__animal_type.name}</div>
        <div className="flex gap-4 mt-2">
          <div className="w-1/2">
            <p className="font-medium text-lg text-crm-secondary-blue">Стать</p>
            <div className="font-normal text-[20px] leading-[30px] text-crm-black">
              {general__gender ? genderMap[general__gender] : "Немає данних"}
            </div>
          </div>

          <div className="w-1/2">
            <p className="font-medium text-lg text-crm-secondary-blue">Вага (кг)</p>
            <div className="font-normal text-[20px] leading-[30px] text-crm-black">
              {general__weight !== null && general__weight !== undefined
                ? general__weight
                : "Немає данних"}
            </div>
          </div>
        </div>


        <div className=" mt-2">
          
            <p className="font-medium text-lg text-crm-secondary-blue">Вік (оціночно)</p>
          <div className="flex  ">
            <div className="w-1/2">
              <p className="font-medium text-sm leading-5 text-crm-secondary-blue">Років</p>
              <div className="font-normal text-[20px] leading-[30px] text-crm-black"> {general__age !== null && general__age !== undefined
                ? Math.floor(general__age)
                : "Немає данних"}</div>
            </div>
            <div className="w-1/2">
              <p className="font-medium text-sm leading-5 text-crm-secondary-blue">Місяців</p>
              <div className="font-normal text-[20px] leading-[30px] text-crm-black">{general__age !== null && general__age !== undefined?Math.round((general__age % 1) * 10) : 0}</div>
            </div>
              
            </div>
        
        
        
        </div>
          <div className="flex-col mt-2">
            <p className="font-medium text-lg text-crm-secondary-blue">Особливі прикмети</p>
            <div className="font-normal text-[20px] leading-[30px] text-crm-black break-words">{general__specials !== null && general__specials !== undefined
                ? general__specials
                : "Немає данних"}</div>
</div>

       
      </InfoCardBlock>
      <InfoCardBlock title="Поточна локація">
            <div className="font-normal text-[20px] leading-[30px] text-crm-black break-words">{locationName}</div>
          
        <span className="font-medium text-lg text-crm-secondary-blue">Історія переміщень</span>
        <div>
         {[...animal.locations]
    .sort((a, b) => new Date(a.date_from).getTime() - new Date(b.date_from).getTime())
    .map((item, index) => {
      const formatDate = (date: string | null) => {
        if (!date) return "До тепер";
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = String(d.getFullYear()).slice(-2); 
        return `${day}.${month}.${year}`;
      };

      return (
        <div key={index} className="flex justify-between items-center text-[16px] text-crm-black">
          <span className="font-medium text-lg text-crm-black">{item.location?.name ?? "Невідомо"}</span>
          <span className="font-normal text-sm text-crm-black">
            {formatDate(item.date_from)} – {formatDate(item.date_to)}
          </span>
        </div>
      );
    })}
        </div>
        
      </InfoCardBlock>
      <InfoCardBlock title="Інформація про власника">
            <div className="font-normal text-[20px] leading-[30px] text-crm-black break-words">  {animal.owner?.owner__info ?? "-"}</div>
        
        
      </InfoCardBlock>
         <InfoCardBlock title="Загальний коментар">
            <div className="font-normal text-[20px] leading-[30px] text-crm-black break-words">  {animal.comment.comment__text ?? "-"}</div>
         
      </InfoCardBlock>
       <InfoCardBlock title="Прилаштування">
            <div className="font-normal text-[20px] leading-[30px] text-crm-black break-words">  {isAdoptionEmpty ? "-" : "Так"}</div>

         <div className="flex  ">
            <div className="w-1/2">
              <p className="font-medium text-sm leading-5 text-crm-secondary-blue">Країна</p>
              <div className="font-normal text-[20px] leading-[30px] text-crm-black"> {!isAdoptionEmpty && animal.adoption.adoption__country
                ? animal.adoption.adoption__country
                : "-"}</div>
            </div>
            <div className="w-1/2">
              <p className="font-medium text-sm leading-5 text-crm-secondary-blue">Дата</p>
              <div className="font-normal text-[20px] leading-[30px] text-crm-black"> {!isAdoptionEmpty && animal.adoption.adoption__date
        ? formatDateShort(animal.adoption.adoption__date)
        : "-"}</div>
            </div>
              
        </div>
        
         <div>
            <p className="font-medium text-lg text-crm-secondary-blue">Коментар</p>
            <div className="font-normal text-[20px] leading-[30px] text-crm-black break-words">   {!isAdoptionEmpty && animal.adoption.adoption__comment
                ? animal.adoption.adoption__comment
                : "-"}</div>
          </div>
      </InfoCardBlock>
      
        <InfoCardBlock title="Смерть">
            <div className="font-normal text-[20px] leading-[30px] text-crm-black break-words">  {animal.death.death__dead ===true ? "Так" : "Ні"}</div>
        <div className="flex-col mt-2">
            <p className="font-medium text-lg text-crm-secondary-blue">Дата</p>
            <div className="font-normal text-[20px] leading-[30px] text-crm-black break-words">{animal.death.death__date 
                ? animal.death.death__date
                : "-"}</div>
        </div>
        <div className="flex-col mt-2">
            <p className="font-medium text-lg text-crm-secondary-blue">Коментар</p>
            <div className="font-normal text-[20px] leading-[30px] text-crm-black break-words">{animal.death.death__comment
                ? animal.death.death__comment
                : "-"}</div>
        </div>
     
      </InfoCardBlock>
    </>
  );
}