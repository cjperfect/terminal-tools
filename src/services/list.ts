import ajax from "@/utils/ajax";

export const getList = (data?: any) => {
  return ajax.post("/getList", data);
};
