import React from "react";

const MiddleFooter = () => {
  return (
    <>
      <div class="bg-darkblue-200 w-full">
        <div class="container text-white mx-auto pt-2">
          {/* FLEX CONTAINER */}
          <div class="flex flex-col items-center pb-10">
            <div class="text-3xl font-bold text-blue-100 mb-8 mt-5">SPRIN</div>
            <div class="flex w-full flex-col md:flex-row justify-between space-y-10 md:space-y-0 relative md:px-20">
              {/* SOCIAL */}
              <div class="flex flex-col justify-start items-center">
                <h3 class="font-bold">Find us on our socials!</h3>
                <div class="flex flex-row justify-around items-center space-x-5">
                  <a class="block" href="#">
                    <svg
                      class="w-12 h-12 fill-white cursor-pointer hover:fill-red-300 transition-all"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      {/* <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                    </svg>
                  </a>
                  <a class="block" href="#">
                    <svg
                      class="w-12 h-12 fill-white cursor-pointer hover:fill-skyblue-200 transition-all"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      {/* <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                    </svg>
                  </a>
                </div>
              </div>
              {/* WEBPAGE LINKS */}
              <div class="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                <div class="flex flex-col space-y-1 items-center">
                  <a
                    class="inline border-b-2 border-transparent hover:border-skyBlue hover:text-SkyBlue"
                    href="#"
                  >
                    Home
                  </a>
                  <a
                    class="inline border-b-2 border-transparent hover:border-skyBlue hover:text-SkyBlue"
                    href="#"
                  >
                    Partners
                  </a>
                  <a
                    class="inline border-b-2 border-transparent hover:border-skyBlue hover:text-SkyBlue"
                    href="#"
                  >
                    Resources
                  </a>
                  <a
                    class="inline border-b-2 border-transparent hover:border-skyBlue hover:text-SkyBlue"
                    href="#"
                  >
                    Events
                  </a>
                </div>
              </div>
              {/* EMAIL ADDRESS */}
              <div class="flex flex-col justify-start items-center">
                <h3 class="font-bold">Contact us here</h3>
                <a
                  href="mailto"
                  class="flex justify-center items-center space-x-2 cursor-pointer border-b-2 border-transparent border-dashed text-sm group hover:text-skyBlue hover:border-skyBlue transition-all"
                >
                  <svg
                    class="w-6 h-6 fill-white mr-2 transition-all group-hover:fill-skyBlue"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    {/* <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                    <path d="M0 128C0 92.65 28.65 64 64 64H448C483.3 64 512 92.65 512 128V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V128zM48 128V150.1L220.5 291.7C241.1 308.7 270.9 308.7 291.5 291.7L464 150.1V127.1C464 119.2 456.8 111.1 448 111.1H64C55.16 111.1 48 119.2 48 127.1L48 128zM48 212.2V384C48 392.8 55.16 400 64 400H448C456.8 400 464 392.8 464 384V212.2L322 328.8C283.6 360.3 228.4 360.3 189.1 328.8L48 212.2z" />
                  </svg>
                  suicidepreventionnetwork@qub.ac.uk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiddleFooter;
