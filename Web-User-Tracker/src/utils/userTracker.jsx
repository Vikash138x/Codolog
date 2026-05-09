// Generate or get existing userId
export function getUserId() {
  let userId = localStorage.getItem("userId");

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
  }

  return userId;
}

// Collect user data
export function getUserData() {
  return {
    userId: getUserId(),
    timestamp: new Date().toISOString(),
    //deviceType: /Mobi|Android/i.test(navigator.userAgent)
    //  ? "Mobile"
     /// : "Desktop",
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
    webBrowser: navigator.userAgent,
    url: window.location.href,
  };
}