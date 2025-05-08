import { DataProvider } from "@/src/context/CrmDataContext";
import AddCardForm from "../AddCardForm";
import Header from "../Header";
const AddCardCrm = () => {
  return (
    <DataProvider>
      <Header title="Нова картка" />
      <AddCardForm />
    </DataProvider>
  );
};

export default AddCardCrm;
