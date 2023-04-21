/* eslint-disable prettier/prettier */
import Image from 'next/image';

export default function CategoryCard() {
  return (
    <div className="flex flex-col gap-y-1">
      <div className=" transition-transform duration-100 hover:bg-[#EEEAEA] p-2 rounded-md ">
        <div className="w-full flex justify-between items-center rounded-md py-5 px-4 pr-0 font-bitter text-black border bg-white cursor-pointer hover:-translate-y-0.5 ">
          <div className="basis-3/5">
            <h1 className="text-2xl font-bold">
              Conway Gripper Bar Complete for Bobst SP 900
            </h1>
            <div className="my-2">
              <span>CMI # 10-351-0-00-00</span>
              <br />
              <span>Compare to BSA04120000FM</span>
            </div>
            <p className="mb-8">
              Conway Gripper Bar complete for Bobst die cutters SP 900 E and SP
              900 ER. The axles come installed in the end fittings. Contact us
              for a quote.
            </p>
            <div className="flex gap-3 font-poppins">
              <button className="px-5 py-1 bg-[#5B5B5B] rounded-lg font-medium border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition duration-200 ">
                Learn More
              </button>
              <button className="px-5 py-1 text-black rounded-lg font-medium border border-transparent bg-yellow-700 hover:border-black hover:bg-white transition duration-200 ">
                Quote Now
              </button>
            </div>
          </div>
          <div className="basis-2/5">
            <Image
              src={`/images/products/${'bobst-large'}.png`}
              width={350}
              height={200}
              alt={'Product Name'}
              className={'h-full object-contain'}
            />
          </div>
        </div>
      </div>
      <div className=" transition-transform duration-100 hover:bg-[#EEEAEA] p-2 rounded-md">
        <div className="w-full flex justify-between items-center rounded-md py-5 px-4 pr-0 font-bitter text-black border bg-white p-0 hover:-translate-y-0.5">
          <div className="basis-3/5">
            <h1 className="text-2xl font-bold">
              Conway Gripper Bar Complete for Bobst SP 900
            </h1>
            <div className="my-2">
              <span>CMI # 10-351-0-00-00</span>
              <br />
              <span>Compare to BSA04120000FM</span>
            </div>
            <p className="mb-8">
              Conway Gripper Bar complete for Bobst die cutters SP 900 E and SP
              900 ER. The axles come installed in the end fittings. Contact us
              for a quote.
            </p>
            <div className="flex gap-3 font-poppins">
              <button className="px-5 py-1 bg-[#5B5B5B] rounded-lg font-medium border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition duration-200 ">
                Learn More
              </button>
              <button className="px-5 py-1 text-black rounded-lg font-medium border border-transparent bg-yellow-700 hover:border-black hover:bg-white transition duration-200 ">
                Quote Now
              </button>
            </div>
          </div>
          <div className="basis-2/5">
            <Image
              src={`/images/products/${'bobst-large'}.png`}
              width={350}
              height={200}
              alt={'Product Name'}
              className={'h-full object-contain'}
            />
          </div>
        </div>
      </div>
      <div className=" transition-transform duration-100 hover:bg-[#EEEAEA] p-2 rounded-md">
        <div className="w-full flex justify-between items-center rounded-md py-5 px-4 pr-0 font-bitter text-black border bg-white p-0 hover:-translate-y-0.5">
          <div className="basis-3/5">
            <h1 className="text-2xl font-bold">
              Conway Gripper Bar Complete for Bobst SP 900
            </h1>
            <div className="my-2">
              <span>CMI # 10-351-0-00-00</span>
              <br />
              <span>Compare to BSA04120000FM</span>
            </div>
            <p className="mb-8">
              Conway Gripper Bar complete for Bobst die cutters SP 900 E and SP
              900 ER. The axles come installed in the end fittings. Contact us
              for a quote.
            </p>
            <div className="flex gap-3 font-poppins">
              <button className="px-5 py-1 bg-[#5B5B5B] rounded-lg font-medium border border-transparent text-white hover:text-black hover:border-black hover:bg-white transition duration-200 ">
                Learn More
              </button>
              <button className="px-5 py-1 text-black rounded-lg font-medium border border-transparent bg-yellow-700 hover:border-black hover:bg-white transition duration-200 ">
                Quote Now
              </button>
            </div>
          </div>
          <div className="basis-2/5">
            <Image
              src={`/images/products/${'bobst-large'}.png`}
              width={350}
              height={200}
              alt={'Product Name'}
              className={'h-full object-contain'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
