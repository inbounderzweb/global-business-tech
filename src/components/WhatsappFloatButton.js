// src/components/WhatsappFloatButton.js
"use client";

import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "918904341299";

export default function WhatsappFloatButton() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) return null;

    return (
        <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-black/20 flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300"
        >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
            <svg
                viewBox="0 0 32 32"
                width="30"
                height="30"
                className="relative"
                fill="white"
            >
                <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.657 4.523 1.797 6.383L4 29l7.822-1.77A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75a9.7 9.7 0 0 1-4.95-1.354l-.355-.21-4.64 1.05 1.08-4.523-.232-.37A9.71 9.71 0 0 1 5.25 15c0-5.93 4.822-10.75 10.754-10.75S26.75 9.07 26.75 15 21.936 24.75 16.004 24.75Zm5.42-7.31c-.297-.15-1.756-.867-2.028-.965-.272-.098-.47-.148-.668.148-.198.297-.767.965-.94 1.164-.173.198-.347.223-.644.074-.297-.148-1.254-.462-2.39-1.474-.883-.788-1.48-1.762-1.653-2.06-.173-.297-.019-.457.13-.605.134-.133.297-.347.446-.52.148-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.149-.668-1.61-.916-2.204-.24-.578-.485-.5-.668-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.48 0 1.462 1.065 2.874 1.213 3.073.148.198 2.096 3.2 5.078 4.488.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.756-.718 2.004-1.412.247-.694.247-1.288.173-1.412-.074-.124-.272-.198-.57-.347Z" />
            </svg>
        </a>
    );
}
