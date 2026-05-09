import { useEffect, useRef } from 'react'
import { getUserData } from "./utils/userTracker";
import { sendVisitData } from "./services/api";

function App() {
   const hasRun = useRef(false); 

  useEffect(() => {
    if (hasRun.current) return; 

    hasRun.current = true;

    async function trackUser() {
      const data = getUserData();
      await sendVisitData(data);
      console.log("Data sent:", data);
    }

    trackUser();
  }, []);

  
   return (
      <div>
       {/* eslint-disable-next-line no-undef */}
       <ContactForm />

    </div>
  );
}

export default App;