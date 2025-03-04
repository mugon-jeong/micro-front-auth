export interface RoleInfo {
  role: string;
  description: string;
}

export interface Base {
  id: string;
}

export interface Permissions {
  roles: {
    [key: string]: RoleInfo[]; // For any additional role categories
  };
}

export interface Authority {
  id: string;
  siteId: string;
  siteName: string;
  ko: string;
  en: string;
  roles: {
    [key: string]: string[]; // For any additional role categories
  };
}

export interface CreateRole {
  siteId: string;
  ko: string;
  en: string;
}
