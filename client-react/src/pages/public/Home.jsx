import React from 'react';
import Hero from '../../components/ui/Hero';
import TrustBar from '../../components/ui/TrustBar';
import MenuSection from '../../components/ui/MenuSection';
import GallerySection from '../../components/ui/GallerySection';
import AboutSection from '../../components/ui/AboutSection';

const Home = () => {
    return (
        <>
            <Hero />
            <TrustBar />
            <MenuSection />
            <GallerySection />
            <AboutSection />

            {/* Floating Action Buttons */}
            <a href="https://wa.me/919473996773" target="_blank" rel="noreferrer" className="fab fab-whatsapp" aria-label="WhatsApp Us">
                💬
            </a>
            <a href="tel:+919598181082" className="fab fab-call" aria-label="Call Us">
                📞
            </a>
        </>
    );
};

export default Home;
zz