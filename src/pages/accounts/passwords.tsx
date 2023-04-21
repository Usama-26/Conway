import {Button} from '@/components/Button';
import {TextInput} from '@/components/Form';
import Modal from '@/components/Modal';
import HomeLayout from '@/layouts/HomeLayout';
import SidebarAccounts from '@/layouts/components/SidebarAccounts';
import {InformationCircleIcon} from '@heroicons/react/24/outline';
import {useState} from 'react';
import Image from 'next/image';
import ToolTip from '@/components/ToolTip';

export default function Passwords() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  return (
    <HomeLayout>
      <>
        <SidebarAccounts />
        <div className="md:h-[700px] 2xl:h-[750px]">
          <div className="mb-7">
            <h1>
              <span className="font-bold text-xl text-zinc-700 border-r border-r-zinc-700 pr-2">
                My Account
              </span>
              <span className="text-yellow-700 ml-4"> Hello, Emma Smith</span>
            </h1>
          </div>
          <div className="flex md:flex-row flex-col gap-8 rounded-md md:border text-black border-[#c0c0c0] md:p-14 p-2 2xl:h-[600px] md:h-[550px] md:overflow-auto">
            <div className=" md:self-start self-center">
              <h2 className="text-xl font-bold mb-4">Password</h2>
              <p className="text-sm">
                Create and save strong, unique password that will protect your
                account.
              </p>
            </div>
            <div className="self-center basis-full flex md:flex-row flex-col ">
              <form
                action=""
                className="md:mx-auto flex flex-col gap-4 md:w-[512px] "
              >
                <label htmlFor="currentPass" className="w-full">
                  <span className="font-bold text-sm">Current Password</span>
                  <TextInput
                    name="current_password"
                    type="password"
                    className="w-full rounded-md py-1 px-2 border text-zinc-700"
                  />
                </label>
                <label htmlFor="newPass" className="w-full">
                  <span className="font-bold text-sm">New Password</span>
                  <span>
                    <Image
                      src={'/icons/tooltipicon.png'}
                      alt=""
                      width={15}
                      height={15}
                      className="inline-block ml-1 cursor-pointer"
                    />
                  </span>
                  <TextInput
                    name="new_password"
                    type="password"
                    className="w-full rounded-md py-1 px-2 border text-zinc-700"
                  />
                </label>
                <label htmlFor="confirmNewPass">
                  <span className="font-bold text-sm">
                    Confirm New Password
                  </span>
                  <TextInput
                    name="confirm_new_password"
                    type="password"
                    className="w-full rounded-md py-1 px-2 border text-zinc-700"
                  />
                </label>

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
          <p className=" font-sm">
            You haven’t saved your changes. Are you sure you want to discard
            your changes?
          </p>
        </Modal>
      </>
    </HomeLayout>
  );
}
