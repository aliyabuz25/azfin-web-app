
import React from 'react';
import { useData } from '../context/DataContext';

const FloatingContact: React.FC = () => {
  const { siteSettings: SETTINGS } = useData();
  const whatsappNumber = SETTINGS.whatsappNumber || "994502000000";
  const messengerUsername = SETTINGS.messengerUsername || "azfin";

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
        title="WhatsApp ilə əlaqə"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-xl animate-ping opacity-10 group-hover:hidden"></div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-full h-full p-2.5 object-contain relative z-10"
        />

        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          WhatsApp
        </span>
      </a>

      {/* Messenger Button */}
      <a
        href={`https://m.me/${messengerUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
        title="Messenger ilə əlaqə"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
          alt="Messenger"
          className="w-full h-full p-2.5 object-contain relative z-10"
        />

        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          Messenger
        </span>
      </a>
    </div>
  );
};

export default FloatingContact;
