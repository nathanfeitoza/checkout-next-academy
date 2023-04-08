import { FriendsType, LeadDataStorage, LeadPendingPayment, LeadTag } from "../types/contactType";
import * as dateFns from "date-fns";
import api from "./api";

const LEAD_DATA_STORAGE_KEY = "lead-data-storage"

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
  const friendSave = friendsData.friends.map((item) => item.friend).join(",");

  return api.post(`/save_indicacoes_unbk?handoutId=${handoutId}`, {
    indicacoes: friendSave,
  });
};

export const triggerlead = async (data: LeadTag) => {
  return api.post(`/store_lead_notificacoes_inteligentes`, data);
};

export const triggerPendingPayment = async (data: LeadPendingPayment) => {
  const dataSend = {
    ...data,
    pix_due_date: data.pix_due_date ? dateFns.format(new Date(data.pix_due_date), 'yyyy-MM-dd HH:mm:ss') : undefined,
  }
  
  saveLeadData({
    ...dataSend,
    lead_id: undefined,
  });

  const response: any = await api.post(`/store_lead_notificacoes_inteligentes`, dataSend);
  const lead_id = response.data.data_lead.data.id;

  saveLeadData({
    ...dataSend,
    lead_id
  });

  return response;
};

export const triggerConfirmPayment = async (data?: LeadPendingPayment) => {
  const leadData: any = data || getLeadData();
  const dataSend: any = {
    name: leadData.name,
    email: leadData.email,
    phone: leadData.phone,
    order_id: leadData.order_id,
    payment_type: leadData.payment_type,
    value: leadData.value,
    event_type: "pagamento_aprovado",
  }

  if (leadData.lead_id) {
    dataSend.lead_id = leadData.lead_id
  }

  return api.post(`/store_lead_notificacoes_inteligentes`, dataSend);
};

export const saveLeadData = (leadData: LeadDataStorage) => {
  localStorage.setItem(LEAD_DATA_STORAGE_KEY, JSON.stringify(leadData));
}

export const getLeadData = (): LeadDataStorage => {
  const data = localStorage.getItem(LEAD_DATA_STORAGE_KEY);

  return JSON.parse(data || "{}");
}