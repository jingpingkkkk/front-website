import cns from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './EHeading.css';

const HeadingDefaultElement = 'h2';

/**
 * Heading Component
 *
 * Usage
 *
 * Normal
 * ```jsx
 * <EHeading>
 *    Heading content
 * </EHeading>
 * ```
 *
 * Without bottom margin
 * ```jsx
 * <EHeading hasBottomMargin={false}>
 *    Heading content
 * </EHeading>
 * ```
 *
 * With variants
 * ```jsx
 * <EHeading variant="h2">
 *    Heading content
 * </EHeading>
 * ```
 */
function EHeading({ className, variant, hasBottomMargin, children, ...props }) {
  const baseClass = 'e-heading';

  const variantClasses = {
    [`${baseClass}--has-bottom-margin`]: hasBottomMargin,
    [`${baseClass}--${variant}`]: true,
  };

  const Element = variant || HeadingDefaultElement;

  return (
    <Element className={cns(baseClass, variantClasses, className)} {...props}>
      {children}
    </Element>
  );
}

EHeading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  heading: PropTypes.string,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  hasBottomMargin: PropTypes.bool,
};

EHeading.defaultProps = {
  className: '',
  heading: '',
  variant: 'h2',
  hasBottomMargin: true,
};

export default EHeading;
