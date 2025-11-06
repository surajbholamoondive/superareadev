import React, { useState, useEffect, useRef } from 'react';
import styles from './MDSelectDropdownWithGrouping.module.css';
import Image from 'next/image';

export default function MDSelectDropdownWithGrouping({values, inlineCSS, byDefaultText='', icon='', iconSize, setSelectedValue, onClick}) {
    const [isActive, setIsActive] = useState(false);
    const [selectedOption, setSelectedOption] = useState(byDefaultText);
    const dropdownRef = useRef(null); // Ref to track the dropdown

    const defaultBgColors = {
        default: '#fff',
        secondary: 'rgb(226,227,229)',
        success: 'rgb(212,237,218)',
        danger: 'rgb(248,215,218)',
        warning: 'rgb(255,243,205)',
        info: 'rgb(209,236,241)',
        light: 'rgb(254,254,254)',
        dark: 'rgb(214,216,217)',
    };

    const defaultBorderColors = {
        default: '#caced1',
        secondary: 'rgb(226,227,229)',
        success: 'rgb(212,237,218)',
        danger: 'rgb(248,215,218)',
        warning: 'rgb(255,243,205)',
        info: 'rgb(209,236,241)',
        light: 'rgb(254,254,254)',
        dark: 'rgb(214,216,217)',
    };

    const finalInlineCSS = {
        backgroundColor: inlineCSS?.backgroundColor || defaultBgColors['default'],
        borderColor: inlineCSS?.border || `1px solid ${defaultBorderColors['default']}`,
        textColor: inlineCSS?.textColor || 'black',
        fontSize: inlineCSS?.fontSize || '0.875rem',
        dropdownFontSize: inlineCSS?.dropdownFontSize || '0.875rem',
        width: inlineCSS?.width || '400px',
        height: inlineCSS?.height || '100%',
        fontWeight: inlineCSS?.fontWeight || '100',
        bgColor: inlineCSS?.dropdownBackground || '#fff',
        borderRadius: inlineCSS?.borderRadius || '0.25rem',
        dropdownBorderRadius: inlineCSS?.dropdownBorderRadius || '4px',
        padding: inlineCSS?.padding || '0.675em 1em',
        iconHeight: iconSize || '20px',
        iconWidth: iconSize || '20px',
    };

    const handleButtonClick = () => {
        setIsActive(!isActive);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsActive(false);
        onClick(option);
    };

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsActive(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div 
            ref={dropdownRef} 
            className={`${styles.customSelect} ${isActive && styles.active}`} 
            style={{ 'fontSize': `${finalInlineCSS.fontSize}`, 'width': `${finalInlineCSS.width}` }}
        >
            <button
                className={styles.selectButton}
                style={{
                    'backgroundColor': `${finalInlineCSS.backgroundColor}`,
                    'border': `${finalInlineCSS.borderColor}`,
                    'color': `${finalInlineCSS.textColor}`,
                    'fontSize': `${finalInlineCSS.fontSize}`,
                    'borderRadius': `${finalInlineCSS.borderRadius}`,
                    'padding': `${finalInlineCSS.padding}`,
                    'height': `${finalInlineCSS.height}`,
                    'fontWeight': `${finalInlineCSS.fontWeight}`
                }}
                role="combobox"
                aria-labelledby="select button"
                aria-haspopup="listbox"
                aria-expanded={isActive}
                aria-controls="select-dropdown"
                onClick={handleButtonClick}
            >
                <span className={`${styles.selectedValue}`}>{selectedOption}</span>
                {icon === '' ? (
                    <span className={styles.arrow}></span>
                ) : (
                    <div className={styles.imageDiv} style={{ height: finalInlineCSS.iconHeight, width: finalInlineCSS.iconWidth }}>
                        <Image fill src={icon} alt="Icon to show on side of the dropdown" />
                    </div>
                )}
            </button>
            {isActive && (
                <ul className={styles.selectDropdown} role="listbox" id="select-dropdown" style={{ 'backgroundColor': `${finalInlineCSS.bgColor}`, 'borderRadius': `${finalInlineCSS.dropdownBorderRadius}` }}>
                    {Object.keys(values).map(option => (
                        <li key={option} className={styles.mainOption}>
                            <span className={styles.mainOptionHeading}>{option}</span>
                            <hr />
                            <ul className={styles.subOptions}>
                                {values[option]?.map(subOption => (
                                    <li
                                        key={subOption}
                                        tabIndex="0"
                                        onClick={() => handleOptionSelect(`${subOption}`)}
                                        className={`${styles.subOption}`}
                                        style={{ 'fontSize': `${finalInlineCSS.dropdownFontSize}` }}
                                    >
                                        <input type="radio" id={subOption} name="social-account" />
                                        <label htmlFor={subOption}>{subOption}</label>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
