import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-slate-800 mb-4">Get In Touch</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-semibold text-slate-800 mb-6">Contact Information</h2>
                            <p className="text-slate-600 mb-8">
                                Ready to start your audio journey? Reach out to us through any of these channels.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-600 p-3 rounded-lg">
                                    <FaPhone className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Phone</h3>
                                    <p className="text-slate-600">078-XXXXXXX</p>
                                    <p className="text-slate-600">070-XXXXXXXX</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-green-600 p-3 rounded-lg">
                                    <FaEnvelope className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Email</h3>
                                    <p className="text-slate-600">info@kvaudio.com</p>
                                    <p className="text-slate-600">support@kvaudio.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-purple-600 p-3 rounded-lg">
                                    <FaMapMarkerAlt className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Address</h3>
                                    <p className="text-slate-600">123 Audio Street</p>
                                    <p className="text-slate-600">Music City, MC 12345</p>
                                    <p className="text-slate-600">Sri Lanka</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-orange-600 p-3 rounded-lg">
                                    <FaClock className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Business Hours</h3>
                                    <p className="text-slate-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p className="text-slate-600">Saturday: 10:00 AM - 4:00 PM</p>
                                    <p className="text-slate-600">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <h3 className="font-semibold text-slate-800 mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition-colors">
                                    <FaFacebook className="text-white text-xl" />
                                </a>
                                <a href="#" className="bg-sky-500 p-3 rounded-lg hover:bg-sky-600 transition-colors">
                                    <FaTwitter className="text-white text-xl" />
                                </a>
                                <a href="#" className="bg-pink-600 p-3 rounded-lg hover:bg-pink-700 transition-colors">
                                    <FaInstagram className="text-white text-xl" />
                                </a>
                                <a href="#" className="bg-blue-700 p-3 rounded-lg hover:bg-blue-800 transition-colors">
                                    <FaLinkedin className="text-white text-xl" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-3xl font-semibold text-slate-800 mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="What is this about?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}