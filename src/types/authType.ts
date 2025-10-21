export interface authUserInfoType {
  userId?: number;
  name: string;
  nickname?: string;
  profileImageUrl: string;
  province?: string;
  city?: string;
  district?: string;
  detail?: string;
  accessToken: string;
}

export interface profileDataType {
  id?: number;
  name?: string | null;
  nickname?: string | null;
  image?: string;
  province?: string;
  city?: string;
  district?: string;
  detail?: string;
}
