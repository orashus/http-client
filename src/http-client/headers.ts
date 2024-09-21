import { tokenService } from "@/features/auth/token";

export const createDefaultHeaders = (): HeadersInit => {
  const session_token =
    typeof window === "undefined" ? "" : tokenService.getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session_token}`, // adding Authorization header as one of default headers
  };
};
