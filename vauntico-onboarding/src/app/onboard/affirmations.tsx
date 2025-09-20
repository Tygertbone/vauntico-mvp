import React from "react";

const affirmations = [
  "You are entering a sacred space of creation.",
  "Your contribution is valued and impactful.",
  "Together, we manifest premium experiences.",
  "Alignment and intention guide every step.",
  "Welcome to the Vauntico mission—let's elevate!"
];

export default function Affirmations() {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % affirmations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="text-center text-lg italic text-neon-pink mb-4 min-h-[2.5rem] transition-all duration-500">
      {affirmations[index]}
    </div>
  );
}
