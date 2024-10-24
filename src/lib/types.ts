export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  gender: 'male' | 'female';
  address: string;
  age: number;
  isActive: boolean;
  isDeleted: boolean;
  role: Role | string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: CreatedBy;
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
  image: string[];
  location: string;
  continent: string;
  level: string[];
  major: string[];
  quantity: number;
  description: string;
  isActive: boolean;
  createdBy: CreatedBy;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatedBy {
  _id: string;
  email: string;
}

export const ResumeStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export interface Resume {
  _id: string;
  email: string;
  userId: string;
  urlCV: string;
  status: keyof typeof ResumeStatus;
  provider: string;
  scholarship: string;
  history: History[];
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt?: string;
  __v: number;
  createdBy: CreatedBy;
  updatedBy: CreatedBy;
}

export interface History {
  status: string;
  updatedAt: string;
  updatedBy: CreatedBy;
}
