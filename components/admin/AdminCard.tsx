type AdminCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AdminCard({ children, className = "" }: AdminCardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5 ${className}`}
    >
      {children}
    </div>
  );
}

