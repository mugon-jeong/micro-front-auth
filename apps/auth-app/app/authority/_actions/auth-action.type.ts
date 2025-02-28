export interface RoleInfo {
  role: string;
  description: string;
}

export interface RolesResponse {
  roles: {
    [key: string]: RoleInfo[]; // For any additional role categories
  };
}
