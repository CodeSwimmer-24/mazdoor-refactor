// Higher order component, to pass in the props to a component
export const passSignOutProp = (Component, signOut) => {
  return (props) => <Component {...props} signOut={signOut} />;
};
