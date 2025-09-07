const ProfileHeader = ({ title, subtitle }) => {
  return (
    <div className="flex flex-row items-center gap-2 mb-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default ProfileHeader;
