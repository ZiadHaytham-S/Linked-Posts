import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import UploadPhoto from '../UserInfo.jsx/UploadPhoto'
import ChangePassword from '../UserInfo.jsx/ChangePassword'


export default function ProfilePage() {
  const { userData } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "posts";
 
  function handleTabChange(tab) {
    setSearchParams({ tab });
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center content-center  text-1xl gap-4">
     
        <span className="text-blue-300 font-semibold text-center w-full">
          Hello, <span className="text-gray-800">{userData?.name}</span>
        </span>

       
        <button
          onClick={() => handleTabChange("photo")}
          className={`p-2 bg-gray-500  rounded w-full ${activeTab === "photo"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
          Upload Photo
        </button>

        <button
          onClick={() => handleTabChange("password")}
          className={`p-2 cursor-pointer rounded w-full  ${activeTab === "password"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
          Change Password
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="p-2 cursor-pointer rounded w-full  text-red-600 bg-white hover:bg-gray-900 hover:text-white"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-6 md:ml-64 items-center content-center">
       
        {activeTab === "photo" && <UploadPhoto/>}
        {activeTab === "password" && <ChangePassword />}
      </div>
    </div>
  );
}