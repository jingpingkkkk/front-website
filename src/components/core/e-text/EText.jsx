import cns from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './EText.css';

/**
 * EText Component
 *
 * This component is used to render paragraphs with consistent styling across the application.
 * It supports all standard p tags and allows for custom classes and other props.
 *
 * @prop {ReactNode} children
 * @prop {string} className
 * @prop {string} variant
 * @prop {boolean} hasBottomMargin
 * @prop {boolean} isBold 
 *
 * @example
 * // Default usage (renders as a <p> with dark variant):
 * <EText>
 *    P tag content
 * </EText>
 * @example
 * // With isBold= 'true':
 * <EHeading isBold={true}>
 *    Heading content // Font weight:600
 * </EHeading>

 */
function EText({ children, className, variant, hasBottomMargin, ...props }) {
  const baseClass = 'e-text';

  const variantClasses = {
    [`${baseClass}--has-bottom-margin`]: hasBottomMargin,
    [`${baseClass}--${variant}`]: true,
    [`${baseClass}--is-bold`]: isBold,
  };

  return (
    <p className={cns(baseClass, variantClasses, className)} {...props}>
      {children}
    </p>
  );
}

// Define prop types
EText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'muted',
  ]),
  hasBottomMargin: PropTypes.bool,
  isBold: PropTypes.bool,
};

// Define default props
EText.defaultProps = {
  className: '',
  variant: '',
  hasBottomMargin: true,
};

// Export component
export default EText;
