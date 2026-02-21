import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonialData = [
  { name: "Sarah J.", quote: "CivicReport helped me get the street light fixed near my home quickly." },
  { name: "Ali R.", quote: "I love how transparent and easy to use this platform is." },
  { name: "Nadia K.", quote: "Reports are handled efficiently and responsibly. Highly recommended!" },
  { name: "Rafiq H.", quote: "Thanks to CivicReport, my neighborhood potholes were fixed in days!" },
  { name: "Mina S.", quote: "The platform makes reporting civic issues effortless and accountable." },
];

const journeyData = [
  { year: "2022", event: "Platform Conceptualized" },
  { year: "2023", event: "Beta Testing" },
  { year: "2024", event: "Nationwide Launch" },
  { year: "2025", event: "Mobile App Release" },
  { year: "2026", event: "Integration with Local Authorities" },
];

const AboutUs = () => {
  return (
    <div className="text-slate-800">

      
      <section className="py-24 text-center bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About CivicReport</h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            CivicReport empowers citizens and local authorities to report, track, and resolve civic issues transparently and efficiently. Our platform ensures accountability, faster response, and better-managed communities.
          </p>
        </div>
      </section>

     
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition-transform">
          <div className="text-blue-500 text-4xl mb-4">🎯</div>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            To empower citizens and local authorities with a transparent and accountable platform for reporting and resolving civic issues efficiently.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition-transform">
          <div className="text-green-500 text-4xl mb-4">🌟</div>
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            To create stronger, safer, and smarter communities where every voice is heard, and civic problems are solved effectively.
          </p>
        </div>
      </section>

      
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition-transform text-center">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="font-semibold mb-2">Transparency</h3>
            <p className="text-slate-600">We ensure openness and clear communication at every step.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition-transform text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="font-semibold mb-2">Efficiency</h3>
            <p className="text-slate-600">Quick and effective resolution of civic issues.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition-transform text-center">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="font-semibold mb-2">Accountability</h3>
            <p className="text-slate-600">Every report and action is tracked responsibly.</p>
          </div>
        </div>
      </section>

      
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-300 h-full"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            {journeyData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white font-bold text-xl flex items-center justify-center mb-4 shadow-lg">{item.year}</div>
                <p className="text-slate-700 font-semibold">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Work Flow</h2>
        <div className="grid md:grid-cols-3 gap-8 text-slate-600 text-lg">
          {[
            { step: "1", title: "Report an Issue", desc: "Citizens submit civic issues through our platform with details and photos." },
            { step: "2", title: "Track Progress", desc: "Monitor the status and updates from authorities in real-time." },
            { step: "3", title: "Resolution & Feedback", desc: "Authorities resolve the issue and citizens provide feedback." },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-lg hover:scale-105 transition-transform text-center">
              <div className="text-3xl mb-4">{item.step}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

     
      <section className="py-20 max-w-6xl mx-auto px-6 bg-slate-50">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Testimonials</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
        >
          {testimonialData.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white p-8 rounded-3xl shadow mx-4 md:mx-0 text-center">
                <p className="italic mb-4 text-lg md:text-xl">"{t.quote}"</p>
                <h3 className="font-semibold text-md md:text-lg">{t.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default AboutUs;