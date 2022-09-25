export const USER_STORAGE_KEY = 'ACCESS_TOKEN';

const userStorage = {
  get() {
    const accessToken = localStorage.getItem(USER_STORAGE_KEY);
    try {
      if (!accessToken) return null;
      const parsedUser = JSON.parse(accessToken) as string;
      return parsedUser;
    } catch (e) {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  },
  set(accessToken: string) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(accessToken));
  },
  remove() {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem('user');
  },
  setUser(user: user) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  getUser() {
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user as string);
    return parsedUser;
  },
};

export default userStorage;

interface user {
  email: string;
  id: string;
}
