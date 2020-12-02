/*companySlice.ts*/
export interface COMPANY {
  id: number;
  name: string;
  // created_at: string;
  // updated_at: string;
}
export interface READ_COMPANY {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface POST_COMPANY {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface COMPANY_STATE {
  companies: READ_COMPANY[];
  editedDocktor: POST_COMPANY;
  selectedDocktor: READ_COMPANY;
}

/*docktorSlice.ts*/
export interface DOCKTOR {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface READ_DOCKTOR {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface POST_DOCKTOR {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface DOCKTOR_STATE {
  docktors: READ_DOCKTOR[];
  editedDocktor: POST_DOCKTOR;
  selectedDocktor: READ_DOCKTOR;
}

/*authSlice.ts*/
export interface LOGIN_USER {
  id: number;
  username: string;
}
export interface FILE extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
export interface PROFILE {
  id: number;
  user_profile: number;
  img: string | null;
}
export interface POST_PROFILE {
  id: number;
  img: File | null;
}
export interface CRED {
  username: string;
  password: string;
}
export interface JWT {
  refresh: string;
  access: string;
}
export interface USER {
  id: number;
  username: string;
}
export interface AUTH_STATE {
  isLoginView: boolean;
  loginUser: LOGIN_USER;
  profiles: PROFILE[];
}
/*taskSlice.ts*/
export interface READ_TASK {
  id: number;
  task: string;
  description: string;
  criteria: string;
  status: string;
  status_name: string;
  category: number;
  category_item: string;
  estimate: number;
  responsible: number;
  responsible_username: string;
  owner: number;
  owner_username: string;
  created_at: string;
  updated_at: string;
}
export interface POST_TASK {
  id: number;
  task: string;
  description: string;
  criteria: string;
  status: string;
  category: number;
  estimate: number;
  responsible: number;
}
export interface CATEGORY {
  id: number;
  item: string;
}
export interface TASK_STATE {
  tasks: READ_TASK[];
  editedTask: POST_TASK;
  selectedTask: READ_TASK;
  users: USER[];
  category: CATEGORY[];
}
/*TaskList.tsx*/
export interface SORT_STATE {
  rows: READ_TASK[];
  order: "desc" | "asc";
  activeKey: string;
}
