export interface UserList {
  setting: any;
  id: number;
  uuid: string;
  photo: string;
  name: string;
  email: string;
  age: number;
  gender_origin: number;
  birth_date: string;
  phone_number: string;
  address: string;
  detail_address: string;
  last_login: string;
  created_at: string;
  updated_at: string;
}

export interface UserSetting {
  allow_invest_push: boolean;
  allow_marketing_push: boolean;
  created_at: string;
  id: number;
  is_active: boolean;
  is_staff: boolean;
  updated_at: string;
  uuid: string;
}
