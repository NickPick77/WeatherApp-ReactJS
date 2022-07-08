import { SetData, SetHide } from "./constants";

export const setData = (data) => ({
  type: SetData,
  payload: data,
});

export const setHide = (value) => ({
  type: SetHide,
  payload: value,
});
