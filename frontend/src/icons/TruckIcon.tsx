function TruckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8 -translate-y-1.5"
    >
      {/* Speed lines - shifted right to be closer to the truck */}
      <line x1="8" y1="20" x2="24" y2="20" />
      <line x1="8" y1="26" x2="24" y2="26" />
      <line x1="8" y1="32" x2="20" y2="32" />

      {/* Truck body */}
      <rect x="24" y="18" width="20" height="20" rx="2" />
      
      {/* Truck cabin */}
      <path d="M44 22h8a4 4 0 0 1 3 1.3l7 7.4V38H44V22z" />

      {/* Wheels */}
      <circle cx="30" cy="44" r="4" />
      <circle cx="50" cy="44" r="4" />
    </svg>
  );
}

export default TruckIcon;
