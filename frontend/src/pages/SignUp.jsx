import { useState } from "react";
import { HiEyeOff } from 'react-icons/hi';
import { FaEye } from 'react-icons/fa';
import axios from "axios";
import { serverURL } from "../App";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const navigate =useNavigate();
  const[fullName,setFullName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[mobile,setMobile]=useState("")

const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
        const result=await axios.post(`${serverURL}/api/auth/signup`,{fullName,email,password,mobile,role},{withCredentials:true})

        console.log(result)

    }
    
    catch(err){
        console.log(err)
    }
}


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md border border-gray-100">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-red-700">TastyNest</h1>
        <p className="text-gray-500 text-sm mt-1 mb-6">
          Join now & taste happiness at your doorstep.
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* Full Name */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </span>
            <input
              type="text"
              placeholder="Enter your Full Name"
              className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400" onChange={(e)=>setFullName(e.target.value)} value={fullName}
            />
          </div>

          {/* Email */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </span>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400" onChange={(e)=>setEmail(e.target.value)} value={email}
            />
          </div>

          {/* Mobile */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">
              Mobile
            </span>
            <input
              type="text"
              placeholder="Enter your Mobile Number"
              className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400" onChange={(e)=>setMobile(e.target.value)} value={mobile}
            />
          </div>

          {/* Password */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400" onChange={(e)=>setPassword(e.target.value)} value={password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <HiEyeOff size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </span>
            <div className="flex gap-2">
              {["user", "owner", "deliveryBoy"].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 rounded-xl border capitalize font-medium transition ${
                    role === r
                      ? "bg-red-500 text-white border-red-500 shadow-md"
                      : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Sign Up */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2.5 rounded-xl font-semibold hover:bg-red-600 transition shadow-md" onClick={handleSubmit}
          >
            Sign Up
          </button>

          {/* Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border py-2.5 rounded-xl hover:bg-gray-50 transition" 
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium">
              Sign up with Google
            </span>
          </button>
        </form>

        {/* Sign in link */}
        <p className="text-center text-sm text-gray-600 mt-6" onClick={()=>navigate('/signin')}>
          Already have an account?{" "}
          <span className="text-red-500 font-semibold hover:underline">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
export default SignUp;