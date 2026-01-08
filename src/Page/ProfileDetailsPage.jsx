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

  function handleSignOut() {
    localStorage.removeItem("token");
    // preserve behavior: redirect to login
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto w-full px-4 py-6">
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">Hello,</span>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">{userData?.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => handleTabChange("photo")}
              aria-pressed={activeTab === "photo"}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition shadow-sm w-full sm:w-auto justify-center ${activeTab === "photo" ? 'bg-blue-600 text-white dark:bg-blue-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm8 6a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Upload Photo
            </button>

            <button
              onClick={() => handleTabChange("password")}
              aria-pressed={activeTab === "password"}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition shadow-sm w-full sm:w-auto justify-center ${activeTab === "password" ? 'bg-blue-600 text-white dark:bg-blue-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 8a5 5 0 1110 0v1h1a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5a2 2 0 012-2h1V8zm5-3a3 3 0 00-3 3v1h6V8a3 3 0 00-3-3z" clipRule="evenodd" />
              </svg>
              Change Password
            </button>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition shadow-sm w-full sm:w-auto justify-center bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="max-w-3xl mx-auto">
            {activeTab === "photo" && <UploadPhoto />}
            {activeTab === "password" && <ChangePassword />}
          </div>
        </div>
      </div>
    </div>
  );
}