import cns from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './ECard.css';

/**
 * Card component
 *
 * Usage
 *
 * Normal card:
 * ```jsx
 * <ECard>
 *    <div>Card content</div>
 * </ECard>
 * ```
 *
 * Card with shadow:
 * ```jsx
 * <ECard hasShadow>
 *   <div>Card content</div>
 * </ECard>
 * ```
 */
function ECard({ className, hasShadow, children, ...props }) {
  const baseClass = 'e-card';

  const variantClasses = {
    [`${baseClass}--has-shadow`]: hasShadow,
  };

  return (
    <div className={cns(baseClass, variantClasses, className)} {...props}>
      {children}
    </div>
  );
}

ECard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasShadow: PropTypes.bool,
};

ECard.defaultProps = {
  className: '',
  hasShadow: false,
};

export default ECard;
