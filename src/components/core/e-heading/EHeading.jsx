// Import dependencies
import cns from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './EHeading.css';

// Define default heading element
const HeadingDefaultElement = 'h2';

/**
 * EHeading Component
 *
 * This component is used to render headings with consistent styling across the application.
 * It supports all standard heading levels (h1-h6) and allows for custom classes and other props.
 *
 * @prop {ReactNode} children
 * @prop {string} className
 * @prop {string} variant
 * @prop {boolean} hasBottomMargin
 *
 * @example
 * // Default usage (renders as a <h2> with bottom margin):
 * <EHeading>
 *    Heading content
 * </EHeading>
 *
 * @example
 * // Without bottom margin:
 * <EHeading hasBottomMargin={false}>
 *    Heading content
 * </EHeading>
 *
 * @example
 * // With different heading level:
 * <EHeading variant="h3">
 *    Heading content
 * </EHeading>
 */
function EHeading({ children, className, variant, hasBottomMargin, ...props }) {
  const baseClass = 'e-heading';

  const variantClasses = {
    [`${baseClass}--has-bottom-margin`]: hasBottomMargin,
    [`${baseClass}--${variant}`]: true,
  };

  // Determine heading element type
  const Element = variant || HeadingDefaultElement;

  // Determine aria-level for accessibility
  const ariaLevel = variant
    ? variant.charAt(1)
    : HeadingDefaultElement.charAt(1);

  return (
    <Element
      className={cns(baseClass, variantClasses, className)}
      role="heading"
      aria-level={ariaLevel}
      {...props}
    >
      {children}
    </Element>
  );
}

// Define prop types
EHeading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  hasBottomMargin: PropTypes.bool,
};

// Define default props
EHeading.defaultProps = {
  className: '',
  variant: 'h2',
  hasBottomMargin: true,
};

// Export component
export default EHeading;
