"use client";
import React, { useState, ChangeEvent } from 'react';
import { 
  Save, Send, Plus, Trash2, Image as ImageIcon, 
  X, CheckCircle2, Loader2, AlertCircle, Clock, Calendar
} from 'lucide-react';

// --- Types & Interfaces ---
interface Topic { id: string; title: string; }
interface Module { id: string; name: string; topics: Topic[]; }

interface CourseData {
  name: string;
  description: string;
  thumbnail: File | null;
  cover: File | null;
  modules: Module[];
  category: string;
  tags: string;
  price: number;
  discount: number;
  totalPrice: number;
  duration: number; // Added
  avgLectureTime: number; // Added
  status: 'draft' | 'published';
}

const EditCoursePage: React.FC = () => {
  // --- UI States ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Form State ---
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('Latest Launch');
  const [price, setPrice] = useState<number | string>(''); 
  const [discount, setDiscount] = useState<number>();
  const [duration, setDuration] = useState<number | string>(''); // New
  const [avgLectureTime, setAvgLectureTime] = useState<number | string>(''); // New
  
  const [files, setFiles] = useState<{ thumb: File | null; cover: File | null }>({ thumb: null, cover: null });
  const [previews, setPreviews] = useState<{ thumb: string | null; cover: string | null }>({ thumb: null, cover: null });

  const [modules, setModules] = useState<Module[]>([
    { id: crypto.randomUUID(), name: '', topics: [{ id: crypto.randomUUID(), title: '' }] }
  ]);

  // --- Calculations ---
  const numPrice = Number(price) || 0;
  const numDiscount = Number(discount)|| 0;
  const totalPrice = Math.max(0, numPrice - (numPrice * (numDiscount / 100)));

  // --- Logic Handlers ---
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, type: 'thumb' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({ ...prev, [type]: file }));
      setPreviews(prev => ({ ...prev, [type]: URL.createObjectURL(file) }));
      setError(null);
    }
  };

  const validateForm = () => {
    if (!courseName.trim()) return "Course Name is required.";
    if (!description.trim()) return "Course Description is required.";
    if (!category.trim()) return "Target Category is required.";
    if (!numPrice || numPrice <= 0) return "A valid Course Price is required.";
    if (!duration || Number(duration) <= 0) return "Course Duration is required.";
    if (!avgLectureTime || Number(avgLectureTime) <= 0) return "Average Lecture Timing is required.";
    if (!files.thumb || !files.cover) return "Both Thumbnail and Cover images are required.";
    
    const isCurriculumValid = modules.every(m => 
      m.name.trim() !== '' && m.topics.every(t => t.title.trim() !== '')
    );
    if (!isCurriculumValid) return "Please fill in all Module and Topic titles.";

    return null;
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/);
    const wordCount = value.trim() === "" ? 0 : words.length;
    if (wordCount <= 400 || value.length < description.length) {
      setDescription(value);
    }
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setError(null);
    setIsSubmitting(true);
    
    const finalData: CourseData = {
      name: courseName,
      description,
      thumbnail: files.thumb,
      cover: files.cover,
      modules,
      category,
      tags,
      price: numPrice,
      discount : numDiscount,
      totalPrice,
      duration: Number(duration),
      avgLectureTime: Number(avgLectureTime),
      status
    };

    console.log(`%c[SUBMITTING TO API - ${status.toUpperCase()}]`, 'color: #f0abfc; font-weight: bold; font-size: 12px;');
    console.log("Final Course Object:", finalData);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-fuchsia-100">
      
      {/* Toast Notifications */}
      {showSuccess && (
        <div className="fixed top-20 md:top-24 right-4 md:right-8 z-[100] bg-white border-l-4 border-green-500 shadow-2xl p-5 rounded-r-xl animate-in slide-in-from-right-full transition-all max-w-[90vw]">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full flex-shrink-0"><CheckCircle2 className="text-green-600 w-5 h-5" /></div>
            <div>
              <p className="font-bold text-slate-800 text-sm md:text-base">Course Submitted Successfully!</p>
              <p className="text-xs text-slate-500 font-medium">Data has been logged to the console.</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-20 md:top-24 right-4 md:right-8 z-[100] bg-red-50 border-l-4 border-red-500 shadow-xl p-4 rounded-r-lg animate-bounce max-w-[90vw]">
          <div className="flex items-center space-x-3">
            <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0" />
            <p className="font-bold text-red-800 text-xs md:text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* 1. TOP ACTION PANEL */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm">
        <nav className="flex items-center space-x-4 md:space-x-8 text-sm font-bold text-slate-400">
          {/* <button className="flex items-center hover:text-fuchsia-600 transition">Home</button>
          <button className="text-fuchsia-600 border-b-2 border-fuchsia-600 pb-1 whitespace-nowrap">Add Course</button>
          <button className="hover:text-fuchsia-600 transition hidden md:inline">Add Categories</button>
          <button className="hover:text-fuchsia-600 transition">Draft Course</button> */}
        </nav>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <button disabled={isSubmitting} onClick={() => handleSubmit('draft')} className="px-3 md:px-6 py-2 md:py-2.5 bg-slate-100 text-slate-700 rounded-xl flex items-center text-xs md:text-sm font-bold hover:bg-slate-200 transition disabled:opacity-50">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>} <span className="ml-1">Draft</span>
          </button>
          <button disabled={isSubmitting} onClick={() => handleSubmit('published')} className="px-3 md:px-6 py-2 md:py-2.5 bg-fuchsia-600 text-white rounded-xl flex items-center text-xs md:text-sm font-bold hover:bg-fuchsia-700 shadow-lg shadow-fuchsia-200 transition disabled:opacity-50">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4"/>} <span className="ml-1">Publish</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        
        {/* Left Section */}
        <div className="lg:col-span-8 space-y-8 md:space-y-10">
          <section className="space-y-6">
            <div className="relative group">
              <input 
                type="text" maxLength={150} placeholder="Course Name" 
                className={`text-xl md:text-2xl font-bold w-full border-b-2 outline-none text-black pb-3 bg-transparent transition-all ${!courseName && error ? 'border-red-400' : 'border-slate-200 focus:border-fuchsia-500'}`}
                value={courseName} onChange={(e) => setCourseName(e.target.value)}
              />
              <div className={`absolute right-0 -bottom-6 text-[10px] font-bold uppercase tracking-widest ${courseName.length >= 140 ? 'text-orange-500' : 'text-slate-400'}`}>
                {courseName.length} / 150 Characters
              </div>
            </div>
            <div className="relative group">
              <textarea 
                placeholder="Detailed Course Description..." 
                className={`w-full p-4 mt-5 md:p-5 bg-white border rounded-2xl h-44 focus:ring-4 text-black focus:ring-fuchsia-50 outline-none transition-all resize-none shadow-sm ${!description && error ? 'border-red-400' : 'border-slate-200 focus:border-fuchsia-400'}`}
                value={description} onChange={handleDescriptionChange}
              />
              <div className={`absolute right-4 bottom-4 text-[10px] font-black uppercase tracking-widest pointer-events-none transition-colors ${ (description.trim() === "" ? 0 : description.trim().split(/\s+/).length) >= 350 ? 'text-red-500' : 'text-slate-400' }`}>
                {description.trim() === "" ? 0 : description.trim().split(/\s+/).length} / 400 Words
              </div>
            </div>
          </section>

          {/* Media Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(['thumb', 'cover'] as const).map((type) => (
              <div key={type} className={`relative group border-2 border-dashed rounded-[1.5rem] md:rounded-[2rem] aspect-video bg-white overflow-hidden transition-all ${!previews[type] && error ? 'border-red-400 bg-red-50/10' : 'border-slate-200 hover:border-fuchsia-400'}`}>
                {previews[type] ? (
                  <>
                    <img src={previews[type]!} alt={type} className="w-full h-full object-cover" />
                    <button onClick={() => {setPreviews(p => ({...p, [type]: null})); setFiles(f => ({...f, [type]: null}));}}
                      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg"><X size={16}/></button>
                  </>
                ) : (
                  <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-slate-50 transition-colors p-4 text-center">
                    <ImageIcon className={`w-10 h-10 mb-3 ${!previews[type] && error ? 'text-red-300' : 'text-slate-300 group-hover:text-fuchsia-400'}`} />
                    <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Upload {type} <span className='text-red-500'>*</span></span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, type)} />
                  </label>
                )}
              </div>
            ))}
          </section>

          {/* Curriculum Section */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 gap-4">
              <h3 className="text-lg md:text-xl font-black text-slate-800 uppercase">Curriculum <span className='text-red-500'>*</span></h3>
              <button 
                onClick={() => setModules([...modules, { id: crypto.randomUUID(), name: '', topics: [{ id: crypto.randomUUID(), title: '' }] }])}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-fuchsia-600 transition-colors w-max"
              >
                + Add Module
              </button>
            </div>

            <div className="space-y-6 md:space-y-8">
              {modules.map((mod) => (
                <div key={mod.id} className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200 shadow-sm relative transition-all hover:shadow-md">
                  <div className="flex items-center justify-between mb-6">
                    <input 
                      type="text" placeholder="Module Name" 
                      className={`bg-transparent border-b-2 text-lg text-black font-bold outline-none pb-2 w-full mr-4 ${!mod.name && error ? 'border-red-300' : 'border-slate-300 focus:border-fuchsia-600'}`}
                      value={mod.name}
                      onChange={(e) => setModules(modules.map(m => m.id === mod.id ? { ...m, name: e.target.value } : m))}
                    />
                    <button onClick={() => setModules(modules.filter(m => m.id !== mod.id))} className="text-slate-300 hover:text-red-500 transition"><Trash2 size={20}/></button>
                  </div>
                  
                  <div className="space-y-4 ml-0 md:ml-6">
                    {mod.topics.map((topic, idx) => (
                      <div key={topic.id} className="flex items-center space-x-3 group">
                        <span className="text-[12px] font-bold text-slate-500 uppercase">{idx + 1}.</span>
                        <input 
                          type="text" placeholder="Topic Name" 
                          className={`flex-1 border rounded-xl px-4 text-black py-2 text-xs md:text-sm font-medium outline-none transition-all ${!topic.title && error ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-fuchsia-100'}`}
                          value={topic.title}
                          onChange={(e) => setModules(modules.map(m => m.id === mod.id ? { ...m, topics: m.topics.map(t => t.id === topic.id ? { ...t, title: e.target.value } : t) } : m))}
                        />
                        {mod.topics.length > 1 && (
                          <button onClick={() => setModules(modules.map(m => m.id === mod.id ? { ...m, topics: m.topics.filter(t => t.id !== topic.id) } : m))} className="text-slate-300 hover:text-red-500 transition-colors p-1"><X size={16} /></button>
                        )}
                      </div>
                    ))}
                    <button 
                      onClick={() => setModules(modules.map(m => m.id === mod.id ? { ...m, topics: [...m.topics, { id: crypto.randomUUID(), title: '' }] } : m))}
                      className="text-[10px] font-black text-fuchsia-600 hover:text-fuchsia-800 flex items-center uppercase tracking-widest pt-3 ml-6"
                    >
                      <Plus size={14} className="mr-1" /> Add Topic
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4">
          <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] space-y-8 lg:sticky lg:top-28 shadow-xl border border-slate-100">
            
            <div className="space-y-6">
              {/* Category */}
              <div>
                <label className="block text-[11px] font-black text-black mb-3 uppercase tracking-widest">Target Category <span className='text-red-500'>*</span></label>
                <input 
                  type="text" placeholder="e.g. Data Science" value={category} onChange={(e) => setCategory(e.target.value)}
                  className={`w-full p-4 border-slate-200 text-black border rounded-2xl text-sm font-bold focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all ${!category && error ? 'ring-2 ring-red-500' : ''}`}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-[11px] font-black text-black mb-3 uppercase tracking-widest">Tags</label>
                <input 
                  type="text" value={tags} onChange={(e) => setTags(e.target.value)}
                  className="w-full p-4 text-black border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-fuchsia-500 outline-none"
                />
              </div>

              {/* NEW: Duration & Avg Timing */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
                <div>
                  <label className="block text-[10px] font-black text-black mb-3 uppercase tracking-widest flex items-center">
                    <Calendar size={12} className="mr-1 text-fuchsia-600"/> Duration (Days) <span className='text-red-500 ml-1'>*</span>
                  </label>
                  <input 
                    type="number" placeholder="0" value={duration} onChange={(e) => setDuration(e.target.value)} min={0}
                    className={`w-full p-4 border-slate-200 text-black border rounded-2xl text-sm font-bold focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all ${!duration && error ? 'ring-2 ring-red-500' : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-black mb-3 uppercase tracking-widest flex items-center">
                    <Clock size={12} className="mr-1 text-fuchsia-600"/> Avg Lecture Timing (Mins) <span className='text-red-500 ml-1'>*</span>
                  </label>
                  <input 
                    type="number" placeholder="0" value={avgLectureTime} onChange={(e) => setAvgLectureTime(e.target.value)} min={0}
                    className={`w-full p-4 border-slate-200 text-black border rounded-2xl text-sm font-bold focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all ${!avgLectureTime && error ? 'ring-2 ring-red-500' : ''}`}
                  />
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-5 pt-8 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black text-black mb-2 uppercase tracking-widest">Base Price <span className='text-red-500'>*</span></label>
                  <input 
                    type="number" placeholder="0" className={`w-full p-3 text-black border border-slate-200 rounded-2xl font-black outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all ${(!numPrice || numPrice <= 0) && error ? 'ring-2 ring-red-500' : ''}`} 
                    value={price} onChange={(e) => setPrice(e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-black mb-2 uppercase tracking-widest">Discount %</label>
                  <input 
                    type="number" placeholder='0' className="w-full p-3 text-black border border-slate-200 rounded-2xl font-black outline-none focus:ring-2 focus:ring-fuchsia-500" 
                    value={discount ?? ""} max={100} onChange={(e) => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))} 
                  />
                </div>
              </div>

              <div className={`p-4 rounded-3xl flex flex-col items-center transition-colors shadow-lg ${(!numPrice || numPrice <= 0) && error ? 'bg-red-500/20 border border-red-500' : 'bg-fuchsia-600'}`}>
                <span className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Final Listing Price</span>
                <span className="text-3xl md:text-4xl font-black text-white">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-loose">
                Please verify all data.<br/>Fields marked with <span className='text-red-500'>*</span> are mandatory.
              </p>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default EditCoursePage;