import Link from "next/link";
import Image from "next/image";

export default function ContributePage() {
  return (
    <main className="min-h-screen bg-[#fbf9f6] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-1000">
      <div className="mb-8">
        <Image src="/logo.png" alt="MentorMaze" width={200} height={200} className="h-14 w-auto object-contain mx-auto" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-serif text-[#1a1208] mb-6 leading-tight">
        Contribute to the Journey
      </h1>
      <p className="text-lg text-[#4a3f2f] max-w-2xl mb-12">
        Whether you have already navigated the placement process or are currently preparing for it, your input helps us build a better path for the next generation of engineers.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6">
        <Link 
          href="/survey/professional" 
          className="px-8 py-4 bg-[#1a1208] text-white rounded-full font-medium hover:bg-[#2a2218] transition-transform hover:scale-[1.02] shadow-xl shadow-black/5"
        >
          I am a Professional
        </Link>
        <Link 
          href="/survey/student" 
          className="px-8 py-4 bg-white text-[#1a1208] border border-black/10 rounded-full font-medium hover:bg-gray-50 transition-transform hover:scale-[1.02] shadow-sm"
        >
          I am a Student
        </Link>
      </div>
    </main>
  );
}
