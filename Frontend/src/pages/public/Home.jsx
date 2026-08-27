import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/user.api.js";
import Loading from "../../components/ui/loading.jsx";
import {
  FaChartLine,
  FaPiggyBank,
  FaWallet,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { MdTrendingUp, MdCategory } from "react-icons/md";
import { toast } from "react-toastify";
import FinanceVisual from "../../components/ui/FinanceVisual.jsx";

function Home() {
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getUser,
    retry: false,
  });

  if (data) {
    navigate("/dashboard");
    toast.success(`Welcome back, ${data?.user?.username}!`);
  }

  const features = [
    {
      icon: FaWallet,
      title: "Track Expenses",
      description:
        "Monitor all your expenses in one place with detailed categorization",
      color: "from-blue-500/10 to-blue-600/10",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      icon: FaChartLine,
      title: "Visual Analytics",
      description:
        "Beautiful charts and graphs to understand your spending patterns",
      color: "from-purple-500/10 to-purple-600/10",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
    },
    {
      icon: FaPiggyBank,
      title: "Budget Management",
      description:
        "Set budgets and get alerts when you're about to exceed limits",
      color: "from-green-500/10 to-green-600/10",
      borderColor: "border-green-200",
      iconColor: "text-myGreenMD",
    },
    {
      icon: MdCategory,
      title: "Smart Categories",
      description:
        "Organize expenses with customizable categories for better insights",
      color: "from-orange-500/10 to-orange-600/10",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600",
    },
    {
      icon: MdTrendingUp,
      title: "Financial Reports",
      description:
        "Generate comprehensive reports to analyze your financial health",
      color: "from-pink-500/10 to-pink-600/10",
      borderColor: "border-pink-200",
      iconColor: "text-pink-600",
    },
    {
      icon: FaCheckCircle,
      title: "Goal Tracking",
      description:
        "Set and track financial goals to achieve your savings objectives",
      color: "from-cyan-500/10 to-cyan-600/10",
      borderColor: "border-cyan-200",
      iconColor: "text-cyan-600",
    },
  ];

  const stats = [
    {
      label: "Active Users",
      value: "10K+",
      gradient: "from-myGreenMD to-myGreenSM",
    },
    {
      label: "Expenses Tracked",
      value: "500K+",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      label: "Money Saved",
      value: "$2M+",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  return isPending ? (
    <Loading />
  ) : (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-y-auto">
      {/* Main Content */}
      <div className="px-8 py-12">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white font-poppins leading-tight">
                  Take Control of Your{" "}
                  <span className="bg-gradient-to-r from-myGreenMD to-myGreenSM bg-clip-text text-transparent">
                    Finances
                  </span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Smart expense tracking and budget management to help you
                  achieve your financial goals
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => navigate("/authentication/register")}
                  className="px-8 py-3.5 bg-gradient-to-r from-myGreenMD to-myGreenSM text-white font-semibold rounded-full hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  Get Started
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate("/authentication/login")}
                  className="px-8 py-3.5 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:border-myGreenMD hover:text-myGreenM cursor-pointer hover:bg-myGreenMD/5 transition-all"
                >
                  Sign In
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-myGreenMD"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Free
                    </span>{" "}
                    to use
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-myGreenMD"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Secure
                    </span>{" "}
                    & Private
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-myGreenMD"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Always
                    </span>{" "}
                    Updated
                  </span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <FinanceVisual />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}
              >
                <p className="text-sm font-semibold opacity-90 mb-2">
                  {stat.label}
                </p>
                <p className="text-4xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white font-poppins">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Everything you need to manage your finances effectively
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${feature.color} dark:from-white/5 dark:to-white/5 border ${feature.borderColor} dark:border-gray-800 hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-white/60 dark:bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white dark:group-hover:bg-white/20 transition-colors ${feature.iconColor}`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Locked Features Notice */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-blue-50/50 to-blue-100/50 dark:from-blue-500/10 dark:to-blue-600/10 border border-blue-200/50 dark:border-blue-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Premium Features Unlocked After Sign Up
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All advanced features like detailed analytics, budget
                  management, and financial reports are available after you
                  create an account and log in.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-myGreenMD to-myGreenSM rounded-3xl p-12 text-center text-white shadow-xl">
            <h2 className="text-4xl font-bold mb-4 font-poppins">
              Ready to Manage Your Finances?
            </h2>
            <p className="text-green-100 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of users who are taking control of their financial
              future with XseTrack
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/authentication/register")}
                className="px-8 py-3.5 bg-white text-myGreenMD font-semibold rounded-full hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer
                "
              >
                Create Free Account
              </button>
              <button
                onClick={() => navigate("/authentication/login")}
                className="px-8 py-3.5 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all cursor-pointer
                "
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>
            © 2026 XseTrack. All rights reserved. | Secure • Private • Open
            Source
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
