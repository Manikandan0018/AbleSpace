export default function CollaborateTeam() {
  return (
    <section className="relative py-24 bg-[#0b0216] text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <p className="text-sm tracking-widest text-purple-400 uppercase mb-3">
            Collaborate like this team
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Built for high-performing teams
          </h2>

          <p className="text-gray-400 text-lg">
            Our platform empowers designers, developers, and managers to
            collaborate seamlessly — assign tasks, track progress, and deliver
            faster together.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Alex Morgan",
              role: "Product Manager",
            },
            {
              name: "Sara Patel",
              role: "UX Designer",
            },
            {
              name: "Daniel Kim",
              role: "Frontend Engineer",
            },
            {
              name: "Emily Chen",
              role: "Team Lead",
            },
          ].map((member, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:scale-[1.03] transition"
            >
              {/* Image Placeholder */}
              <div className="h-56 bg-gradient-to-br from-purple-500/40 to-pink-500/40 flex items-center justify-center">
                <span className="text-white/70 text-sm">Team Member</span>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm text-purple-300 mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
