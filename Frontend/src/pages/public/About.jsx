import { useNavigate } from "react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

function About() {
  const navigate = useNavigate();

  const values = [
    {
      icon: Target,
      title: "Clarity first",
      description:
        "See where your money goes with a simple view of your spending, budgets, and progress.",
    },
    {
      icon: ShieldCheck,
      title: "Private by design",
      description:
        "Your financial habits belong to you. XseTrack keeps the experience focused and secure.",
    },
    {
      icon: Sparkles,
      title: "Built for real life",
      description:
        "From everyday purchases to long-term goals, stay organized without adding more complexity.",
    },
  ];

  const benefits = [
    "Track expenses in one organized place",
    "Understand spending patterns at a glance",
    "Set budgets that support your goals",
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <section className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <p className="font-semibold uppercase tracking-[0.2em] text-myGreenMD">
              About XseTrack
            </p>
            <h1 className="font-poppins text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
              Make every financial decision{" "}
              <span className="bg-gradient-to-r from-myGreenMD to-myGreenSM bg-clip-text text-transparent">
                feel simpler.
              </span>
            </h1>
            <p className="max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg sm:leading-8">
              XseTrack helps you turn day-to-day spending into a clearer
              financial picture. We bring expense tracking, budgets, and
              meaningful insights together so you can move forward with
              confidence.
            </p>
            <button
              onClick={() => navigate("/authentication/register")}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-myGreenMD to-myGreenSM px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95 sm:w-auto sm:px-7"
            >
              Start tracking for free
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-myGreenSM/20 blur-3xl" />
            <div className="relative rounded-3xl border border-myGreenXS/70 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-8 lg:p-10">
              <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Your money, in view
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    Better habits
                  </p>
                </div>
                <div className="shrink-0 rounded-2xl bg-myGreenMD/10 p-3 text-myGreenMD">
                  <BarChart3 size={28} />
                </div>
              </div>
              <div className="space-y-4">
                {[
                  ["Track", "Know where it goes"],
                  ["Plan", "Spend with intention"],
                  ["Grow", "Reach your goals"],
                ].map(([label, description]) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3 sm:gap-4 sm:p-4 dark:bg-gray-800/70"
                  >
                    <CheckCircle2 className="shrink-0 text-myGreenMD" size={20} />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {label}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 sm:mt-24 lg:mt-28">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
              A calmer way to manage money
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              We believe personal finance tools should help you feel in
              control, not overwhelmed.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-6 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-myGreenMD/10 text-myGreenMD">
                  <Icon size={24} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid items-start gap-8 rounded-3xl bg-gradient-to-r from-myGreenMD to-myGreenSM p-6 text-white shadow-xl sm:mt-24 sm:gap-10 sm:p-8 md:grid-cols-[1fr_auto] lg:mt-28 lg:p-12">
          <div>
            <h2 className="font-poppins text-2xl font-bold sm:text-3xl">
              Small steps add up.
            </h2>
            <p className="mt-3 max-w-xl text-green-50">
              Start with a clearer view of today and build toward the financial
              future you want.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-green-50 sm:grid-cols-2 md:grid-cols-1">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 size={17} />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => navigate("/authentication/register")}
            className="w-full rounded-full bg-white px-7 py-3.5 font-semibold text-myGreenMD transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95 md:w-auto"
          >
            Create your account
          </button>
        </section>

        <footer className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 sm:mt-12 sm:pt-8 dark:border-gray-800 dark:text-gray-400">
          Built to help you spend smarter and plan with confidence.
        </footer>
      </div>
    </main>
  );
}

export default About;
