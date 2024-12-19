import envVar from "./envVar";

export const getUserByToken = async () => {
  try {
    const res = await fetch(`${envVar.api_url}/user/user-by-token`, {
      credentials: "include",
    });
    const data = await res.json();
    if (res.status) {
      return { user: data, isAuthenticated: true };
    }
    if (!res.status) {
      return { user: null, isAuthenticated: false };
    }
  } catch (error) {
    return { user: null, isAuthenticated: false };
  }
};
