import { Buffer } from 'buffer';
import { notification } from 'antd';

export const isAuthenticated = () => {
  const token = localStorage.getItem("TOKEN");
  const user = localStorage.getItem("USER");
  if (token && user) {
    try {
      const { role } = JSON.parse(user);
      const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
      return role && payload.exp > Date.now() / 1000;
    } catch (e) {
      console.log("Auth error:", e);
      return false;
    }
  }
  return false;
};

export const isValidURL = (url) => (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/g).test(url);

export const isValidEmail = (email) => (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]/g).test(email);

export const isValidBusinessEmail = (email) => /^[a-zA-Z0-9._%+-]+@(?!gmail\.|yahoo\.|hotmail\.|aol\.|live\.|outlook\.|yopmail\.|zohomail\.|icloud\.|mac\.|me\.)[a-zA-Z0-9_-]+\.[a-zA-Z0-9-.]{2,61}$/gi.test(email);

export const successNotification = (message, description) => {
  return notification.success({
    message: message,
    description,
    placement: "topRight",
    duration: 6,
  });
};

export const errorNotification = (message, description) => {
  return notification.error({
    message: message,
    description,
    placement: "topRight",
    duration: 6,
  });
};

export const infoNotification = (message, description) => {
  return notification.info({
    message: message,
    description,
    placement: "topRight",
    duration: 6,
  });
};

export const getUser = () => {
  const user = localStorage.getItem("USER") || "{}";
  if (user) {
    try {
      return JSON.parse(user);
    } catch (e) {
      return null;
    }
  }
  return null;
};