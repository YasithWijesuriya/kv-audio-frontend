import { FaMicrophone, FaHeadphones, FaMusic, FaUsers, FaAward, FaHandshake } from "react-icons/fa";

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">About KV Audio</h1>
                    <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                        We are passionate about delivering exceptional audio experiences through cutting-edge technology, 
                        expert craftsmanship, and unwavering commitment to quality.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Company Story */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-800 mb-6">Our Story</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Founded in 2010, KV Audio began as a small passion project by audio enthusiasts who believed 
                            that everyone deserves access to professional-quality sound equipment. What started in a garage 
                            has grown into a trusted name in the audio industry.
                        </p>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Over the years, we've expanded our offerings from basic audio equipment to comprehensive 
                            solutions for musicians, producers, podcasters, and audio professionals. Our commitment to 
                            innovation and customer satisfaction has remained constant throughout our journey.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Today, we're proud to serve thousands of customers worldwide, helping them achieve their 
                            audio dreams with our carefully curated selection of products and expert guidance.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                        <div className="text-center">
                            <FaMusic className="text-6xl mx-auto mb-6" />
                            <h3 className="text-2xl font-bold mb-4">13+ Years of Excellence</h3>
                            <p className="text-blue-100">
                                Serving the audio community with dedication and passion since 2010
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-6">
                            <FaMicrophone className="text-4xl text-blue-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-800">Our Mission</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            To democratize professional audio quality by providing accessible, reliable, and innovative 
                            audio solutions that empower creators to bring their vision to life without compromise.
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-6">
                            <FaHeadphones className="text-4xl text-purple-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-800">Our Vision</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            To be the leading destination for audio professionals and enthusiasts, known for our 
                            exceptional products, expert knowledge, and unwavering commitment to customer success.
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div className="mb-20">
                    <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaAward className="text-blue-600 text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Quality Excellence</h3>
                            <p className="text-slate-600">
                                We never compromise on quality. Every product we offer meets our rigorous standards 
                                for performance, durability, and reliability.
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaUsers className="text-green-600 text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Customer First</h3>
                            <p className="text-slate-600">
                                Our customers are at the heart of everything we do. We listen, learn, and adapt 
                                to provide the best possible experience.
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaHandshake className="text-purple-600 text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Integrity & Trust</h3>
                            <p className="text-slate-600">
                                We build lasting relationships through honest communication, transparent practices, 
                                and consistent delivery on our promises.
                            </p>
                        </div>
                    </div>
                </div>

                
                {/* Stats Section */}
                <div className="bg-white rounded-2xl shadow-xl p-12">
                    <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">By The Numbers</h2>
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                            <p className="text-slate-600">Happy Customers</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                            <p className="text-slate-600">Products Available</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-600 mb-2">13+</div>
                            <p className="text-slate-600">Years of Experience</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                            <p className="text-slate-600">Customer Support</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
