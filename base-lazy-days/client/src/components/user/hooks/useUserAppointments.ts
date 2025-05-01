import { useQuery } from "@tanstack/react-query";

import type { Appointment } from "@shared/types";

import { axiosInstance, getJWTHeader } from "../../../axiosInstance";

import { useLoginData } from "@/auth/AuthContext";
import { generatedAppointmentsKey } from "@/react-query/key-factories";

// for when we need a query function for useQuery
async function getUserAppointments(
  userId: number,
  userToken: string
): Promise<Appointment[] | null> {
  const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
    headers: getJWTHeader(userToken),
  });
  return data.appointments;
}

export function useUserAppointments(): Appointment[] {
  const { userId, userToken } = useLoginData();

  const { data: appointments = [] } = useQuery({
    enabled: !!userId,
    queryKey: generatedAppointmentsKey(userId, userToken),
    queryFn: () => getUserAppointments(userId, userToken),
  });

  return appointments;
}
