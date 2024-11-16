import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const NotifyInput = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await toast.promise(
        axios.post("/api/subscribe.json", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Sending notification...",
          success: "We will contact you soon.",
          error: "Something went wrong. Please try again",
        }
      );

      if (response.status === 200) {
        setEmail("");
      } else {
        toast.dismiss();
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <div className="bg-[#292929] gap-2 rounded-md mt-4 flex justify-between items-center pl-8 text-left w-[80%]">
        <div className="grow">
          <input
            className="text-white text-2xl placeholder:text-2xl text-left w-full grow bg-[#292929] border-none outline-none ring-0"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="m-1">
          <button className="text-center" type="submit" disabled={loading}>
            <div className="btn-outline-primary inline-block relative overflow-hidden text-primary-black font-semibold px-6 py-3 text-center transition-all duration-300 ease-in-out min-w-[200px] bg-white border-black hover:bg-primary-black rounded-md">
              <span className="hover:text-white">
                {loading ? "Sending..." : "Notify Me"}
              </span>
            </div>
          </button>
        </div>
      </div>
      <Toaster position="top-center" />
    </form>
  );
};

export default NotifyInput;
