const MainButton = ({
  children,
  icon,
  iconPosition = "left",
  className = "",
  ...rest
}) => {
  return (
    <button
      className={`
        flex items-center justify-center gap-2
        px-4 py-2.5
        rounded-xl
        font-medium
        text-sm sm:text-base
        transition-all duration-200
        hover:opacity-90
        active:scale-[0.98]
        cursor-pointer
        ${className}
      `}
      {...rest}
    >
      {icon && iconPosition === "left" && icon}

      <span>{children}</span>

      {icon && iconPosition === "right" && icon}
    </button>
  );
};

export default MainButton;