// async function get(func) {
//   const b = await func();
// }
//
// export default function gmInitComponentData(renderProps) {
//   return new Promise((resolve, reject) => {
//     const initialProps = renderProps.components.reduce((prev, current) => {
//       const a = [];
//       if (typeof current.getInitialProps === 'function') {
//         a.push(current.getInitialProps);
//       }
//       if (typeof current.WrappedComponent === 'function' && (current.WrappedComponent.getInitialProps !== current.getInitialProps)) {
//         a.push(current.WrappedComponent.getInitialProps);
//       }
//       return a;
//     });
//
//     const t = initialProps.map((f) => {
//       return get(f);
//     });
//     const finalRenderProps = Object.assign({}, renderProps, t);
//
//     console.log(finalRenderProps);
//     return Promise.resolve(finalRenderProps);
//   });
// }

export function gmInitComponentData(dispatch, renderProps) {
  const needs = renderProps.components.reduce((prev, current) => {
    return (current.need || [])
      .concat(
        (current.WrappedComponent && (current.WrappedComponent.need !== current.need) ? current.WrappedComponent.need : []) || [])
      .concat(prev);
  }, []);
  const promises = needs.map(need => dispatch(need(renderProps)));
  return Promise.all(promises);
}
