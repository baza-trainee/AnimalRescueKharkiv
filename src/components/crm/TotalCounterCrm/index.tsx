import cards from "../../data";
import { inter } from '../../../fonts';

const TotalCounterCrm = () => {
    return (
        <div className="flex my-6 justify-between border border-mainBlue rounded-[10px] p-4">
            <p className={`${inter.className} text-2xl/[36px]  text-crmBlack`}>Всього тварин в АRK</p>
            <div className={`${inter.className} text-2xl/[36px]  text-mainBlue`}>
                {cards.length}
            </div>
        </div>
    )
}

export default TotalCounterCrm;