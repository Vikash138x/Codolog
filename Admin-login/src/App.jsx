import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./App.css";
import Codolog from "./assets/Codolog.png";

export default function App() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);

  // API URL
  const API =
    "https://auth.arteliainstitute.com/api/auth";

  // Alert Style
  const alertStyle = {
    background: "#ececec",
    color: "#2f2f2f",
    confirmButtonColor: "#2f2f2f",
    customClass: {
      popup: "rounded-[28px]",
      title: "text-2xl font-bold",
      confirmButton:
        "rounded-xl px-6 py-3 font-semibold",
    },
  };

  // Timer
  useEffect(() => {
    let interval;

    if (showOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);

  }, [showOtp, timer]);

  const formatTime = () => {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // SEND OTP
  const handleGetOtp = async () => {

    if (!email.trim()) {
      Swal.fire({
        title: "Email Required",
        text: "Please enter your email",
        icon: "warning",
        ...alertStyle,
      });

      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        `${API}/send-login-otp`,
        {},
        {
          params: {
            email,
          },
        }
      );

      setShowOtp(true);
      setTimer(120);

      Swal.fire({
        title: "OTP Sent",
        text:
          response.data.message ||
          "Check your email",
        icon: "success",
        ...alertStyle,
      });

    } catch (error) {

      Swal.fire({
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Failed to send OTP",
        icon: "error",
        ...alertStyle,
      });

    } finally {

      setLoading(false);

    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {

    if (!otp.trim()) {

      Swal.fire({
        title: "OTP Required",
        text: "Please enter OTP",
        icon: "warning",
        ...alertStyle,
      });

      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        `${API}/verify-login-otp`,
        {
          email,
          otpCode: otp,
        }
      );

      // Save token
      localStorage.setItem(
        "token",
        response.data.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.data
        )
      );

      Swal.fire({
        title: "Login Successful",
        text: `Welcome ${response.data.data.username}`,
        icon: "success",
        ...alertStyle,
      });

    } catch (error) {

      Swal.fire({
        title: "Verification Failed",
        text:
          error?.response?.data?.message ||
          "Invalid OTP",
        icon: "error",
        ...alertStyle,
      });

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">

      <div className="w-full max-w-md flex flex-col items-center">

        {/* Logo */}

        <div className="flex items-center gap-4 mb-10">

          <div className="w-16 h-16 rounded-full border-4 border-black overflow-hidden bg-white">

            <img
              src={Codolog}
              alt="logo"
              className="w-full h-full object-cover"
            />

          </div>

          <div>

            <h1 className="text-4xl font-bold">
              Codolog
            </h1>

            <p className="text-gray-600 text-sm">
              Always Learn Unique
            </p>

          </div>

        </div>

        <h2 className="text-2xl font-bold mb-10">
          ADMIN LOGIN
        </h2>

        {/* Email */}

        <div className="w-full mb-6">

          <label className="block text-xl mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
            className="w-full h-12 rounded-2xl bg-[#ececec] px-5 outline-none"
          />

        </div>

        {/* OTP */}

        {showOtp && (

          <>
            <div className="w-full mb-4">

              <label className="block text-xl mb-2 font-medium">
                OTP
              </label>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e)=>
                  setOtp(e.target.value)
                }
                className="w-full h-12 rounded-2xl bg-[#ececec] px-5 outline-none"
              />

            </div>

            <p className="text-gray-500 mb-8">
              Resend OTP in {formatTime()}
            </p>

          </>
        )}

        {!showOtp ? (

          <button
            onClick={handleGetOtp}
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            {loading
              ? "Sending..."
              : "GET OTP"}
          </button>

        ) : (

          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            {loading
              ? "Verifying..."
              : "VERIFY OTP"}
          </button>

        )}

      </div>

    </div>
  );
}