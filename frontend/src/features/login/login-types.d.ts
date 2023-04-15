// ================== Submit =====================
export interface LoginSubmitRequest {
  phone_number: string
}

export interface LoginSubmitResponse {
  message: string
}

// ================== Verify =====================
export interface LoginVerifyRequest {
  phone_number: string
  auth_code: string
}

export interface LoginVerifyResponse {
  access_token: string
  token_type: string
}
