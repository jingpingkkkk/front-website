const userLogout = () => {
  localStorage.clear();
  localStorage.setItem('reload', true);
  window.location.href = '/';
};

// eslint-disable-next-line import/prefer-default-export
export { userLogout };
