const InfoField = ({ label, value, capitalize = false }) => {
  const displayValue = value ?? <span className="text-slate-400">-</span>;
  const className = capitalize ? 'capitalize' : '';

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`text-sm text-foreground ${className}`}>{displayValue}</p>
    </div>
  );
};

export default InfoField;
