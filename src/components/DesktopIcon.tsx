type DesktopIconProps = {
  label: string;
  iconSrc: string;
  onDoubleClick?: () => void;
};

export default function DesktopIcon({
  label,
  iconSrc,
  onDoubleClick,
}: DesktopIconProps) {
  return (
    <button className="desktop-icon" onDoubleClick={onDoubleClick}>
      <img
        className="desktop-icon-image"
        src={iconSrc}
        alt={label}
        draggable={false}
      />

      <span className="icon-label">{label}</span>
    </button>
  );
}