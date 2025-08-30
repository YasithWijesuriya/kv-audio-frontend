import { useState } from "react";
import "./register.css";
import api from "../../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!firstName.trim()) {
      toast.error("Please enter your first name");
      return false;
    }
    
    if (!lastName.trim()) {
      toast.error("Please enter your last name");
      return false;
    }
    
    if (!email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    
    if (!address.trim()) {
      toast.error("Please enter your address");
      return false;
    }
    
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    
    // Basic phone validation
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    
    return true;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    console.log({ firstName, lastName, email, password, address, phone });
    
api.post("/api/users/", {
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      password: password,
      address: address.trim(),
      phone: phone.trim()
    }).then((response) => {
      toast.success("Registration successful! Welcome to KV Audio!");
      
      // Auto-login after successful registration
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        
        // Check if user is admin and redirect accordingly
        if (response.data.user && response.data.user.role === "admin") {
          navigate("/admin/");
        } else {
          navigate("/");
        }
      } else {
        // If no token in response, redirect to login
        navigate("/login");
      }
    }).catch((err) => {
      const errorMessage = err?.response?.data?.error || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <>
      <div className="bg-picture w-full min-h-[calc(100vh-70px)] flex justify-center items-center">
        <form onSubmit={handleOnSubmit}>
          <div className="w-[400px] min-h-[700px] backdrop-blur-xl rounded-2xl flex flex-col items-center py-10 relative">
            <img
              src="/logo.png"
              alt="logo"
              className="w-[100px] h-[100px] object-cover mb-6"
            />
            
            <input
              type="text"
              placeholder="First Name"
              className="input-field"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
              required
            />
            
            <input
              type="text"
              placeholder="Last Name"
              className="input-field"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
              required
            />
            
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            
            <input
              type="password"
              placeholder="Confirm Password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            
            <input
              type="text"
              placeholder="Address"
              className="input-field"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isLoading}
              required
            />
            
            <input
              type="tel"
              placeholder="Phone Number"
              className="input-field"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
              required
            />
            
            <button 
              type="submit"
              className="my-8 w-[300px] h-[50px] bg-[#efac38] text-2xl text-white rounded-lg hover:bg-[#d99b2f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
            
            <div className="text-center">
              <p className="text-white text-sm">
                Already have an account?{" "}
                <button 
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-[#efac38] hover:underline font-medium"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
