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

  // GENERATED OTP
  const [generatedOtp, setGeneratedOtp] = useState("");

  // TIMER
  const [timer, setTimer] = useState(120);

  const API = "https://jsonplaceholder.typicode.com/posts";

  // ALERT THEME
  const alertStyle = {
    background: "#ececec",
    color: "#2f2f2f",
    confirmButtonColor: "#2f2f2f",

    customClass: {
      popup: "rounded-[28px]",
      title: "text-3xl font-bold",
      confirmButton:
        "rounded-xl px-6 py-3 text-lg font-semibold",
    },
  };

  // TIMER EFFECT
  useEffect(() => {
    let interval;

    if (showOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showOtp, timer]);

  // FORMAT TIMER
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  // GET OTP
  const handleGetOtp = async () => {
    if (!email) {
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

      await axios.post(API, {
        email,
      });

      // RANDOM OTP
      const randomOtp = Math.floor(
        1000 + Math.random() * 9000
      ).toString();

      setGeneratedOtp(randomOtp);

      console.log("Generated OTP:", randomOtp);

      setShowOtp(true);

      setTimer(120);

      Swal.fire({
        title: "OTP Sent Successfully",
        text: `Mock OTP: ${randomOtp}`,
        icon: "success",
        confirmButtonText: "OK",
        ...alertStyle,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
        ...alertStyle,
      });
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
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

      await axios.post(API, {
        email,
        otp,
      });

      // OTP CHECK
      if (otp === generatedOtp) {
        Swal.fire({
          title: "Login Successful",
          text: "Welcome to Codolog Admin",
          icon: "success",
          confirmButtonText: "Continue",
          ...alertStyle,
        });
      } else {
        Swal.fire({
          title: "Invalid OTP",
          text: "Please enter correct OTP",
          icon: "error",
          confirmButtonText: "Try Again",
          ...alertStyle,
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Verification Failed",
        text: "Please try again",
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

        {/* LOGO */}
        <div className="flex items-center gap-4 mb-10">
          
          <div className="w-16 h-16 rounded-full border-4 border-black overflow-hidden bg-white">
            <img
              src={Codolog}
              alt="Codolog Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Codolog
            </h1>

            <p className="text-gray-600 text-sm">
              Always learn Unique
            </p>
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-5xl font-bold mb-14">
          ADMIN LOGIN
        </h2>

        {/* EMAIL */}
        <div className="w-full mb-8">
          <label className="block text-2xl mb-3 font-medium">
            Username / Email
          </label>

          <input
            type="email"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full h-20 rounded-2xl bg-[#ececec] px-6 text-2xl outline-none"
          />
        </div>

        {/* OTP SECTION */}
        {showOtp && (
          <>
            <div className="w-full mb-4">
              <label className="block text-2xl mb-3 font-medium">
                OTP
              </label>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
                className="w-full h-20 rounded-2xl bg-[#ececec] px-6 text-2xl outline-none"
              />
            </div>

            <p className="text-gray-500 mb-10 text-lg">
              Resend OTP in {formatTime()}
            </p>
          </>
        )}

        {/* BUTTON */}
        {!showOtp ? (
          <button
            onClick={handleGetOtp}
            disabled={loading}
            className="bg-[#2f2f2f] text-white px-16 py-5 rounded-xl text-2xl font-bold hover:opacity-90 transition"
          >
            {loading
              ? "Loading..."
              : "GET OTP"}
          </button>
        ) : (
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="bg-[#2f2f2f] text-white px-16 py-5 rounded-xl text-2xl font-bold hover:opacity-90 transition"
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