import LegalFooter from "../components/Footer";
import Header from "../components/Header";
import m1 from "../image/m1.jpg"
import m2 from "../image/m2.jpg";
import m3 from "../image/m3.jpg";
import w1 from "../image/w1.jpg";
import w2 from "../image/w2.jpg";
import w3 from "../image/w3.jpg";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const men = [m1, m2, m3]
  const women = [w1, w2, w3]
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="bg-white text-gray-900">
        {/* Top Announcement */}
        <div className="flex justify-center py-3">
          <div className="rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4 py-1 text-sm font-medium  text-white shadow">
            New ✨ Real-time collaboration let's connect together
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative mx-auto max-w-7xl px-6 py-16">
          {/* Floating Avatars */}
          <div className="absolute left-0 top-24 hidden lg:flex flex-col gap-3">
            {men.map((i) => (
              <img
                key={i}
                src={i}
                className="h-44 w-44 rounded-xl object-cover shadow"
              />
            ))}
          </div>

          <div className="text-center">
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
              Professional task management,
              <br />
              <span className="text-blue-600">
                built for real-time collaboration
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Create tasks, assign teammates, track progress, and get instant
              updates — all in one collaborative workspace.
            </p>

            <button
              onClick={() => navigate("/signup")}
              className="mt-8 rounded-lg bg-orange-500 px-8 py-3 text-lg font-semibold text-white hover:bg-orange-600 transition"
            >
              Get started free →
            </button>

            {/* Trust Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
              <span>⭐ Trusted by 10,000+ teams</span>
              <span>•</span>
              <span>Real-time updates</span>
              <span>•</span>
              <span>Secure authentication</span>
            </div>
          </div>

          {/* Right Avatars */}
          <div className="absolute right-0 top-20 hidden lg:flex flex-col gap-3">
            {women.map((i) => (
              <img
                key={i}
                src={i}
                className="h-44 w-44 rounded-xl object-cover shadow"
              />
            ))}
          </div>
        </section>

        {/* Steps Section */}
        <section className="bg-gray-50 py-10">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 rounded-xl bg-white px-6 py-8 shadow md:grid-cols-3">
            <Step
              title="Create tasks"
              description="Add tasks with priority, due dates, and descriptions."
            />
            <Step
              title="Collaborate live"
              description="Get instant updates when tasks are assigned or updated."
            />
            <Step
              title="Track progress"
              description="Monitor status, overdue tasks, and team workload."
            />
          </div>
        </section>

        {/* Features + Pricing */}
        <section className="bg-blue-50 py-16">
          <div className="mx-auto max-w-6xl grid grid-cols-1 gap-10 px-6 md:grid-cols-3">
            {/* Features */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">
                Everything your team needs
              </h2>

              <ul className="space-y-4 text-gray-700">
                <li>✔ Real-time task updates</li>
                <li>✔ Secure authentication with JWT</li>
                <li>✔ Task filtering & sorting</li>
                <li>✔ Responsive dashboard</li>
                <li>✔ In-app assignment notifications</li>
              </ul>
            </div>

            {/* Pricing Card */}
            <div className="rounded-xl bg-white p-8 shadow">
              <p className="text-sm text-gray-500">Team Plan</p>
              <h3 className="text-4xl font-extrabold my-2">$0</h3>
              <p className="text-gray-600">Free during beta</p>

              <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
                Start collaborating
              </button>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>✔ Unlimited tasks</li>
                <li>✔ Real-time updates</li>
                <li>✔ Team collaboration</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <LegalFooter />
    </>
  );
}

function Step({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
        ✓
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  );
}
