export const validEmail = (email: unknown): boolean => {
  if (typeof email !== "string") return false;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
