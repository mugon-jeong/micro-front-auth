"use server"

import {coreApi} from "@/lib/api";

export const myinfoApi = async () => {
  return await coreApi.get('api/v1/members').json()
}