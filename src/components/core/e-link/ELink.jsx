import cns from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './ELink.css';

// If no 'as' prop is passed, the link will render as a <Link> element
const DefaultLinkElement = Link;

/**
 * ELink component
 *
 * ELink is a flexible link component that can render as a <Link>, <NavLink>, or <a> element.
 * It supports all the props of these elements and a few additional ones.
 *
 * @prop {string|object} to
 * @prop {string} className
 * @prop {string|elementType} as
 * @prop {string} href
 * @prop {string} target
 * @prop {string} rel
 * @prop {boolean} disabled
 * @prop {boolean} openNewTab
 * @prop {boolean} replace
 * @prop {object} state
 * @prop {function} onClick
 * @prop {boolean} end
 * @prop {boolean} caseSensitive
 * @prop {string} navActiveClassName
 * @prop {string} navPendingClassName
 *
 * @example
 * // Default usage (renders as a <Link>):
 * <ELink to="/home">
 *    Home
 * </ELink>
 *
 * @example
 * // Render as an anchor tag (<a>):
 * <ELink as="a" href="https://www.google.com">
 *    Google
 * </ELink>
 *
 * @example
 * // Disable the link:
 * <ELink disabled>
 *    Disabled
 * </ELink>
 *
 * @example
 * // Open the link in a new tab:
 * <ELink openNewTab to="/new-page">
 *    New Page
 * </ELink>
 *
 * @example
 * // Render as a <NavLink> and apply active styles:
 * <ELink as={NavLink} to="/current-page" navActiveClassName="active">
 *    Current Page
 * </ELink>
 */
function ELink({
  // Common props
  children,
  className,
  as,

  // HTML 'a' tag props
  href,
  target,
  rel,
  download, // Specifies that the target will be downloaded when a user clicks on the hyperlink
  hreflang, // Specifies the language of the linked resource
  type, // Specifies the media type of the linked resource
  referrerpolicy, // Specifies which referrer to send

  // react-router-dom v6 Link props
  to,
  replace, // When true, clicking the link will replace the current entry in the history stack instead of adding a new one
  state, // State to persist to the location
  onClick, // Custom handler for the click event

  // react-router-dom NavLink props
  end,
  caseSensitive,

  // Other props
  disabled,
  openNewTab,
  navActiveClassName, // for NavLink
  navPendingClassName, // for NavLink
  ...props
}) {
  const baseClass = 'e-link';

  const variantClasses = {
    [`${baseClass}--disabled`]: disabled,
  };

  const Element = openNewTab ? 'a' : as || DefaultLinkElement;

  const eLinkProps = {
    ...props,
    className: cns(baseClass, className, variantClasses),
    onClick,
    'aria-disabled': disabled ? 'true' : 'false',
    tabIndex: disabled ? '-1' : '0',
  };

  // <a> tag props
  if (as === 'a') {
    eLinkProps.href = href;
    eLinkProps.target = target;
    eLinkProps.rel = rel;
    eLinkProps.download = download;
    eLinkProps.hreflang = hreflang;
    eLinkProps.type = type;
    eLinkProps.referrerpolicy = referrerpolicy;
  }

  // <Link> and <NavLink> props
  if (as === Link || as === NavLink) {
    eLinkProps.to = to;
    eLinkProps.replace = replace;
    eLinkProps.state = state;
  }

  // <NavLink> props
  if (as === NavLink) {
    eLinkProps.end = end;
    eLinkProps.caseSensitive = caseSensitive;
    eLinkProps.navActiveClassName = navActiveClassName;
    eLinkProps.navPendingClassName = navPendingClassName;
    eLinkProps.className = ({ isActive, isPending }) => {
      return cns(baseClass, className, variantClasses, {
        [navActiveClassName]: isActive,
        [navPendingClassName]: isPending,
      });
    };
  }

  if (openNewTab) {
    eLinkProps.target = '_blank';
    eLinkProps.rel = 'noopener noreferrer';
  }

  if (disabled) {
    eLinkProps.onClick = (e) => e.preventDefault();
  }

  return <Element {...eLinkProps}>{children}</Element>;
}

// Prop types for ELink component
// readmore: https://legacy.reactjs.org/docs/typechecking-with-proptypes.html
ELink.propTypes = {
  // Common props
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.oneOf(['a']), PropTypes.elementType]),

  // HTML 'a' tag props
  href: PropTypes.string, // Specifies the URL of the page the link goes to
  target: PropTypes.string, // Specifies where to open the linked document
  rel: PropTypes.string, // Specifies the relationship between the current document and the linked document
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), // Specifies that the target will be downloaded when a user clicks on the hyperlink
  hreflang: PropTypes.string, // Specifies the language of the linked resource
  type: PropTypes.string, // Specifies the media type of the linked resource
  referrerpolicy: PropTypes.oneOf(['no-referrer', 'origin', 'unsafe-url']), // Specifies which referrer to send

  // react-router-dom v6 Link props
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // The URL to navigate to when the link is clicked
  replace: PropTypes.bool, // When true, clicking the link will replace the current entry in the history stack instead of adding a new one
  state: PropTypes.shape({}), // State to persist to the location
  onClick: PropTypes.func, // Custom handler for the click event

  // react-router-dom NavLink props
  end: PropTypes.bool, // When true, the active class/style will only be applied if the location is matched exactly
  caseSensitive: PropTypes.bool, // When true, the trailing slash on a location’s pathname will be taken into consideration when determining if the location matches the current URL
  navActiveClassName: PropTypes.string, // The class to be added on the active NavLink
  navPendingClassName: PropTypes.string, // The class to be added on the pending NavLink

  // Other props
  disabled: PropTypes.bool, // Whether the link is disabled
  openNewTab: PropTypes.bool, // Whether to open the link in a new tab
};

ELink.defaultProps = {
  // Common props
  className: '',
  as: 'a',

  // HTML 'a' tag props
  href: '',
  target: '_self',
  rel: 'noopener noreferrer',
  download: false,
  hreflang: 'en',
  type: '',
  referrerpolicy: 'no-referrer',

  // react-router-dom v6 Link props
  to: '',
  replace: false,
  state: {},
  onClick: null,

  // react-router-dom NavLink props
  end: false,
  caseSensitive: false,
  navActiveClassName: '',
  navPendingClassName: '',

  // Other props
  disabled: false,
  openNewTab: false,
};

export default ELink;
