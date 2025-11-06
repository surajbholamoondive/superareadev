/**
 * Design-style label component.
 * @component
 * @param {Object} props - The component's properties.
 * @param {string} props.text - The main text content of the label.
 * @param {string} [props.prefix] - Prefix content displayed before the text.
 * @param {string} [props.postfix] - Postfix content displayed after the text.
 * @param {Object} props.icon - The icon object with a 'src' property for the icon image.
 * @param {Object[]} props.formatterList - The list of formatter parameters for numberFormatter.
 * @param {Object} props.inlineStyle - Inline styling for the label.
 * @param {string} props.inlineStyle.bgColor - Background color of the label.
 * @param {string} props.inlineStyle.textColor - Text color of the label.
 * @param {string} props.inlineStyle.iconWidth - Width of the icon.
 * @param {Object} props.inlineStyle.additionalStyles - Additional styles to apply.
 * @param {string} props.inlineStyle.containerClass - Additional classes for the label container.
 * @returns {JSX.Element} JSX for the MDLabel component.
 */
 
import { numberFormatter } from '@/utils/utils'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
 
export const MDLabel = ({
  text,
  prefix,
  postfix,
  icon,
  intlNumberFormatter,
  inlineStyle,
  mobileNumber,
}) => {
 
  const {
    bgColor,
    textColor,
    textClass,
    fontWeight,
    iconWidth,
    additionalStyles,
    containerClass,
    imgClass,
    position,
  } = inlineStyle || {}
 
  const ICON=icon
  const styles = {
    backgroundColor: bgColor,
    color: textColor,
    weight: fontWeight,
    width: iconWidth,
    ...additionalStyles,
  }
 
  const renderIcon = () => {
    return (
      icon?.src ? (
        <img
          src={icon.src}
          width={11}
          height={11}
          alt="Real Estate Menu Icon, mores icon"
          className={`mr-1 ${position && 'absolute'}  top-0 ${imgClass}`}
          style={{ width: styles.width }}
        />
      ) : icon  && (
        <ICON color={'gray'} height={18} width={18}/>
      )
    )
  }
  return (
    <div className={`flex relative ${containerClass}`} style={styles}>
      {renderIcon()}
      {prefix && (
        <p
          className={`${textClass?textClass:'mx-1'}`}
          style={{ color: styles.color, fontWeight: styles.weight }}
        >
          {typeof prefix === 'number'
            ? prefix &&
              numberFormatter(
                prefix,
                intlNumberFormatter?.[0],
                intlNumberFormatter?.[1]
              )
            : prefix}
        </p>
      )}
      <p
        className={` ${position && 'ml-5'} ${textClass} max-[360px]:text-[12px]`}
        style={{ color: styles.color, fontWeight: styles.weight }}
      >
        {text}
      </p>
      <p>{postfix && postfix}</p>
      <p>{mobileNumber && formatPhoneNumberIntl(mobileNumber)}</p>
    </div>
  )
}
 
 