import BulbIcon from "../../../../assets/icons/BulbIcon";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#1d4ed8", "#60a5fa", "#93c5fd", "#cbd5e1"];

const StockDistribution = ({ data }) => {
  return (
    <div className="w-full sm:max-w-[250px] min-h-[362px] flex flex-col justify-between items-center bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B]  rounded-[12px] p-[24px] gap-[24px]">
      <h2 className="text-left w-full text-[16px] text-[#0F172A] dark:text-[#F1F5F9] leading-[24px] font-bold">
        Categorías Populares
      </h2>
      <div className="relative w-[130px] h-[130px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data?.data}
              dataKey="value"
              innerRadius={45}
              outerRadius={65}
              cornerRadius="12px"
              paddingAngle={2}
              stroke="none"
              isAnimationActive={true}
            >
              {data?.data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-gray-800 dark:text-[#F1F5F9] ">
            {data?.data?.length > 0 ? "100%" : "0%"}
          </span>
          <span className="text-[10px] text-gray-400 dark:text-[#94A3B8] tracking-wide">
            TOTAL
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col justify-between gap-[4px] text-sm">
        {data?.data.map((item, i) => (
          <div
            key={i}
            className="w-full flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[i] }}
              />
              <span className="text-gray-600 dark:text-[#F1F5F9]">
                {item.name}
              </span>
            </div>

            <span className="text-gray-500 dark:text-[#94A3B8]">
              {item.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockDistribution;
