'use client';
import { useState } from 'react';

export default function CTA() {
  const [reservationSent, setReservationSent] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  /** Allow only digits and '+' in the phone field */
  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    // Strip any character that isn't a digit or '+'
    const sanitized = value.replace(/[^0-9+]/g, '');
    e.target.value = sanitized;

    if (sanitized.length > 0 && !/^\+?\d+$/.test(sanitized)) {
      setPhoneError('Only numbers and "+" are allowed');
    } else {
      setPhoneError('');
    }
  }

  function submitReservation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Final phone validation before submit
    const phone = (data.get('phone') as string) || '';
    if (!/^\+?\d+$/.test(phone)) {
      setPhoneError('Please enter a valid phone number (digits and "+" only)');
      return;
    }

    const message = [
      'Hello Palm, I would like to make a reservation.',
      `Name: ${data.get('name')}`,
      `Phone: ${phone}`,
      data.get('email') ? `Email: ${data.get('email')}` : '',
      `Guests: ${data.get('guests')}`,
      `Date: ${data.get('date')}`,
      `Time: ${data.get('time')}`,
      data.get('notes') ? `Special Requests: ${data.get('notes')}` : ''
    ].filter(Boolean).join('\n');
    setReservationSent(true);
    window.open(`https://wa.me/919599280444?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="reservation" className="py-20 lg:py-28 bg-[#FFFFFF] text-[#171513] text-left">
      <div className="container max-w-[1240px] w-[92%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start text-left">
        {/* Left Column: Heading & Subheading in place of image */}
        <div className="flex flex-col justify-start items-start text-left w-full">
          <span className="text-[#244E31] text-[13px] font-bold tracking-[2.5px] uppercase mb-3 text-left">
            Reservation
          </span>
          <h2 className="font-serif italic font-normal text-[40px] sm:text-[48px] lg:text-[56px] text-[#2C1810] tracking-tight leading-[1.1] text-left">
            Make a Reservation
          </h2>
          <p className="text-[#6B655E] text-[16px] sm:text-[17px] leading-[1.7] mt-5 max-w-[480px] text-left">
            Reserve your table and enjoy an unforgettable dining experience, thoughtfully prepared for every occasion.
          </p>

          <div className="mt-10 pt-8 border-t border-[#E7DED3] flex flex-col items-start gap-3 text-[14px] text-[#77716A] text-left w-full">
            <p className="text-left">
              <span className="font-semibold text-[#171513]">Hours: </span>Open Daily 12:00 PM — 11:00 PM
            </p>
            <p className="text-left">
              <span className="font-semibold text-[#171513]">Reservations Line: </span>
              <a href="tel:9599280444" className="hover:underline text-[#171513]">9599280444</a> | <a href="tel:9599280666" className="hover:underline text-[#171513]">9599280666</a>
            </p>
            <p className="text-left">
              <span className="font-semibold text-[#171513]">Location: </span>One Golden Mile, Netaji Nagar, New Delhi
            </p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="reservation-form-wrap">
          <form
            id="reservationForm"
            onSubmit={submitReservation}
            className="reservation-form space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
              {/* Guests */}
              <div>
                <label htmlFor="guestCount" className="block text-[13px] font-medium text-[#77716A] mb-2">
                  Number of Guests
                </label>
                <input
                  id="guestCount"
                  name="guests"
                  type="number"
                  min="1"
                  required
                  placeholder="e.g. 4"
                  className="w-full h-[38px] bg-[#F6F5F2] hover:bg-[#F0EEE9] focus:bg-white border border-transparent focus:border-[#D5CEC5] text-[#171513] text-[14px] px-4 outline-none transition-all placeholder:text-[#A09A93]"
                />
              </div>

              {/* Date */}
              <div>
                <label htmlFor="guestDate" className="block text-[13px] font-medium text-[#77716A] mb-2">
                  Date
                </label>
                <input
                  id="guestDate"
                  name="date"
                  type="date"
                  required
                  placeholder="mm/dd/yyyy"
                  className="w-full h-[38px] bg-[#F6F5F2] hover:bg-[#F0EEE9] focus:bg-white border border-transparent focus:border-[#D5CEC5] text-[#171513] text-[14px] px-4 outline-none transition-all placeholder:text-[#A09A93]"
                />
              </div>

              {/* Time */}
              <div>
                <label htmlFor="guestTime" className="block text-[13px] font-medium text-[#77716A] mb-2">
                  Time
                </label>
                <input
                  id="guestTime"
                  name="time"
                  type="time"
                  required
                  className="w-full h-[38px] bg-[#F6F5F2] hover:bg-[#F0EEE9] focus:bg-white border border-transparent focus:border-[#D5CEC5] text-[#171513] text-[14px] px-4 outline-none transition-all placeholder:text-[#A09A93]"
                />
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="guestName" className="block text-[13px] font-medium text-[#77716A] mb-2">
                  Full Name
                </label>
                <input
                  id="guestName"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter Your Name"
                  className="w-full h-[38px] bg-[#F6F5F2] hover:bg-[#F0EEE9] focus:bg-white border border-transparent focus:border-[#D5CEC5] text-[#171513] text-[14px] px-4 outline-none transition-all placeholder:text-[#A09A93]"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="guestEmail" className="block text-[13px] font-medium text-[#77716A] mb-2">
                  Email
                </label>
                <input
                  id="guestEmail"
                  name="email"
                  type="email"
                  placeholder="jane@framer.com"
                  className="w-full h-[38px] bg-[#F6F5F2] hover:bg-[#F0EEE9] focus:bg-white border border-transparent focus:border-[#D5CEC5] text-[#171513] text-[14px] px-4 outline-none transition-all placeholder:text-[#A09A93]"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="guestPhone" className="block text-[13px] font-medium text-[#77716A] mb-2">
                  Phone
                </label>
                <input
                  id="guestPhone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="e.g. +919599280444"
                  pattern="^\+?\d+$"
                  title="Only numbers and an optional leading + are allowed"
                  onChange={handlePhoneChange}
                  className={`w-full h-[38px] bg-[#F6F5F2] hover:bg-[#F0EEE9] focus:bg-white border ${phoneError ? 'border-red-400' : 'border-transparent'} focus:border-[#D5CEC5] text-[#171513] text-[14px] px-4 outline-none transition-all placeholder:text-[#A09A93]`}
                />
                {phoneError && (
                  <p className="mt-1 text-[12px] text-red-500">{phoneError}</p>
                )}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="specialRequest" className="block text-[13px] font-medium text-[#77716A] mb-2">
                Special Requests
              </label>
              <textarea
                id="specialRequest"
                name="notes"
                rows={4}
                placeholder="Let us know about dietary preferences, celebrations, allergies, or any special requests."
                className="w-full bg-[#F6F5F2] hover:bg-[#F0EEE9] focus:bg-white border border-transparent focus:border-[#D5CEC5] text-[#171513] text-[14px] p-3 outline-none resize-y transition-all placeholder:text-[#A09A93] leading-relaxed"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[44px] bg-[#244E31] hover:bg-[#1C3E27] text-white px-6 text-[15px] font-medium tracking-wide transition-all duration-300 cursor-pointer shadow-sm hover:shadow flex items-center justify-center"
            >
              Submit
            </button>

            {reservationSent && (
              <p className="mt-3 text-left text-[13px] text-[#244E31] font-medium">
                Thank you! Your reservation request has been opened on WhatsApp.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
