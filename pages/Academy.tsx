
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import ApplicationModal from '../components/ApplicationModal';

const Academy: React.FC = () => {
  const { trainings: TRAININGS } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState('');
  const navigate = useNavigate();

  const handleApplyClick = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTraining(title);
    setIsModalOpen(true);
  };

  const handleCardClick = (id: string) => {
    navigate(`/academy/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trainingTitle={selectedTraining}
      />

      {/* Hero Header */}
      <div className="bg-slate-50 border-b border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6 text-accent font-black uppercase tracking-[0.4em] text-[10px]">
                <span className="w-8 h-[1px] bg-accent"></span>
                Azfin Akademiya
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight leading-tight uppercase italic">
                Peşəkar <span className="text-accent">Təlimlər</span>
              </h1>
            </div>
            <p className="text-slate-500 font-bold text-xs max-w-xs border-l-2 border-accent pl-6 pb-2 uppercase tracking-widest leading-relaxed">
              Maliyyə və vergi sahəsində karyeranızı beynəlxalq standartlarla inkişaf etdirin.
            </p>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TRAININGS.map((training) => (
              <div
                key={training.id}
                onClick={() => handleCardClick(training.id)}
                className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-slate-100 group flex flex-col transition-all duration-500 hover:shadow-[0_15px_40px_rgb(0,0,0,0.1)] cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={training.image}
                    alt={training.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {training.status === 'upcoming' && (
                    <div className="absolute top-3 right-3 bg-[#FBBF24] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      Aktivdir
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-black text-primary mb-4 group-hover:text-accent transition-colors leading-tight uppercase italic">
                    {training.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <div className="flex items-center gap-1.5 bg-[#EFF6FF] text-[#3B82F6] px-3 py-1.5 rounded-lg">
                      <Calendar className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-tight">{training.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#EFF6FF] text-[#3B82F6] px-3 py-1.5 rounded-lg">
                      <Clock className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-tight">{training.duration}</span>
                    </div>
                  </div>

                  <p className="text-slate-500 mb-8 flex-grow leading-relaxed font-medium text-xs line-clamp-3">
                    {training.description}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                    <div className="text-slate-400 font-bold text-[9px] uppercase tracking-widest">
                      <span className="text-primary">{training.level}</span>
                    </div>
                    <button
                      onClick={(e) => handleApplyClick(e, training.title)}
                      className="bg-primary text-white px-5 py-2.5 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-primary-medium transition-all shadow-md flex items-center gap-2"
                    >
                      Müraciət <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academy;
