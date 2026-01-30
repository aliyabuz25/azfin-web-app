
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Calendar, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const { blogs: BLOG_POSTS, siteSettings: SETTINGS } = useData();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6 text-accent font-black uppercase tracking-[0.4em] text-[10px]">
                <span className="w-8 h-[1px] bg-accent"></span>
                Azfin Journal
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-brand tracking-tight leading-tight uppercase italic">
                {SETTINGS.uiBlogHeader1} <span className="text-accent">{SETTINGS.uiBlogHeader2}</span>
              </h1>
            </div>
            <p className="text-slate-500 font-bold text-xs max-w-xs border-l-2 border-accent pl-6 pb-2 uppercase tracking-widest leading-relaxed">
              {SETTINGS.uiBlogSub}
            </p>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Blog Grid */}
            <div className="lg:col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg overflow-hidden border border-slate-100 group hover:shadow-xl transition-all duration-500">
                    <div className="relative h-56 overflow-hidden bg-slate-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent text-white px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest shadow-lg">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4 text-slate-400 font-bold text-[9px] uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-accent" /> {post.date}
                        </div>
                      </div>
                      <h2 className="text-xl font-black text-brand mb-4 leading-tight group-hover:text-accent transition-colors italic uppercase tracking-tight">
                        {post.title}
                      </h2>
                      <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-2 font-medium">
                        {post.excerpt}
                      </p>
                      <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-brand font-black text-[10px] uppercase tracking-widest group-hover:text-accent transition-colors">
                        {SETTINGS.uiReadMore} <ArrowRight className="h-3 w-3 text-accent" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
