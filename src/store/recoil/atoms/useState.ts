import { atom } from 'recoil';

interface UserData {
  email: string;
  name: string;
  role: number;
  image: string;
}

interface UserState {
  userData: UserData;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  userData: {
    email: '',
    name: '',
    role: 0,
    image: '',
  },
  isAuth: false,
  isLoading: false,
  error: '',
};

export const userState = atom({
  key: 'userState',
  default: initialState,
});
