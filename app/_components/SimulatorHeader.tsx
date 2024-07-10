import Image from "next/image";

const SimulatorHeader = () => {
  return (
    <>
      <div className="flex h-[88px] w-full items-end border-b-[1px] bg-white">
        <div className="flex w-[38%] px-4 pb-2">
          <Image
            src="/assets/images/logo-its-money.svg"
            alt=""
            width={100}
            height={100}
            className=""
            sizes="100%"
            quality={100}
          />
        </div>
        <div className="flex h-full w-full items-end justify-center border-l-[1px] px-4 pb-3">
          <h3 className="text-sm font-normal text-[#131415]">
            Previdência Privada x INSS
          </h3>
        </div>
      </div>
    </>
  );
};

export default SimulatorHeader;
