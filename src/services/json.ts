import ajax from "@/utils/ajax";

export const getJson = (data?: any) => {
  return ajax.get("/getJson", data);
};
