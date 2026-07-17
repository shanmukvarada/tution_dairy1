import React, { useState } from 'react';
import { Camera, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
      title: 'Interactive Math Worksheets Class',
      desc: 'Students collaborating on equation-solving challenges.'
    },
    {
      url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
      title: 'Chemistry Laboratory Demonstration',
      desc: 'Live observation of acid-base properties under supervision.'
    },
    {
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
      title: 'One-on-One Counseling & Doubt Clearing',
      desc: 'Tutor-guided correction of assignment worksheets.'
    },
    {
      url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
      title: 'Special Physics Revision Camp',
      desc: 'Weekend sessions focusing on electromagnetic board exams.'
    },
    {
      url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
      title: 'Reference Book Library & Study Space',
      desc: 'Spacious study corners open to active students daily.'
    },
    {
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
      title: 'Excellent Grades Celebrations',
      desc: 'Tutor Sarah rewarding board champions with study journals.'
    }
  ];

  const [lightboxImg, setLightboxImg] = useState<any | null>(null);

  return (
    <div className="bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">Our Campus Life</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Tuition Center Gallery</h1>
          <p className="text-slate-500 text-sm sm:text-base mt-4 leading-relaxed">
            Take a visual tour around our spacious tuition rooms, doubt-clearing centers, study desks, and student milestone events.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setLightboxImg(img)}
              className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-zoom-in"
            >
              <div className="relative h-60 bg-slate-100 overflow-hidden">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <div className="bg-white/90 p-2.5 rounded-full shadow">
                    <ZoomIn className="h-4.5 w-4.5 text-slate-900" />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-xs font-bold text-slate-900 truncate">{img.title}</h3>
                <p className="text-[10px] text-slate-500 mt-1 leading-normal">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImg && (
          <div 
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="relative max-h-[450px] overflow-hidden bg-slate-900">
                <img 
                  src={lightboxImg.url} 
                  alt={lightboxImg.title} 
                  className="w-full h-full object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{lightboxImg.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{lightboxImg.desc}</p>
                </div>
                <button 
                  onClick={() => setLightboxImg(null)} 
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4.5 py-2 rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
