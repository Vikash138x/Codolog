import { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  //  Error state
  const [errors, setErrors] = useState({});

  //  Validation function
  const validate = () => {
    let newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Message validation
    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Run validation
    const validationErrors = validate();
    setErrors(validationErrors);

    //  Stop if errors exist
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const formData = {
      name,
      email,
      message
    };

    try {
      const response = await fetch(
        "https://69e7bfbd68208c1debe94fc4.mockapi.io/contact_form/contact_us",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();
      console.log("Success:", data);

      
      setName("");
      setEmail("");
      setMessage("");
      setErrors({}); 

    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Contact Us
        </h2>

        
        <form onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 border border-black-300 rounded-lg"
          />
          
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <br />

          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-black-300 rounded-lg"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <br />

          <textarea
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 mb-4 border border-black-300 rounded-lg"
          ></textarea>
          {errors.message && <p className="text-red-500">{errors.message}</p>}

          <br />

          <button
            type="submit"
            className="w-full bg-blue-400 p-3 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;