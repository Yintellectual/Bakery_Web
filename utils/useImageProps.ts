import { createGlobalState } from "react-hooks-global-state";

const initialState = { imageProps: null };
const { useGlobalState } = createGlobalState(initialState);

export const useImageProps = () => {
  return useGlobalState("imageProps");
};
