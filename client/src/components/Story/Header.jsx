import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleAddBook = () => {
    navigate("/story/create"); // Use relative
  };
  return (
    <div>
      <div>
        <div>
          <img
            className="h-32 w-full object-cover lg:h-24 mb-4"
            src="https://images.unsplash.com/photo-1504903271097-d7e7c7f5f7ad?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFya3xlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <img
                className="h-16 w-16 rounded-full ring-4 ring-gray-950 sm:h-24 sm:w-24"
                src="https://media.istockphoto.com/id/1129874863/photo/books-on-display-in-the-corner-of-a-second-hand-bookstore.jpg?s=612x612&w=0&k=20&c=ez0PTZuEp8Vn5SFMSxOVggudvgsHFKsFKlAwObaXkuI="
                alt=""
              />
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                <h1 className="truncate text-4xl text-gray-50 font-bold p-4 ">
                  Humorous Stories
                </h1>
              </div>
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                <button
                  type="button"
                  className="mt-2 inline-flex justify-center rounded-lg px-3 py-2 text-sm text-gray-50 font-medium ring-1  ring-gray-900 "
                  onClick={handleAddBook}
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
