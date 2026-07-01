"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const API = "https://auth.arteliainstitute.com/api/auth";

const alertStyle = {
  background: "#ffffff",
  color: "#111",
  confirmButtonColor: "#111",
  customClass: {
    popup: "!rounded-2xl",
    confirmButton: "!rounded-xl !px-6 !py-2.5 !font-medium",
  },
};

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [expired, setExpired] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/home");
    }
  }, [router]);

  // OTP countdown
  useEffect(() => {
    if (!showOtp) return;

    setExpired(false);
    setTimer(120);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setExpired(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showOtp]);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSendOtp = async () => {
    if (loading) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      Swal.fire({
        title: "Email required",
        text: "Please enter your email.",
        icon: "warning",
        ...alertStyle,
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        icon: "warning",
        ...alertStyle,
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API}/send-login-otp?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to send OTP");
      }

      setShowOtp(true);

      Swal.fire({
        title: "OTP Sent",
        text: data?.message || "Please check your inbox.",
        icon: "success",
        ...alertStyle,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error instanceof Error
            ? error.message
            : "Unable to send OTP.",
        icon: "error",
        ...alertStyle,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setShowOtp(false);

    setTimeout(() => {
      setShowOtp(true);
    }, 50);

    await handleSendOtp();
  };

  const handleVerifyOtp = async () => {
    if (loading) return;

    if (!otp.trim()) {
      Swal.fire({
        title: "OTP Required",
        text: "Please enter the OTP.",
        icon: "warning",
        ...alertStyle,
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API}/verify-login-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otpCode: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Verification failed");
      }

      const {
        token,
        refreshToken,
        email: userEmail,
        username,
        isVerified,
      } = data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: userEmail,
          username,
          isVerified,
        })
      );

      await Swal.fire({
        title: `Welcome, ${username}!`,
        text: "Login successful.",
        icon: "success",
        ...alertStyle,
      });

      router.replace("/home");
    } catch (error) {
      Swal.fire({
        title: "Verification Failed",
        text:
          error instanceof Error
            ? error.message
            : "Invalid OTP.",
        icon: "error",
        ...alertStyle,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f3] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-stone-200 rounded-2xl p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-full bg-stone-900 flex items-center justify-center overflow-hidden">
            <img
              src="/logo.png"
              alt="Codolog Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="text-stone-900 font-semibold text-lg leading-tight">
              Codolog
            </p>
            <p className="text-stone-400 text-xs">
              Always Learn Unique
            </p>
          </div>
        </div>

        <p className="text-xs font-medium text-stone-400 uppercase tracking-widest mb-6">
          Admin Login
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-stone-600 mb-1.5">
            Email Address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            disabled={showOtp}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !showOtp &&
              handleSendOtp()
            }
            className="w-full h-11 rounded-xl text-black border border-stone-200 bg-stone-50 px-4 text-sm outline-none focus:border-stone-900 focus:bg-white disabled:opacity-50"
          />
        </div>

        {showOtp && (
          <div className="mb-4">
            <label className="block text-sm text-black  font-medium text-stone-600 mb-1.5">
              One-Time Password
            </label>

            <input
              type="text"
              placeholder="6-digit OTP"
              maxLength={6}
              autoFocus
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleVerifyOtp()
              }
              className="w-full h-11 rounded-xl text-black border border-stone-200 bg-stone-50 px-4 text-sm tracking-widest outline-none focus:border-stone-900 focus:bg-white"
            />

            {!expired ? (
              <p className="text-xs text-stone-400 mt-2">
                Resend in {formatTime()}
              </p>
            ) : (
              <p className="text-xs text-stone-400 mt-2">
                OTP expired.{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="underline text-stone-900 font-medium"
                >
                  Resend
                </button>
              </p>
            )}
          </div>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={
            showOtp ? handleVerifyOtp : handleSendOtp
          }
          className="w-full h-11 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 disabled:opacity-50"
        >
          {loading
            ? showOtp
              ? "Verifying..."
              : "Sending..."
            : showOtp
            ? "Verify OTP"
            : "Send OTP"}
        </button>
      </div>
    </div>
  );
}