export type PatientRow = {
  id: string;
  queue_id: string;
  name: string;
  phone: { number: string; country_code: number };
  status: number;
  type: number;
  position: string | null;
  token_number: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export type QueueDetailRow = {
  id: string;
  name: string;
  type: number;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export type QueueAccountRow = {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};
