import { RefObject } from "react";

export function onClickOutsideOf(
  refObj: RefObject<HTMLElement>,
  callbackFn: (event: MouseEvent) => void
) {
  document.addEventListener("click", (event) => {
    if (event.target === refObj.current) return;
    callbackFn(event);
  });
}
