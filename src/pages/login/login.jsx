import axios from "axios";
import "./login.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      setIsGoogleLoading(true);
      console.log(res);
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`, {
        accessToken: res.access_token
      }).then((res) => {
        console.log(res);
        toast.success("Login Success");
        const user = res.data.user;
        localStorage.setItem("token", res.data.token);
        if (user.role === "admin") {
          navigate("/admin/");
        } else {
          navigate("/");
        }
      }).catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.error || "Google login failed");
      }).finally(() => {
        setIsGoogleLoading(false);
      });
    },
    onError: () => {
      toast.error("Google login failed");
    }
  });

  function handleOnSubmit(e) {
    e.preventDefault();
    
    // Form validation
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    
    if (!password.trim()) {
      toast.error("Please enter your password");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    console.log(email, password);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    axios.post(`${backendUrl}/api/users/login`, {
      email: email.trim(),
      password: password
    }).then((res) => {
      console.log(res);
      toast.success("Login Success");
      const user = res.data.user;
      localStorage.setItem("token", res.data.token);
      
      // Direct navigation based on user role
      if (user.role === "admin") {
        navigate("/admin/");
      } else {
        navigate("/");
      }
    }).catch((err) => {
      console.log(err);
      const errorMessage = err.response?.data?.error || "Login failed. Please try again.";
      toast.error(errorMessage);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <>
      <div className="bg-picture w-full min-h-[calc(100vh-70px)] flex justify-center items-center">
        <form onSubmit={handleOnSubmit}>
          <div className="w-[400px] h-[450px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col relative">
            <img
              src="/logo.png"
              alt="logo"
              className="w-[100px] h-[100px] object-cover"
            />

            <input
              type="email"
              placeholder="Email"
              className="mt-6 w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none placeholder-white placeholder-opacity-70"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-[300px] h-[30px] mt-6 bg-transparent border-b-2 border-white text-white text-xl outline-none placeholder-white placeholder-opacity-70"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              disabled={isLoading}
            />

            <button 
              type="submit"
              className="my-8 w-[300px] h-[50px] bg-[#efac38] text-2xl text-white rounded-lg hover:bg-[#d99b2f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <button 
              type="button"
              className="w-[300px] h-[50px] bg-[#4285f4] text-xl text-white rounded-lg hover:bg-[#3367d6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              onClick={googleLogin}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Login with Google
                </>
              )}
            </button>

            <div className="mt-4 text-center">
              <p className="text-white text-sm">
                Don't have an account?{" "}
                <button 
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-[#efac38] hover:underline font-medium"
                >
                  Register here
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}