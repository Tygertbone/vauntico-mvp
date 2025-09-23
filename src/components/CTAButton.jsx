export default function CTAButton({ text }) {
  return (
    <button className="bg-vauntico-gold text-black px-4 py-2 rounded hover:bg-yellow-400 transition">
      {text}
    </button>
  );
}