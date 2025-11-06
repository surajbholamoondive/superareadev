import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./index.module.css";

const MDButton = ({
  text = "Button",
  isDisabled = false,
  onClick,
  isPostIcon,
  icon,
  inlineCSS,
  iconCSS,
}) => {
  const defaultInlineStyle = {
    hover: false,
    gap: "10px",
    ...inlineCSS,
  };

  function increaseOpacity(rgba, increment) {
    const rgbaValues = rgba?.match(
      /rgba?\((\d+), (\d+), (\d+),? ?(\d*(?:\.\d+)?)?\)/
    );
    if (!rgbaValues) {
      return rgba;
    }
    const [r, g, b, a = 1] = rgbaValues.slice(1).map(Number);
    const newAlpha = Math.min(a + increment, 1);
    return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
  }

  function calculateIncrementToFullOpacity(rgba) {
    const rgbaValues = rgba?.match(
      /rgba?\((\d+), (\d+), (\d+),? ?(\d*(?:\.\d+)?)?\)/
    );
    if (!rgbaValues) {
      return 0;
    }
    const a = parseFloat(rgbaValues[4] || 1);
    return 1 - a;
  }

  const initialBg = inlineCSS?.backgroundColor;
  const increment = calculateIncrementToFullOpacity(initialBg);
  const newColor = increaseOpacity(initialBg, increment);
  const handleMouseEnter = (event) => {
    event.currentTarget.style.backgroundColor = newColor;
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.style.backgroundColor = initialBg;
  };

  return (
    <button disabled={isDisabled} onClick={onClick} aria-label={text}>
      <div
        className={`${styles.buttonContainer} ${
          isDisabled && styles.buttonDisabled
        }`}
        style={{
          backgroundColor: !isDisabled && initialBg,
          color: !isDisabled && inlineCSS?.textColor,
          border: !isDisabled && inlineCSS?.borderStyle,
          gap: defaultInlineStyle?.gap,
          width: inlineCSS?.width,
          height: inlineCSS?.height,
          borderRadius: inlineCSS?.borderRadius,
        }}
        {...(inlineCSS?.hover &&
          !isDisabled && {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
          })}
      >
        {isPostIcon && icon && (
          <div
            className={`${styles.imageContainer}`}
            style={{
              width: iconCSS?.iconWidth,
              height: iconCSS?.iconHeight,
            }}
          >
            <Image
              style={{
                borderRadius: !isDisabled && iconCSS?.iconRadius,
                border: !isDisabled && iconCSS?.iconStyle,
              }}
              fill
              src={icon}
              alt="menu-icon"
            />
          </div>
        )}

        {text && (
          <div
            className={`${styles.textContainer}`}
            style={{
              fontSize: !isDisabled && inlineCSS?.textSize,
              fontWeight: !isDisabled && inlineCSS?.fontWeight,
            }}
          >
            {text}
          </div>
        )}

        {!isPostIcon && icon && (
          <div
            className={`${styles.imageContainer}`}
            style={{
              width: iconCSS?.iconWidth,
              height: iconCSS?.iconHeight,
            }}
          >
            <Image
              style={{
                borderRadius: !isDisabled && iconCSS?.iconRadius,
                border: !isDisabled && iconCSS?.iconStyle,
              }}
              fill
              src={icon}
              alt="menu-icon"
            />
          </div>
        )}
      </div>
    </button>
  );
};

MDButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  inlineCSS: PropTypes.object,
  iconCSS: PropTypes.object,
  isPostIcon: PropTypes.bool,
  icon: PropTypes.string,
};

export default MDButton;
