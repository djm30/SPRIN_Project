import { createPortal } from "react-dom";

// Portal function helper
// Takes in children and wrapperId
// Children is the content of the portal
// WrapperId is the id of the element that the portal will be rendered in
// Portal is used to render a component outside of the parent component and in a different part of the DOM
function ReactPortal({ children, wrapperId }) {
    return createPortal(children, document.getElementById(wrapperId));
}
export default ReactPortal;
