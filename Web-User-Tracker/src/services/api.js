const API_URL = "https://69f062eb112e1b968e25b169.mockapi.io/userData";


export async function sendVisitData(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API Error:", error);
  }
}