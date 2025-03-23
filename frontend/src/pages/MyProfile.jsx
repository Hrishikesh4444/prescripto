import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
const MyProfile = () => {

  const {userData,setUserData,token,backendUrl,loadUserProfileData}=useContext(AppContext)
  // const [userData, setUserData] = useState({
  //   name: "Bob Vincent",
  //   image: assets.profile_pic,
  //   email: "bobvincent@gmail.com",
  //   phone: "+1 123 666 7887",
  //   address: {
  //     line1: "56 Cross, Richmond",
  //     line2: "Circle,Church Road, London",
  //   },
  //   gender: "Male",
  //   dob: "2004-01-17",
  // });

  const [edit, setEdit] = useState(false);
  const [image,setImage]=useState(false);

  const updateUserProfileData=async()=>{
    try {
      const formData=new FormData()

    formData.append('name',userData.name)
    formData.append('phone',userData.phone)
    formData.append('gender',userData.gender)
    formData.append('dob',userData.dob)
    formData.append('address',JSON.stringify(userData.address))

    image && formData.append('image',image)

    const {data}=await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})

    if(data.success){
      toast.success(data.message)
      await loadUserProfileData()
      setEdit(false)
      setImage(false)
    }
    else{
      toast.error(data.error)
    }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
    
  }

  return userData && (
    <div className="flex flex-col gap-2 text-sm max-w-lg">
      {
        edit? <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-70" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className="w-10 absolute bottom-12 right-12" src={image? '':assets.upload_icon} alt="" />
          </div>
          <input type="file" onChange={(e)=>setImage(e.target.files[0])} id="image" hidden/>
        </label>
        : <img className="w-36 rounded" src={userData.image} alt="" />
      }
      


      {edit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
          <p className="font-medium">Email id:</p>
          
          {edit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.email}</p>
          )}

          <p className="font-medium">Phone:</p>
          {edit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {edit ? (
            <p>
              <input
                className="bg-gray-50"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line1: e.target.value,
                    },
                  }))
                }
                value={userData.address.line1}
                type="text"
              />
              <br />
              <input
                className="bg-gray-50"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line2: e.target.value,
                    },
                  }))
                }
                value={userData.address.line2}
                type="text"
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>

        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>

          {edit ? (
            <select
              className="max-w-20 bg-gray-100"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {edit ? (
            <input
              className="max-w-28 bg-gray-100 cursor-pointer"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>

        <div className="mt-10">
          {edit ? (
            <button className="border border-[#5f6FFF] px-8 py-2 rounded-full cursor-pointer hover:bg-[#5f6FFF] hover:text-white transition-all" onClick={updateUserProfileData}>Save Information</button>
          ) : (
            <button className="border border-[#5f6FFF] px-8 py-2 rounded-full cursor-pointer hover:bg-[#5f6FFF] hover:text-white transition-all" onClick={() => setEdit(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
