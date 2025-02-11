import Header from "../Header";
import { AddCardForm } from "../AddCardForm/AddCardForm";
const AddCardCrm = () => {
  return (
    <>
      <Header title="Нова картка" />
      <div className="max-w-[390px] p-[24px] my-0 mx-auto">
        <AddCardForm />
      </div>
    </>
  );
};

export default AddCardCrm;
