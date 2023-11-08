"use client"

import Image from 'next/image'
import { useEffect, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { BiSolidShieldAlt2 } from 'react-icons/bi';
import { BsTagFill } from 'react-icons/bs';
import Popup from 'reactjs-popup';


function Profile() {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch('https://random-data-api.com/api/v2/users?size=20&is_json=true')
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        console.log(data)
        setIsLoading(false);
      });
  }, []);

  const filteredProfile = profile.filter((item) =>
    item.username.toLowerCase().includes(search.toLowerCase()) ||
    item.first_name.toLowerCase().includes(search.toLowerCase()) ||
    item.last_name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (!profile || profile.length === 0) {
    return <p>No List to show</p>;
  }

  return (
    <>
       <div className="absolute inset-x-0 top-0 w-full h-24  bg-yellow-200 ">
        </div>
      <div className='bg-white  rounded-md flex items-center max-w-md mx-auto mt-10 shadow  border-0 p-3 relative '>
        <form className="w-full relative pt-4 pb-4 pl-4 pr-4 ">
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              className="rounded-md  p-4 w-96 border-black border h-2 shadow-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 ">
              <AiOutlineSearch />
            </button>
          </div>
        </form>
      </div>

      <div className='pl-12'>
        <span className='border-s-2 pl-2 text-xl'>People</span>
        <p className='pl-2'>
          Search  results {filteredProfile.length} items of {profile.length}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-10 place-items-center mt-2">

        {filteredProfile.map((item, index) => (
          <div
            key={index}
            className="block rounded-lg bg-white hover:bg-slate-300 relative shadow-md ml-2 mr-2 h-96 w-4/5 "
          >
            <div className="absolute inset-x-0 top-0 w-full h-20 bg-gradient-to-b from-indigo-500 rounded-t-lg">
            </div>

            <Image src={item.avatar} width="300" height="300" alt={item.username} className="rounded-full w-20 h-20 bg-slate-600 mt-6 mb-2 relative ml-2" />

            <div className='relative ml-2 '>
              <p className="text-l pt-2">{item.first_name} {item.last_name}</p>
              <p className="text-xs pb-2">{item.first_name}</p>
            </div>

            <div className='border-b-2 border-t-2 relative ml-2 mr-2  '>
              <p className='text-xs pt-2'>Email : {item.email}</p>
              <p className='text-xs pb-2'>Start date : {item.date_of_birth}</p>
            </div>

            <div className='relative ml-2'>
              {Object.keys(item.subscription).length > 2 ? (
                <>
                  <div className='mb-2 '>
                    <div className='justify-between'>
                      <span className='text-l pt-2 flex flex-row'>
                      <BiSolidShieldAlt2 />
                      <p className='pl-2'>Guild</p>
                    </span>
                    </div>

                    <span className='text-xs border border-indigo-600 rounded-full px-2 hover:bg-indigo-800 hover:text-white'>{item.gender}</span>
                    <span className='text-xs ml-2 border border-indigo-600 rounded-full px-2 hover:bg-indigo-800 hover:text-white'>{item.address.country}</span>

                    <Popup trigger={<button><span className='text-xs ml-2 border border-indigo-600 rounded-full hover:bg-indigo-800 hover:text-white'>...</span></button>}
                      position="top center">
                      <div className='bg-white flex flex-col my-2 w-52 border border-indigo-600 rounded-md'>
                        <span className='text-xs border border-indigo-600 rounded-full h-5 px-2 my-2 mx-2 hover:bg-indigo-800 w-28 hover:text-white '>{item.gender}</span>
                        <span className='text-xs border border-indigo-600 rounded-full h-5 px-2 my-2 mx-2 hover:bg-indigo-800 w-28 hover:text-white'>{item.address.country}</span>
                      </div>
                    </Popup>

                  </div>


                </>
              ) : (
                <>
                  <span className='text-l pt-2 flex flex-row'> <BiSolidShieldAlt2 /> <p className='pl-2'>Guild</p> </span>
                </>

              )
              }
              <div className='mb-2'>
                <span className='text-l flex flex-row'>
                  <BsTagFill />
                  <p className='pl-2'>Tag</p>
                </span>
                <span className='text-xs border border-indigo-600 rounded-full px-2 hover:bg-indigo-800 hover:text-white '>{item.subscription.plan}</span>
              </div>


            </div>
          </div>

        ))}
      </div>
    </>
  );
}
export default Profile