export interface UserType {
  id: number;
  telegram_id: number;
  locale: string;
}
export interface Session {
  user: UserType;
  route: string;
  authing: boolean;
  msg_id_to_delete: number;
}
