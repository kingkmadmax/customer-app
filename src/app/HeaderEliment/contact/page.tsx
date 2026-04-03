"use client";

import { ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export default function ContactPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />

      {/* Top Bar */}
      <div className=" ">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Have a question? We'd love to hear from you.
          </p>

          {/* Contact Info */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="border  border-gray-500 rounded-lg p-6">
              <Mail className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-bold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Our support team is here to help
              </p>
              <a href="mailto:support@shopnow.com" className="text-primary hover:underline">
                support@shopnow.com
              </a>
            </div>

            <div className="border border-gray-500 rounded-lg p-6">
              <Phone className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-bold mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Mon-Fri from 8am to 6pm EST
              </p>
              <a href="tel:+1-555-123-4567" className="text-primary hover:underline">
                +1 (555) 123-4567
              </a>
            </div>

            <div className="border border-gray-500 rounded-lg p-6">
              <MapPin className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-bold mb-2">Visit Us</h3>
              <p className="text-sm text-muted-foreground">
                123 Commerce Street<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg"
                />
              </div>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help?"
                className="w-full px-4 py-2 border border-gray-500 rounded-lg"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell us more..."
                className="w-full px-4 py-2 border border-gray-500 rounded-lg resize-none"
              />

              <button
                type="submit"
                className="w-full h-12 bg-primary border border-gray-500 text-black py-3 rounded-lg hover:bg-blue-500 flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}