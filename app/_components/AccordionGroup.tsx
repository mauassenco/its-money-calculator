
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

type AccordionItems = {
  accordion_item_question?: string;
  accordion_item_answer?: string;
};

type AccordionProps = {
  accordionTitle?: string;
  accordionSubtitle?: string;
  items?: AccordionItems[];
};

const AccordionGroup = ({
  accordionTitle,
  accordionSubtitle,
  items,
}: AccordionProps) => {
  return (
    <div className="container mb-10 md:flex md:max-w-[50%] md:flex-col">

      <div className="mb-8 px-4 md:mb-0">
        <h3 className="text-[17px] font-semibold text-highlight">
          {accordionTitle}
        </h3>
        <h3 className="mb-10 text-[17px] font-semibold text-white md:mb-0">
          {accordionSubtitle}
        </h3>
      </div>

      {/*   <Accordion
        type="single"
        collapsible
        className="mx-4 my-12 rounded bg-white"
      >
     {items?.map((itm, index) => (
          <AccordionItem
            value={`item-${index}`}
            className="rounded"
            key={index}
          >
            <AccordionTrigger className="font-semibold no-underline">
              {itm.accordion_item_question}
            </AccordionTrigger>
            <AccordionContent className="px-4">
              {itm.accordion_item_answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion> */}
      <div className="px-4 pb-10">

        <div className="bg-[#fff] px-4 rounded">
          {items?.map((itm, index) => (
            <div className="collapse collapse-plus bg-white rounded-none border-b py-2">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-[#131415] text-[18px] font-bold leading-6 pb-[2px]]"> {itm.accordion_item_question}</div>
              <div className="collapse-content font-[14px] font-normal leading-[22px] text-[#27272B]">
                <p> {itm.accordion_item_answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionGroup;
