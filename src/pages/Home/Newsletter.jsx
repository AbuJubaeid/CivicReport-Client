import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Subscribed successfully! 🎉");
    setEmail("");
  };

  return (
    <section className="mb-10">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-base-100 px-8 py-16 text-center max-w-3xl mx-auto">

          
          <div className="text-5xl mb-4">📬</div>

          
          <h2 className="text-3xl md:text-4xl font-semibold text-base-content mb-4">
            Stay Updated
          </h2>
          <p className="text-base-content/60 mb-8 max-w-xl mx-auto">
            Subscribe to get notified about new civic reports, resolved issues,
            and platform updates in your city.
          </p>

          {/* Form */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="Enter your email address"
              className="input input-bordered w-full sm:w-96 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="btn bg-base-content text-base-100 hover:opacity-90 border-none w-full sm:w-auto px-8"
            >
              Subscribe
            </button>
          </div>

          
          <p className="text-base-content/40 text-xs mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;