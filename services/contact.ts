import api from "./api";

type FriendType = {
  friend: string;
}

type FriendsType = {
  friends: FriendType[]
}

export type LeadTag = {
  name: string;
  email: string;
  phone: string;
  tag: 'Lead_name' | 'Lead_ic_geroupix' | 'Lead_ic_cc' | 'Lead_ic_all' | 'Lead_buyers';
}

export const saveLead = (data: {
  name: string;
  email: string;
  phone: string;
}) => {
  return api.post("/rise_contact", {
    ...data,
    traffic_origin: "matriz",
    landing_page_origem: "unbk",
    project: "unbk_contacts",
  });
};

export const indicateFriend = (handoutId: string, friendsData: FriendsType) => {
  const friendSave = friendsData.friends.map((item) => item.friend).join(',');
  
  return api.post(`/save_indicacoes_unbk?handoutId=${handoutId}`, {indicacoes: friendSave})
}

export const triggerlead = async (data: LeadTag) => {
  return api.post(`/store_lead_sellflux`, data);
}
