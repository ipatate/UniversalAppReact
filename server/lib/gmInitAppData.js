/*
 init the state data before server render
 only use with redux
 the function each the initialProps from component and add to Array
 after all functions is called with dispatch function from redux
 access only of App initialProps and the first children initialProps
*/
export function gmInitAppData(dispatch, renderProps) {
  const init = renderProps.components.reduce((prev, current) => {
    return (Array.isArray(current.initialProps) ? current.initialProps : [])
      .concat(
        (current.WrappedComponent
        && (Array.isArray(current.initialProps) && current.WrappedComponent.initialProps !== current.initialProps) ?
        current.WrappedComponent.initialProps : []) || [])
      .concat(prev);
  }, []);
  const promises = init.map((action) => {
    if (typeof action === 'function') {
      return dispatch(action(renderProps));
    }
    return true;
  });
  return Promise.all(promises);
}

export default gmInitAppData;
