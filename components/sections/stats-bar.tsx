const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function StatsBar() {
  return (
    <section className="bg-[#FF5722]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-10 px-6 text-center ${
                i < stats.length - 1 ? "border-r border-white/20" : ""
              }`}
            >
              <div className="text-4xl font-extrabold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
