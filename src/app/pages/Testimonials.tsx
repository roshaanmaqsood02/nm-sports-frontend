"use client";

import Image from "next/image";
import Testimonial1 from '../../../public/testimonial_1.png'
import Testimonial2 from '../../../public/testimonial_2.jpg'
import Testimonial3 from '../../../public/testimonial_3.jpg'

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Head Coach, City Basketball",
      content:
        "MN Sports has transformed how we manage our team. The analytics tools helped us identify key areas for improvement.",
      profilePic: Testimonial1,
    },
    {
      name: "Michael Rodriguez",
      role: "Director, Youth Soccer League",
      content:
        "The scheduling features saved us hours of work each week. Our organization runs smoother than ever before.",
      profilePic: Testimonial2,
    },
    {
      name: "James Wilson",
      role: "Athletic Director, University",
      content:
        "The multi-tenant architecture is perfect for our different sports departments. Data stays completely separated.",
      profilePic: Testimonial3,
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Sports Organizations Worldwide
          </h2>
          <p className="text-xl text-gray-600">
            Hear from coaches, athletic directors, and league managers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <Image
                  src={testimonial.profilePic}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="rounded-xl object-cover border border-gray-200"
                />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
