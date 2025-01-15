export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  gender: 'MALE' | 'FEMALE';
  address: string;
  age: number;
  isActive: boolean;
  isDeleted: boolean;
  role: Role;
  createdAt: string;
  updatedAt?: string;
  createdBy?: CreatedBy;
  permissions: Permission[];
  provider: string;
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

export const SchoolarShipValue = {
  'Học bổng toàn phần': 'Học bổng toàn phần',
  'Học bổng bán phần': 'Học bổng bán phần',
};
export interface SchoolarShip {
  _id: string;
  name: string;
  image: string[];
  location: string;
  continent: string;
  ielts?: number;
  GPA?: number;
  pay?: number;
  value: keyof typeof SchoolarShipValue;
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

export const AdvisoryStatus = {
  'Đang Chờ Tư Vấn': 'Đang Chờ Tư Vấn',
  'Đang Tư Vấn': 'Đang Tư Vấn',
  'Hoàn Thành Tư Vấn': 'Hoàn Thành Tư Vấn',
};
export type AdvisoryStatus = keyof typeof AdvisoryStatus;
export const AdvisoryLevel = {
  'Các khoá học Tiếng Anh': 'Các khoá học Tiếng Anh',
  'Trung học': 'Trung học',
  'Đại học': 'Đại học',
  'Sau Đại học': 'Sau Đại học',
  'Tiến sĩ': 'Tiến sĩ',
  'Học nghề': 'Học nghề',
  'Dự bị đại học': 'Dự bị đại học',
};
export type AdvisoryLevel = keyof typeof AdvisoryLevel;
export const AdvisoryValue = {
  'Tự chi trả': 'Tự chi trả',
  'Được hỗ trợ bởi gia đình': 'Được hỗ trợ bởi gia đình',
  'Tìm kiếm học bổng': 'Tìm kiếm học bổng',
  'Tìm kiếm học bổng chính phủ': 'Tìm kiếm học bổng chính phủ',
  'Đã được nhận học bổng từ chính phủ': 'Đã được nhận học bổng từ chính phủ',
  'Vay ngân hàng': 'Vay ngân hàng',
  Khác: 'Khác',
  'Học bổng từ nhà tuyển dụng': 'Học bổng từ nhà tuyển dụng',
};
export type AdvisoryValue = keyof typeof AdvisoryValue;
export interface Advisory {
  _id: string;
  emailAdvisory: string;
  fullName: string;
  phone: string;
  address: string;
  continent: string;
  time: string;
  value: AdvisoryValue;
  level: AdvisoryLevel;
  status: AdvisoryStatus;
  history: [
    {
      status: AdvisoryStatus;
      updatedAt: Date;
      updatedBy?: {
        _id: string;
        email: string;
      };
    },
  ];
  createdBy: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}
export interface CreatedBy {
  _id: string;
  email: string;
}

// đã thanh toán lần 1
// hợp đồng thanh toán
// sửa hồ sơ
// hoàn chỉnh hồ sơ
// hồ sơ thất bại
// thanh toán lần 2
// hồ sơ thành công

export const ResumeStatus = {
  'Sửa hồ sơ': 'Sửa hồ sơ',
  'Hợp đồng thanh toán': 'Hợp đồng thanh toán',
  'Hoàn chỉnh hồ sơ': 'Hoàn chỉnh hồ sơ',
  'Hồ sơ đã đậu': 'Hồ sơ đã đậu',
  'Hồ sơ chưa đậu': 'Hồ sơ chưa đậu',
  'Thanh toán lần 2': 'Thanh toán lần 2',
  'Hồ sơ thành công': 'Hồ sơ thành công',
};

export type ResumeStatus = keyof typeof ResumeStatus;

export const ResumeProvStatus = {
  'Đang chờ duyệt': 'Đang chờ duyệt',
  'Đang xem xét': 'Đang xem xét',
  'Hồ sơ đã đậu': 'Hồ sơ đã đậu',
  'Hồ sơ chưa đậu': 'Hồ sơ chưa đậu',
  'Lịch phỏng vấn': 'Lịch phỏng vấn',
  'Hồ sơ thất bại': 'Hồ sơ thất bại',
  'Hồ sơ thành công': 'Hồ sơ thành công',
};

export type ResumeProvStatus = keyof typeof ResumeProvStatus;

export interface Resume {
  _id: string;
  name: string;
  email: string;
  userId: string;
  urlCV: string;
  status: ResumeStatus;
  provider: string;
  scholarship: Pick<SchoolarShip, '_id' | 'name'>;
  history: History[];
  orderCode: string;
  user: {
    name: string;
    _id: string;
  };
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt?: string;
  __v: number;
  createdBy: CreatedBy;
  updatedBy: CreatedBy;
}

export type ResumeProv = Omit<Resume, 'status' | 'scholarship'> & { status: ResumeProvStatus; scholarProv: { _id: string; name: string } };

export interface History {
  status: string;
  urlCV?: string;
  note?: string;
  updatedAt: string;
  updatedBy: CreatedBy;
}

export interface PaymentLink {
  bin: string; // Mã BIN ngân hàng
  accountNumber: string; // Số tài khoản của kênh thanh toán
  accountName: string; // Tên chủ tài khoản của kênh thanh toán
  amount: number; // Số tiền của đơn hàng
  description: string; // Mô tả đơn hàng, được sử dụng làm nội dung chuyển khoản
  orderCode: number; // Mã đơn hàng
  currency: string; // Đơn vị tiền tệ
  paymentLinkId: string; // ID link thanh toán
  status: string; // Trạng thái của link thanh toán
  checkoutUrl: string; // Đường dẫn trang thanh toán
  qrCode: string; // Mã QR thanh toán
}

export interface Conversation {
  _id: string;
  user: Pick<User, '_id' | 'email' | 'avatar'>;
  staff: Pick<User, '_id' | 'email' | 'avatar'>;
  messages: Message[];
  status: boolean; //
}
export interface Message {
  _id: string;
  sender: Pick<User, '_id' | 'email' | 'avatar'>;
  text: string;
  files?: string[] | File[];
  sentAt: string;
}

export interface MessagePayload {
  text: string;
  files: {
    name: string;
    buffer: File;
  }[];
}

export interface Study {
  _id: string;
  name: string;
  image: string[];
  location: string;
  continent: string;
  description: string;
  isActive: boolean;
  createdBy: CreatedBy;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt?: string;
}
export const QuizType = {
  certification: 'certification',
  interview: 'interview',
};
export type QuizType = keyof typeof QuizType;
export interface Quiz {
  _id: string;
  title: string;
  description: string;
  question: Question[];
  type: QuizType;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt?: string;
}
export interface Question {
  _id: string;
  question: string;
  answer: string[];
  option: string[];
  createdBy: CreatedBy;
  isDeleted: boolean;
  quiz: number;
  deletedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CrawData {
  _id: string;
  title: string;
  href: string;
  description: string;
  level: string;
  location: string;
  logo: string;
  isDeleted: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface News {
  _id: string;
  title: string;
  description: string;
  label: string;
  heroImage: string;
  createdAt: Date;
}
export interface Provider {
  _id: string;
  name: string;
  address: string[];
  description: string;
  logo: string;
  background: string;
  createdBy: CreatedBy;
  isDeleted: boolean;
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface DashboardData {
  transactions: Transactions;
  resumes: Resumes;
}

export interface Resumes {
  total: number;
  completed: number;
  pending: number;
}

export interface Transactions {
  total: {
    total: number;
  }[];
  thisMonth: MonthSummary[];
  lastMonth: MonthSummary[];
}

export interface MonthSummary {
  total: number;
  month: number;
}

export interface DashboardColumnData {
  _id: {
    year: number;
    month: number;
  };
  total: number;
}
