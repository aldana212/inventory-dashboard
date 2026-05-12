import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MovementsChart = ({ data }) => {
  return (
    <div className="w-full h-[362px] flex flex-col gap-[32px] p-[24px] bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px]">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-[16px] text-[#0F172A] dark:text-[#F1F5F9] leading-[24px] ">
          Movimientos Semanales
        </h3>
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <div className="w-[12px] h-[12px] rounded-full bg-[#2563EB]" />
            <span className="text-[13px] text-[#64748B] dark:text-[#F1F5F9] leading-[18px] ">
              Entradas
            </span>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="w-[12px] h-[12px] rounded-full bg-[#CBD5E1]" />
            <span className="text-[13px] text-[#64748B] dark:text-[#F1F5F9] leading-[18px] ">
              Salidas
            </span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={256}>
        <BarChart data={data} width="100%" height="100%">
          <XAxis
            dataKey="dia"
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            width={20}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
            formatter={(value, name) => {
              if (name === "input") return [value, "Entradas"];
              if (name === "output") return [value, "Salidas"];
              return [value, name];
            }}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              fontSize: "12px",
            }}
          />
          <Bar
            dataKey="input"
            fill="#1d4ed8"
            radius={[6, 6, 0, 0]}
            activeBar={{ fill: "#1d4ed8", cursor: "pointer" }}
            isAnimationActive={true}
          />
          <Bar
            dataKey="output"
            fill="#cbd5e1"
            radius={[6, 6, 0, 0]}
            activeBar={{ fill: "#cbd5f5", cursor: "pointer" }}
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MovementsChart;
