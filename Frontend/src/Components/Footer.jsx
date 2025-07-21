import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center items-center bordering mt-10 pb-10 flex-col ">
      <div className="flex justify-center items-center font-semibold text-2xl py-6 border-b-1 border-black/25 w-full">
        TRYIZ
      </div>

      <div className="flex p-5 min-w-[1000px] max-w-[1300px] hide-i-carousel ">
        <div className=" w-2xl max-w-3xl px-3">
          <h1 className="py-2 text-sm">HELP</h1>
          <h2 className="text-[14px] text-black/75">
            A Client Advisor is available at 1800 103 9988. You can also chat or
            email us.
          </h2>
        </div>
        <div className=" w-2xl max-w-3xl px-3">
          <h1 className="py-2 text-sm">SERVICES</h1>
          <h2 className="text-[14px] text-black/75 pb-2 cursor-pointer">
            Repairs
          </h2>
          <h2 className="text-[14px] text-black/75 pb-2 cursor-pointer">
            Personalisation
          </h2>
          <h2 className="text-[14px] text-black/75 pb-2 cursor-pointer">
            Book an Appointment
          </h2>
        </div>
        <div className=" w-2xl max-w-3xl px-3">
          <h1 className="py-2 text-sm">ABOUT TRYIZ</h1>
          <h1 className="text-[14px] text-black/75 pb-2 cursor-pointer">
            Sun Glasses
          </h1>
          <h1 className="text-[14px] text-black/75 pb-2 cursor-pointer">
            Optical Frames
          </h1>
        </div>
        <div className=" w-2xl max-w-3xl px-3">
          <h1 className="py-2 text-sm">Connect</h1>
          <h1 className="text-[14px] text-black/75 pb-2">
            Sign up for TRYIZ emails and receive the latest news from the
            Maison, including exclusive online pre-launches and new collections
          </h1>
        </div>
      </div>
      <div className="p-3 hide-carousel">
        <div className="collapse collapse-plus bg-base-100 border-b-1 border-black/25 rounded-none ">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title">HELP</div>
          <div className="collapse-content">
            <h2 className="text-[14px] text-black/75">
              A Client Advisor is available at 1800 103 9988. You can also chat
              or email us.
            </h2>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-100 border-b-1 border-black/25 rounded-none  ">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title ">SERVICES</div>
          <div className="collapse-content">
            <h2 className="text-[14px] text-black/75 pb-2 cursor-pointer">
              Repairs
            </h2>
            <h2 className="text-[14px] text-black/75 pb-2 cursor-pointer">
              Personalisation
            </h2>
            <h2 className="text-[14px] text-black/75 pb-2 cursor-pointer">
              Book an Appointment
            </h2>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-100 border-b-1 border-black/25 rounded-none  ">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title">ABOUT TRYIZ</div>
          <div className="collapse-content">
            <h1 className="text-[14px] text-black/75 pb-2 cursor-pointer">
              Sun Glasses
            </h1>
            <h1 className="text-[14px] text-black/75 pb-2 cursor-pointer">
              Optical Frames
            </h1>
          </div>
        </div>
      </div>
      <div className="text-[13px] text-base-500 pt-4 text-center">
        © 2025 SHAIK MOHAMMAD AFFAN - All rights reserved
      </div>
    </div>
  );
};

export default Footer;
