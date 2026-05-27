import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="p-2 border border-slate-200 rounded-lg bg-white disabled:opacity-40 hover:bg-slate-50"
      >
        <ChevronLeft size={18} />
      </button>

      <span className="text-sm text-slate-600 px-4">
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 border border-slate-200 rounded-lg bg-white disabled:opacity-40 hover:bg-slate-50"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
