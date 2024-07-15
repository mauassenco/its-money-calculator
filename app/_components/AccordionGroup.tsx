import { useContext } from "react";
import { AcfFieldsContext, useAcfFieldsContext } from "../context/AcfFields";
import parse from 'html-react-parser';


const AccordionGroup = () => {
  const AcfData = useContext(AcfFieldsContext);

  return (

    <div className="container mb-10 md:flex md:max-w-[50%] md:flex-col">
      {AcfData !== undefined && (
        <>
          <div className="mb-8 px-4 md:mb-0">
            <h3 className="text-[17px] font-semibold text-highlight">
            </h3>
            <h3 className="mb-10 text-[17px] font-semibold text-white md:mb-0">
              {/* {parse(String(AcfData?.accordion_subtitle))} */}
            </h3>
          </div>


          <div className="px-4 pb-10 ">

            <div className="bg-[#fff] px-4 rounded" >
              {AcfData?.accordion?.map((itm, index) => (
                <div className="collapse collapse-plus bg-white rounded-none border-b py-2" key={index}>
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-[#131415] text-[18px] font-bold leading-6 pb-[2px]]"> {parse(String(itm.accordion_item_question))}</div>
                  <div className="collapse-content font-[14px] font-normal leading-[22px] text-[#27272B]">
                    <p> {parse(String(itm.accordion_item_answer))}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div >

  );
};

export default AccordionGroup;
