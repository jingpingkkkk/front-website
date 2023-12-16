import cns from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './ECard.css';

/**
 * ECard Component
 *
 * This component is used to render card elements with consistent styling across the application.
 * It supports optional shadow and allows for custom classes and other props.
 *
 * @prop {string} className
 * @prop {boolean} hasShadow
 * @prop {ReactNode} children
 *
 * @example
 * // Default usage (renders a card without shadow):
 * <ECard>
 *    <div>Card content</div>
 * </ECard>
 *
 * @example
 * // Card with shadow:
 * <ECard hasShadow>
 *   <div>Card content</div>
 * </ECard>
 */
function ECard({ className, hasShadow, children, ariaLabel, ...props }) {
  const baseClass = 'e-card';

  const variantClasses = {
    [`${baseClass}--has-shadow`]: hasShadow,
  };

  return (
    <div
      className={cns(baseClass, variantClasses, className)}
      role="region"
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </div>
  );
}

ECard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasShadow: PropTypes.bool,
  ariaLabel: PropTypes.string, // Add prop type for ariaLabel
};

ECard.defaultProps = {
  className: '',
  hasShadow: false,
  ariaLabel: 'Card Component',
};

export default ECard;
