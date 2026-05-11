export const A11yTile = ({ label, value, onClick, isActive, ariaLabel }) => {
  return (
    <button
      type="button"
      className={`a11y-tile ${isActive ? 'active' : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={ariaLabel || `${label}: ${value}`}
    >
      <span className="tile-label">{label}</span>
      <span className="tile-value">{value}</span>
    </button>
  );
};
