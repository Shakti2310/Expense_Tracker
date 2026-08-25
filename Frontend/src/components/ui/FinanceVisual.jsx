import { useLayoutEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Home,
  DollarSign,
  ChevronDown,
} from "lucide-react";

/* ============================================================
   FinanceVisual
   ------------------------------------------------------------
   Same composition, dimensions, colors, spacing, animation,
   and responsive scaling as the original version.

   Static element styling is Tailwind-based. Runtime-generated
   values (canvas coordinates, scale, and chart geometry) remain
   dynamic where Tailwind cannot represent the value directly.
   ============================================================ */

const CANVAS_W = 1100;
const CANVAS_H = 950;

const LAYOUT = {
  revenue: {
    left: 120,
    top: 65,
    width: 375,
    height: 205,
    z: 20,
    className: "left-[120px] top-[65px] w-[375px] h-[205px] z-[20]",
  },
  transactions: {
    left: 688,
    top: 55,
    width: 372,
    height: 234,
    z: 30,
    className: "left-[688px] top-[55px] w-[372px] h-[234px] z-[30]",
  },
  analytics: {
    left: 534,
    top: 168,
    width: 520,
    height: 332,
    z: 10,
    className: "left-[534px] top-[168px] w-[520px] h-[332px] z-[10]",
  },
  expenses: {
    left: 250,
    top: 450,
    width: 415,
    height: 207,
    z: 15,
    className: "left-[250px] top-[450px] w-[415px] h-[207px] z-[15]",
  },
  breakdown: {
    left: 706,
    top: 543,
    width: 333,
    height: 308,
    z: 30,
    className: "left-[706px] top-[543px] w-[333px] h-[308px] z-[30]",
  },
  visa: {
    left: 58,
    top: 620,
    width: 318,
    height: 198,
    z: 25,
    className: "left-[58px] top-[620px] w-[318px] h-[198px] z-[25]",
  },
  savings: {
    left: 497,
    top: 695,
    width: 227,
    height: 197,
    z: 10,
    className: "left-[497px] top-[695px] w-[227px] h-[197px] z-[10]",
  },
};

/*
 * These keyframes are intentionally kept local because Tailwind
 * utility classes consume keyframes; removing them would change
 * the existing animation timing/feel.
 */
const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  .fv-root, .fv-root * {
    font-family: 'Poppins', ui-sans-serif, system-ui, -apple-system, sans-serif;
    box-sizing: border-box;
  }

  @keyframes fv-fadeUp {
    from { opacity: 0; transform: translateY(26px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fv-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-9px); }
  }

  @keyframes fv-floatSmall {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-6px) rotate(8deg); }
  }

  @keyframes fv-drawLine {
    to { stroke-dashoffset: 0; }
  }

  @keyframes fv-glow {
    0%, 100% { opacity: 0.32; }
    50% { opacity: 0.58; }
  }

  @keyframes fv-wedgeIn {
    from { opacity: 0; transform: scale(0.85); }
    to { opacity: 1; transform: scale(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    .fv-root * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition: none !important;
    }
  }
`;

const CARD_ANIMATIONS = {
  revenue:
    "animate-[fv-fadeUp_.8s_cubic-bezier(.22,1,.36,1)_0ms_both,fv-float_6.5s_ease-in-out_800ms_infinite]",
  transactions:
    "animate-[fv-fadeUp_.8s_cubic-bezier(.22,1,.36,1)_80ms_both,fv-float_7s_ease-in-out_880ms_infinite]",
  analytics:
    "animate-[fv-fadeUp_.8s_cubic-bezier(.22,1,.36,1)_160ms_both,fv-float_7.5s_ease-in-out_960ms_infinite]",
  expenses:
    "animate-[fv-fadeUp_.8s_cubic-bezier(.22,1,.36,1)_240ms_both,fv-float_6s_ease-in-out_1040ms_infinite]",
  breakdown:
    "animate-[fv-fadeUp_.8s_cubic-bezier(.22,1,.36,1)_320ms_both,fv-float_6.8s_ease-in-out_1120ms_infinite]",
  visa: "animate-[fv-fadeUp_.8s_cubic-bezier(.22,1,.36,1)_400ms_both,fv-float_7s_ease-in-out_1200ms_infinite]",
  savings:
    "animate-[fv-fadeUp_.8s_cubic-bezier(.22,1,.36,1)_480ms_both,fv-float_6.4s_ease-in-out_1280ms_infinite]",
};

const TrendGlyph = ({ variant = "cross", size = 38, className = "" }) => {
  const sizeConfig = {
    34: {
      wrapper: "w-[57.8px] h-[57.8px]",
      parallelTop: "top-[25.5px]",
      parallelLeft: "left-[14.28px]",
      parallelInnerTop: "top-[5.44px]",
      crossBottom: "bottom-[10.88px]",
      crossTop: "top-[10.88px]",
    },
    36: {
      wrapper: "w-[61.2px] h-[61.2px]",
      parallelTop: "top-[27px]",
      parallelLeft: "left-[15.12px]",
      parallelInnerTop: "top-[5.76px]",
      crossBottom: "bottom-[11.52px]",
      crossTop: "top-[11.52px]",
    },
    38: {
      wrapper: "w-[64.6px] h-[64.6px]",
      parallelTop: "top-[28.5px]",
      parallelLeft: "left-[15.96px]",
      parallelInnerTop: "top-[6.08px]",
      crossBottom: "bottom-[12.16px]",
      crossTop: "top-[12.16px]",
    },
  };

  const config = sizeConfig[size] ?? sizeConfig[38];

  if (variant === "parallel") {
    return (
      <div className={`absolute ${config.wrapper} ${className}`}>
        <ArrowUpRight
          size={size}
          strokeWidth={2.5}
          className={`absolute left-[6px] ${config.parallelTop} rotate-180 text-[#0c2118]`}
        />
        <ArrowUpRight
          size={size}
          strokeWidth={2.5}
          className={`absolute ${config.parallelLeft} ${config.parallelInnerTop} text-white`}
        />
      </div>
    );
  }

  return (
    <div className={`absolute ${config.wrapper} ${className}`}>
      <ArrowUpRight
        size={size}
        strokeWidth={2.5}
        className={`absolute left-0 ${config.crossBottom} text-white`}
      />
      <ArrowDownRight
        size={size}
        strokeWidth={2.5}
        className={`absolute right-0 ${config.crossTop} text-[#0c2118]`}
      />
    </div>
  );
};

const FloatCard = ({
  box,
  animationClassName,
  className = "",
  innerClassName = "",
  children,
}) => (
  <div
    className={`absolute transition-transform duration-500 ease-out hover:-translate-y-1 ${box.className}`}
  >
    <div
      className={`${className} ${innerClassName} h-full w-full ${animationClassName} will-change-transform`}
    >
      {children}
    </div>
  </div>
);

/* ---------- Analytics: line chart ---------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr"];
const Y_TICKS = ["10K", "7K", "4K", "2K", "0"];

const LineChart = () => {
  const xs = [12, 158, 304, 450];
  const revenueY = [112, 48, 133, 34];
  const expenseY = [134, 127, 54, 90];
  const dashLen = 700;

  const smoothPath = (ys) => {
    let d = `M${xs[0]},${ys[0]}`;
    for (let i = 0; i < xs.length - 1; i++) {
      const midX = (xs[i] + xs[i + 1]) / 2;
      d += ` C${midX},${ys[i]} ${midX},${ys[i + 1]} ${xs[i + 1]},${ys[i + 1]}`;
    }
    return d;
  };

  return (
    <svg
      viewBox="-44 -16 516 234"
      width="100%"
      height="100%"
      className="block overflow-visible"
    >
      {Y_TICKS.map((t, i) => {
        const y = (180 / (Y_TICKS.length - 1)) * i;

        return (
          <g key={t}>
            <line
              x1={0}
              y1={y}
              x2={462}
              y2={y}
              className="stroke-[#eef1ee]"
              strokeWidth={1}
            />
            <text
              x={-14}
              y={y + 4}
              fontSize={12}
              className="fill-[#9aa39d]"
              textAnchor="end"
            >
              {t}
            </text>
          </g>
        );
      })}

      {xs.map((x, i) => (
        <line
          key={i}
          x1={x}
          y1={0}
          x2={x}
          y2={180}
          className="stroke-[#f2f4f1]"
          strokeWidth={1}
        />
      ))}

      <path
        d={smoothPath(expenseY)}
        fill="none"
        className="stroke-[#1b4332] animate-[fv-drawLine_1.7s_ease-out_.7s_forwards]"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={dashLen}
        strokeDashoffset={dashLen}
      />

      <path
        d={smoothPath(revenueY)}
        fill="none"
        className="stroke-[#74c69d] animate-[fv-drawLine_1.7s_ease-out_.7s_forwards]"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={dashLen}
        strokeDashoffset={dashLen}
      />

      {MONTHS.map((m, i) => (
        <text
          key={m}
          x={xs[i]}
          y={206}
          fontSize={13}
          className="fill-[#9aa39d]"
          textAnchor="middle"
        >
          {m}
        </text>
      ))}
    </svg>
  );
};

const LegendDot = ({ colorClassName, label }) => (
  <div className="flex items-center gap-[6px] text-[14px] text-[#4b5049]">
    <span
      className={`inline-block h-[8px] w-[8px] rounded-full ${colorClassName}`}
    />
    {label}
  </div>
);

/* ---------- Expense Breakdown: donut chart ---------- */

const EXPENSE_DATA = [
  {
    label: "Other",
    value: 8,
    colorClassName: "fill-[#cdeed8]",
    animationClassName: "animate-[fv-wedgeIn_.5s_ease-out_300ms_both]",
  },
  {
    label: "Housing",
    value: 35,
    colorClassName: "fill-[#1b4332]",
    animationClassName: "animate-[fv-wedgeIn_.5s_ease-out_370ms_both]",
  },
  {
    label: "Groceries",
    value: 20,
    colorClassName: "fill-[#2d6a4f]",
    animationClassName: "animate-[fv-wedgeIn_.5s_ease-out_440ms_both]",
  },
  {
    label: "Utilities",
    value: 15,
    colorClassName: "fill-[#3f9169]",
    animationClassName: "animate-[fv-wedgeIn_.5s_ease-out_510ms_both]",
  },
  {
    label: "Dining",
    value: 12,
    colorClassName: "fill-[#5cb989]",
    animationClassName: "animate-[fv-wedgeIn_.5s_ease-out_580ms_both]",
  },
  {
    label: "Entertainment",
    value: 10,
    colorClassName: "fill-[#95d6ae]",
    animationClassName: "animate-[fv-wedgeIn_.5s_ease-out_650ms_both]",
  },
];

function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx, cy, rOuter, rInner, a0, a1) {
  const large = a1 - a0 > 180 ? 1 : 0;
  const p0 = polar(cx, cy, rOuter, a1);
  const p1 = polar(cx, cy, rOuter, a0);
  const p2 = polar(cx, cy, rInner, a0);
  const p3 = polar(cx, cy, rInner, a1);

  return `M${p0.x},${p0.y} A${rOuter},${rOuter} 0 ${large} 0 ${p1.x},${p1.y} L${p2.x},${p2.y} A${rInner},${rInner} 0 ${large} 1 ${p3.x},${p3.y} Z`;
}

const DonutChart = () => {
  const cx = 138;
  const cy = 142;
  const rOuter = 88;
  const rInner = 56;

  let cursor = 0;

  const segments = EXPENSE_DATA.map((d) => {
    const a0 = cursor * 3.6;
    cursor += d.value;
    const a1 = cursor * 3.6;

    return { ...d, a0, a1, mid: (a0 + a1) / 2 };
  });

  return (
    <svg
      viewBox="0 0 280 300"
      width="100%"
      height="100%"
      className="block overflow-visible"
    >
      {segments.map((s) => (
        <path
          key={s.label}
          d={arcPath(cx, cy, rOuter, rInner, s.a0, s.a1)}
          className={`${s.colorClassName} ${s.animationClassName} origin-[138px_142px] stroke-white`}
          strokeWidth={2}
        />
      ))}

      {segments.map((s) => {
        const labelPt = polar(cx, cy, rOuter + 34, s.mid);
        const l1 = polar(cx, cy, rOuter + 6, s.mid);
        const l2 = polar(cx, cy, rOuter + 24, s.mid);
        const anchor =
          labelPt.x > cx + 4 ? "start" : labelPt.x < cx - 4 ? "end" : "middle";

        return (
          <g key={`${s.label}-label`}>
            <line
              x1={l1.x}
              y1={l1.y}
              x2={l2.x}
              y2={l2.y}
              className="stroke-[#bcc2bc]"
              strokeWidth={1}
            />
            <text
              x={labelPt.x}
              y={labelPt.y}
              fontSize={11}
              className="fill-[#42463f]"
              textAnchor={anchor}
              dominantBaseline="middle"
            >
              {s.label}: {s.value}%
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ---------- Latest Transactions rows ---------- */

const TransactionRow = ({
  icon,
  iconBgClassName,
  title,
  sub = "Successfully",
  amount,
  amountClassName,
}) => (
  <div className="flex items-center gap-[14px]">
    <div
      className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[14px] ${iconBgClassName}`}
    >
      {icon}
    </div>

    <div className="min-w-0 flex-1">
      <p className="m-0 text-[16px] font-semibold text-white">{title}</p>
      <p className="m-0 mt-[2px] text-[13px] text-[#8fa79c]">{sub}</p>
    </div>

    <span
      className={`whitespace-nowrap text-[16px] font-semibold ${amountClassName}`}
    >
      {amount}
    </span>
  </div>
);

/* ---------- Visa card helper ---------- */

const DotGroup = () => (
  <span className="inline-flex gap-[6px]">
    {[0, 1, 2, 3].map((i) => (
      <span
        key={i}
        className="inline-block h-[6px] w-[6px] rounded-full bg-current"
      />
    ))}
  </span>
);

/* ============================================================
   Main component
   ============================================================ */

const FinanceVisual = () => {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    const update = () => {
      if (el.offsetWidth > 0) {
        setScale(el.offsetWidth / CANVAS_W);
      }
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="fv-root relative mx-auto w-full select-none overflow-hidden max-w-[720px] aspect-[1100/950]"
    >
      <style>{GLOBAL_STYLE}</style>

      <div
        className="absolute left-0 top-0 rounded-[28px]"
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* Total Revenue */}
        <FloatCard
          box={LAYOUT.revenue}
          animationClassName={CARD_ANIMATIONS.revenue}
          className="shadow-2xl"
          innerClassName="relative rounded-[28px] bg-gradient-to-br from-[#c3ecce] from-0% to-[#a9dcb8] to-100% px-[34px] py-[30px]"
        >
          <p className="m-0 text-[17px] font-medium text-[#1c3d26] opacity-[0.85]">
            Total Revenue
          </p>

          <div className="mt-[16px] flex items-end gap-[12px]">
            <span className="text-[40px] font-bold tracking-[-0.5px] text-[#122a1a]">
              $ 10,500.00
            </span>

            <span className="mb-[4px] text-[20px] font-semibold text-[#2f5c3d]">
              +42%
            </span>
          </div>

          <p className="mt-[16px] text-[15px] text-[#1c3d26] opacity-70">
            This month
          </p>

          <TrendGlyph
            variant="cross"
            size={36}
            className="right-[-6px] top-[34%]"
          />
        </FloatCard>

        {/* Latest Transactions */}
        <FloatCard
          box={LAYOUT.transactions}
          animationClassName={CARD_ANIMATIONS.transactions}
          innerClassName="flex flex-col"
        >
          <p className="m-0 mb-[14px] text-[25px] font-bold text-white">
            Latest Transactions
          </p>

          <div className="flex flex-1 flex-col rounded-[26px] bg-[#172428] px-[26px] py-[22px] shadow-2xl">
            <TransactionRow
              icon={<DollarSign size={20} color="#123524" strokeWidth={2.5} />}
              iconBgClassName="bg-[#b8e6c8]"
              title="Income: Q1 Bonus"
              amount="+ $2,500"
              amountClassName="text-[#8fd9a8]"
            />

            <div className="my-[18px] h-px bg-[rgba(255,255,255,0.14)]" />

            <TransactionRow
              icon={<Home size={20} color="#eaf6ef" strokeWidth={2.5} />}
              iconBgClassName="bg-[#3e7a5c]"
              title="Rent Payment"
              amount="− $1,200"
              amountClassName="text-[#9db8ab]"
            />

            <div className="mt-[18px] h-px bg-[rgba(255,255,255,0.14)]" />
          </div>
        </FloatCard>

        {/* Analytics */}
        <FloatCard
          box={LAYOUT.analytics}
          animationClassName={CARD_ANIMATIONS.analytics}
          className="shadow-2xl"
          innerClassName="flex flex-col rounded-[28px] bg-white px-[34px] py-[30px]"
        >
          <div className="flex flex-wrap items-start justify-between gap-[12px]">
            <div>
              <p className="m-0 text-[22px] font-bold text-[#161616]">
                Analytics
              </p>

              <p className="m-0 mt-[4px] text-[15px] text-[#8a8f8c]">
                Monthly Trend
              </p>
            </div>

            <div className="flex items-center gap-[18px]">
              <LegendDot colorClassName="bg-[#74c69d]" label="Revenue" />
              <LegendDot colorClassName="bg-[#1b4332]" label="Expenses" />

              <div className="flex items-center gap-[4px] text-[14px] text-[#7c827f]">
                Month <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="mt-[22px] min-h-0 flex-1">
            <LineChart />
          </div>
        </FloatCard>

        {/* Total Expenses */}
        <FloatCard
          box={LAYOUT.expenses}
          animationClassName={CARD_ANIMATIONS.expenses}
          className="shadow-2xl"
          innerClassName="relative rounded-[28px] bg-gradient-to-br from-[#1f5c3b] from-0% to-[#163f29] to-100% px-[34px] py-[30px]"
        >
          <p className="m-0 text-[17px] font-medium text-[#eaf3ee] opacity-[0.85]">
            Total Expenses
          </p>

          <div className="mt-[16px] flex items-end gap-[12px]">
            <span className="text-[40px] font-bold tracking-[-0.5px] text-white">
              $ 2,100.00
            </span>

            <span className="mb-[4px] text-[20px] font-semibold text-[#bcd9c8]">
              -8%
            </span>
          </div>

          <p className="mt-[16px] text-[15px] text-[#eaf3ee] opacity-70">
            This month
          </p>

          <TrendGlyph
            variant="cross"
            size={36}
            className="right-[-6px] top-[30%]"
          />
        </FloatCard>

        {/* Expense Breakdown */}
        <FloatCard
          box={LAYOUT.breakdown}
          animationClassName={CARD_ANIMATIONS.breakdown}
          className="shadow-2xl"
          innerClassName="flex flex-col rounded-[28px] bg-white px-[26px] py-[28px]"
        >
          <p className="m-0 mb-[4px] text-[21px] font-bold text-[#161616]">
            Expense Breakdown
          </p>

          <div className="min-h-0 flex-1">
            <DonutChart />
          </div>
        </FloatCard>

        {/* Visa card */}
        <FloatCard
          box={LAYOUT.visa}
          animationClassName={CARD_ANIMATIONS.visa}
          className="shadow-2xl"
          innerClassName="flex flex-col justify-between rounded-[24px] border border-[rgba(255,255,255,0.28)] bg-gradient-to-br from-[#8aab9a] from-0% to-[#6f8a7c] to-100% px-[28px] py-[24px]"
        >
          <span className="text-[22px] font-bold italic tracking-[1px] text-[#153029]">
            VISA
          </span>

          <div className="flex items-center gap-[10px] text-[22px] font-medium tracking-[3px] text-[#153029]">
            <DotGroup />
            <DotGroup />
            <DotGroup />
            <span>7602</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="m-0 text-[11px] uppercase tracking-[1px] text-[#3c5850]">
                Cardholder Name
              </p>
              <p className="m-0 mt-[3px] text-[15px] font-semibold text-[#16302a]">
                Emely Watson
              </p>
            </div>

            <div className="text-right">
              <p className="m-0 text-[11px] uppercase tracking-[1px] text-[#3c5850]">
                Expiry
              </p>
              <p className="m-0 mt-[3px] text-[15px] font-semibold text-[#16302a]">
                06/12/2023
              </p>
            </div>
          </div>
        </FloatCard>

        {/* Savings */}
        <FloatCard
          box={LAYOUT.savings}
          animationClassName={CARD_ANIMATIONS.savings}
          className="relative shadow-2xl"
          innerClassName="relative rounded-[24px] bg-gradient-to-br from-[#3e8a58] from-0% to-[#2e6b44] to-100% px-[28px] py-[26px]"
        >
          <p className="m-0 text-[20px] font-semibold text-white">Savings</p>

          <TrendGlyph
            variant="parallel"
            size={34}
            className="bottom-[26px] left-[30px]"
          />
        </FloatCard>
      </div>
    </div>
  );
};

export default FinanceVisual;
