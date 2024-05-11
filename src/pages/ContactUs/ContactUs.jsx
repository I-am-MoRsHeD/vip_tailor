/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";
import { CiLocationOn, CiClock2 } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const Contact = () => {
  const { register, formState: { errors } } = useForm()

  // email js
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_dxn2onr',
      'template_e98njye',
      form.current,
      'z1bY8W4MVJUDUn_eK')
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          title: "Good job!",
          text: "Your Email is send!",
          icon: "success"
        });
      }, (error) => {
        console.log(error.text);
      });
  };
  return (

    <div className="">
      <section className=" mb-6 mx-auto" id="contact ">
      <div className="py-16">
            <div className="mb-6 w-full text-center sm:text-center md:mx-auto md:mb-12 bg-[#e5e4e4] py-5 text-[#403030]">
              <h1 className="text-2xl md:text-3xl text-center  font-bold">Get In Touch</h1>
              <p className="w-full text-center mx-auto mt-2 ">We're here to help and look forward to connecting with you!</p>
            </div>
          </div>
        <div className="mx-auto max-w-[1280px]">
          <div className="flex items-center justify-center max-w-6xl mx-auto px-8">
            <div className="grid md:grid-cols-2">
              <div className="h-full pr-6">
                <p className="mt-3 mb-12 text-lg text-gray-600">
                  We are very much pleased to have customers like you.We are always waiting for your feedback and always be here to help you in our best way.Don't be hesitated to contact with us!
                </p>
                <ul className="mb-6 md:mb-0">
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0a1d56] text-gray-50">
                      <CiLocationOn className="text-2xl" />
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">
                        Our Address
                      </h3>
                      <p className="text-gray-600">
                        Bokteyar Market,BohoddarHat
                      </p>
                      <p className="text-gray-600">Chattogram, Bangladesh</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0a1d56] text-gray-50">
                      <IoCallOutline className="text-2xl" />
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">
                        Contact
                      </h3>
                      <p className="text-gray-600">Mobile: +880 1862 576246</p>
                      <p className="text-gray-600">Mail: viptailorctg@gmail.com</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0a1d56] text-gray-50">
                      <CiClock2 className="text-2xl" />
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">
                        Open From -
                      </h3>
                      <p className="text-gray-600">
                        Saturday - Thursday : 08:00AM - 09:00PM
                      </p>
                      <p className="text-gray-600">
                        Friday : 09:00 - 12:00PM &amp; 04:00PM - 09:00PM
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card h-fit max-w-6xl py-5 md:px-12" id="form">
                <h2 className="mb-4 text-2xl font-bold">
                  Ready to Get Started?
                </h2>
                <form ref={form} id="contactForm" onSubmit={sendEmail} >
                  <div className="mb-6">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          htmlFor="name"
                          className="pb-1 text-xs uppercase tracking-wider"></label>
                        <input
                          {...register('name', { required: 'input field is required' })}
                          type="text"
                          id="name"
                          autoComplete="given-name"
                          placeholder="Your name"
                          className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-sm  sm:mb-0"
                          name="from_name"
                        />
                        <p className="text-red-500 py-3 font-bold">
                          {errors.name?.message}
                        </p>
                      </div>
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          htmlFor="email"
                          className="pb-1 text-xs uppercase tracking-wider"></label>
                        <input
                          {...register('email', { required: 'input field is required' })}
                          type="email"
                          id="email"
                          autoComplete="email"
                          placeholder="Your email address"
                          className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-sm  sm:mb-0"
                          name="form_email"
                        />
                        <p className="text-red-500 py-3 font-bold">
                          {errors.name?.message}
                        </p>
                      </div>
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="textarea"
                        className="pb-1 text-xs uppercase tracking-wider"></label>
                      <textarea
                        {...register('textarea', { required: 'input field is required' })}
                        id="textarea"
                        name="message"
                        cols="30"
                        rows="5"
                        placeholder="Write your message..."
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-sm  sm:mb-0"></textarea>
                      <p className="text-red-500 py-3 font-bold">
                        {errors.name?.message}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full bg-[#0a1d56] text-white px-6 py-3 font-xl rounded-md sm:mb-0">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
