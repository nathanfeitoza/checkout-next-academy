import api from "./api";

export const saveLead = (data: {
  name: string;
  email: string;
  phone: string;
}) => {
  return api.post("/rise_contact", {
    ...data,
    traffic_origin: "unbk",
    landing_page_origem: "matriz",
    project: "rise_contacts",
  });
};

export const IndicateFriend = (friends: any) => {
  console.log(friends)
}
