'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { SocialLinks } from '../../components/social-links';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-[#1B4B33] mb-12">
          Contact Us
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Send Question</h2>
            <form className="space-y-4">
              <div>
                <Input placeholder="Your Name" required />
              </div>
              <div>
                <Input type="email" placeholder="Your Email" required />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message (optional)"
                  className="min-h-[150px]"
                />
              </div>
              <Button className="w-full bg-[#1B4B33] hover:bg-[#153D29]">
                Send Message
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#40B86D] mt-1" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">
                      235 Lakey Lane, Hall green, Birmingham, B28 8QT
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#40B86D] mt-1" />
                  <div>
                    <h3 className="font-medium">Phones</h3>
                    <p className="text-gray-600">0121 439 8320</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#40B86D] mt-1" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">info@buyfreshonline.co.uk</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#40B86D] mt-1" />
                  <div>
                    <h3 className="font-medium">Working Hours</h3>
                    <p className="text-gray-600">Mon-Sat: 08:00 - 18:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm p-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2431.5382624276893!2d-1.8340138233758924!3d52.4335092798029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870b9b1b7a6d121%3A0x7f2d2f2d2f2d2f2d!2s235%20Lakey%20Ln%2C%20Birmingham%20B28%208QT!5e0!3m2!1sen!2suk!4v1628597234567!5m2!1sen!2suk"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
