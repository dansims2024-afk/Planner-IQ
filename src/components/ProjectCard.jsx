// ... existing imports
export default function ProjectCard({ project }) {
  return (
    <Link href={`/project/${project.id}`}>
      <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all cursor-pointer h-full group">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-1">
            {/* NEW DIVISION TAG */}
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit">
              {project.division || "Executive"}
            </span>
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mt-2">
              {project.title}
            </h3>
          </div>
        </div>
        {/* ... existing progress bar and footer code */}
      </div>
    </Link>
  );
}
