"use client";
import { useContext, createContext } from "react";

import { FiAirplay } from "react-icons/fi";
const RadioContext = createContext({});

function RadioGroup({ value, onChange, children }: any) {
  return (
    <RadioContext.Provider value={{ value, onChange }}>
      {children}
    </RadioContext.Provider>
  );
}

export default function PlanCards({
  onChangeValue,
  value,
}: {
  onChangeValue: (value: any) => void;
  value: any;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold tracking-tight">Choose Your Plan</h2>
      <hr className="my-3 w-56" />
      <RadioGroup
        value={value}
        onChange={(e: any) => onChangeValue(e.target.value)}
      >
        <div className="flex gap-4 justify-center flex-col">
          <RadioComponent value="basic">
            <Plan
              icon={<FiAirplay />}
              title="Basic"
              features={["HD (720p)", "1 Device"]}
              price={4.99}
            />
          </RadioComponent>
          <RadioComponent value="standard">
            <Plan
              icon={<FiAirplay />}
              title="Standard"
              features={["Full HD (1080p)", "2 Devices"]}
              price={9.99}
            />
          </RadioComponent>
          <RadioComponent value="premium">
            <Plan
              icon={<FiAirplay />}
              title="Premium"
              features={["Ultra HD (4K) + HDR", "4 Devices"]}
              price={14.99}
            />
          </RadioComponent>
        </div>
      </RadioGroup>
      <hr className="my-3 w-56" />
    </main>
  );
}

function Plan({ icon, title, features, price }: any) {
  return (
    <div className="flex gap-4 items-center">
      {icon}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{features.join(" · ")}</p>
      </div>
      <span className="ml-auto font-medium">${price}</span>
    </div>
  );
}

function RadioComponent({ children, ...props }: any) {
  const { value, onChange }: any = useContext(RadioContext);

  return (
    <label
      className={`
        px-6 py-4 shadow rounded-lg cursor-pointer
        transition-all ${
          value === props.value
            ? "bg-gradient-to-t from-violet-200 to-violet-100 text-violet-800 shadow-violet-500 scale-105"
            : "bg-white hover:shadow-md shadow-gray-300"
        }
    `}
    >
      <input
        type="radio"
        className="hidden"
        checked={value === props.value}
        onChange={onChange}
        {...props}
      />
      {children}
    </label>
  );
}
