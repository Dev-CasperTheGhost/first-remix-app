import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "react-bootstrap-icons";

export interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ title, children, isOpen, onClose }: ModalProps) => {
  return (
    <Transition show={isOpen} appear as={React.Fragment}>
      <Dialog
        open={isOpen}
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/10" />
          </Transition.Child>

          {/* this element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="z-30 max-w-[100%] inline-block p-4 px-6 my-8 overflow-auto text-left align-middle transition-all transform bg-white dark:bg-dark-bg dark:text-white shadow-xl rounded-lg w-[500px]">
              <Dialog.Title
                as="h3"
                className="flex items-center justify-between mb-2 text-xl font-semibold text-gray-900 dark:text-white"
              >
                {title}

                <button
                  onClick={onClose}
                  className="p-1.5 transition-all cursor-pointer rounded-lg hover:bg-gray-200 dark:hover:bg-dark-bright"
                >
                  <X width={25} height={25} />
                </button>
              </Dialog.Title>

              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
