import {Button} from '@/components/Button';
import {SelectInput, TextInput} from '@/components/Form';
import Modal from '@/components/Modal';

import HomeLayout from '@/layouts/HomeLayout';
import SidebarAccounts from '@/layouts/components/SidebarAccounts';
import {useState} from 'react';

const countryOptions = [
  {
    value: 'United States',
    label: 'United States',
  },
  {
    value: 'Canada',
    label: 'Canada',
  },
  {
    value: 'South Africa',
    label: 'South Africa',
  },
];

export default function Accounts() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  return (
    <HomeLayout>
      <>
        <SidebarAccounts />
        <div className="md:h-[700px] 2xl:h-[750px] basis-full">
          <div className="mb-7">
            <h1>
              <span className="font-bold text-xl text-zinc-700 border-r border-r-zinc-700 pr-2">
                My Account
              </span>
              <span className="text-yellow-700 ml-4"> Hello, Emma Smith</span>
            </h1>
          </div>
          <div className="flex md:flex-row flex-col md:gap-8 gap-2 rounded-md md:border text-black border-[#c0c0c0] px-2 md:p-14 2xl:h-[600px] md:h-[550px] md:overflow-auto">
            <div className=" basis-2/5 md:self-start self-center">
              <h2 className="text-xl font-bold mb-4">Account Details</h2>
              <p className="text-sm">
                Change your name, email, mobile number and more.
              </p>
            </div>
            <div className="md:self-end self-center basis-full flex md:flex-row flex-col justify-center">
              <form
                action=""
                className="mx-auto flex flex-col gap-4 md:p-10 md:pb-0 p-5 pb-0"
              >
                <div className="flex md:flex-row flex-col gap-8">
                  {' '}
                  <label htmlFor="firstName">
                    <span className="font-bold text-sm">
                      First Name <b className="text-red-500">*</b>
                    </span>
                    <TextInput
                      name="first_name"
                      className="rounded-md py-1 px-2 border text-zinc-700"
                    />
                  </label>
                  <label htmlFor="lastName">
                    <span className="font-bold text-sm">
                      Last Name <b className="text-red-500">*</b>
                    </span>
                    <TextInput
                      name="last_name"
                      className="rounded-md py-1 px-2 border text-zinc-700"
                    />
                  </label>
                </div>
                <div className="flex md:flex-row flex-col gap-8">
                  {' '}
                  <label htmlFor="email">
                    <span className="font-bold text-sm">
                      Email <b className="text-red-500">*</b>
                    </span>
                    <TextInput
                      name="first_name"
                      type="email"
                      className="rounded-md py-1 px-2 border text-zinc-700"
                    />
                  </label>
                  <label htmlFor="phone">
                    <span className="font-bold text-sm">
                      Phone <b className="text-red-500">*</b>
                    </span>
                    <TextInput
                      name="phone"
                      className="rounded-md py-1 px-2 border text-zinc-700"
                    />
                  </label>
                </div>

                <div className="flex md:flex-row flex-col gap-8">
                  {' '}
                  <label htmlFor="streetAddress">
                    <span className="font-bold text-sm">
                      Street Address <b className="text-red-500">*</b>
                    </span>
                    <TextInput
                      name="street_address"
                      className="rounded-md py-1 px-2 border text-zinc-700"
                    />
                  </label>
                  <label htmlFor="addressLine2">
                    <span className="font-bold text-sm">Address Line 2</span>
                    <TextInput
                      name="address_line_2"
                      className="rounded-md py-1 px-2 border text-zinc-700"
                    />
                  </label>
                </div>
                <div className="flex md:flex-row flex-col gap-8">
                  {' '}
                  <label htmlFor="city">
                    <span className="font-bold text-sm">
                      City <b className="text-red-500">*</b>
                    </span>
                    <TextInput
                      name="city"
                      className="rounded-md py-1 px-2 border text-zinc-700"
                    />
                  </label>
                  <label htmlFor="addressLine2">
                    <span className="font-bold text-sm">
                      State/Province/Region <b className="text-red-500">*</b>
                    </span>
                    <TextInput
                      name="region"
                      className="rounded-md py-1 px-2 border text-zinc-700"
                    />
                  </label>
                </div>
                <div className="flex md:flex-row flex-col gap-8">
                  {' '}
                  <label htmlFor="zipCode">
                    <span className="font-bold text-sm">
                      ZIP/Postal Code <b className="text-red-500">*</b>
                    </span>
                    <TextInput
                      name="zip_code"
                      className="rounded-md py-1 px-2 border text-zinc-700"
                    />
                  </label>
                  <label htmlFor="country" className="w-full">
                    <span className="font-bold text-sm">Choose Country</span>
                    <SelectInput
                      name="country"
                      className="w-full rounded-md py-1 px-2 border text-zinc-700"
                      options={countryOptions}
                    ></SelectInput>
                  </label>
                </div>
                <span className="text-red-500 text-sm self-end">
                  Required Fields*
                </span>
                <div className="self-end">
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      setIsConfirmModalOpen(true);
                    }}
                    className="rounded-md mr-2 bg-gray-50 shadow-none text-[#717284] border border-[#c0c0c0] hover:text-white hover:!bg-zinc-700"
                  >
                    Cancel
                  </Button>
                  <Button className="rounded-md px-6 shadow-none bg-yellow-700 text-black hover:text-white hover:!bg-zinc-700">
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Modal
          header="Discard changes?"
          open={isConfirmModalOpen}
          setOpen={setIsConfirmModalOpen}
          footer={
            <div className="self-end">
              <Button className="rounded-md mr-2 bg-gray-50 shadow-none text-[#717284] border border-[#c0c0c0] hover:!text-black hover:!bg-yellow-700">
                No
              </Button>
              <Button className="rounded-md shadow-none bg-zinc-700 text-white hover:!text-black hover:!bg-yellow-700">
                Yes
              </Button>
            </div>
          }
        >
          <p className="font-sm">
            You haven’t saved your changes. Are you sure you want to discard
            your changes?
          </p>
        </Modal>
      </>
    </HomeLayout>
  );
}
