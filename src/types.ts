/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SignupRequest {
  username: string;
  email: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  redirectUrl: string;
}

export interface ProductOffering {
  id: string;
  title: string;
  category: string;
  description: string;
  price?: string;
  features: string[];
  tag?: string;
}
