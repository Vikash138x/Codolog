"use client";

import axios from "axios";
import Cookies from "js-cookie";

const COOKIE_NAME = "visitor_session";

interface VisitorSession {
  visitorId: number;
  visitorToken: string;
  sessionId: string;
}

function getStoredVisitor(): VisitorSession | null {
  const existing = Cookies.get(COOKIE_NAME);

  if (!existing) {
    return null;
  }

  try {
    return JSON.parse(existing) as VisitorSession;
  } catch {
    Cookies.remove(COOKIE_NAME, { path: "/" });
    return null;
  }
}

function saveVisitor(visitor: VisitorSession) {
  Cookies.set(COOKIE_NAME, JSON.stringify(visitor), {
    expires: 30,
    path: "/",
    sameSite: "lax",
  });
}

export async function initializeVisitor() {
  try {
    const existingVisitor = getStoredVisitor();

    if (existingVisitor) {
      console.log("Visitor already exists in cookie.");
      return existingVisitor;
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/visitors`,
      {
        source: "Google Ads",
        browser: navigator.userAgent,
        device: /Mobi|Android/i.test(navigator.userAgent)
          ? "Mobile"
          : "Desktop",
        os: navigator.platform,
        ipAddress: "0.0.0.0",
        url: window.location.href,
        marketing: false,
      }
    );

    const visitor: VisitorSession = {
      visitorId: response.data.data.visitorId,
      visitorToken: response.data.data.visitorToken,
      sessionId: response.data.data.sessionId,
    };

    saveVisitor(visitor);

    return visitor;
  } catch (err) {
    console.error("Visitor API Error", err);
    return null;
  }
}