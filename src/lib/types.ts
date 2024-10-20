export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  permissions: Permission[];
}

export interface Role {
  _id: string;
  name: string;
}

export const ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
};

export interface Permission {
  _id: string;
  name: string;
  apiPath: string;
  method: string;
  module: string;
}

export interface IResponse<T> {
  message: string;
  data: T;
}
export interface IPagedRequest {
  current: number;
  pageSize: number;
}
export interface IPagedResponse<T> {
  statusCode: number;
  message: string;
  data: {
    meta: {
      current: number;
      pageSize: number;
      total: number;
      pages: number;
    };
    result: T[];
  };
}
export interface SchoolarShip {
  _id: string;
  name: string;
  image: any[];
  type: string;
  level: any[];
  subject: any[];
  description: string;
  isActive: boolean;
  createdBy: CreatedBy;
  isDeleted: boolean;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
}

export interface CreatedBy {
  _id: string;
  email: string;
}
