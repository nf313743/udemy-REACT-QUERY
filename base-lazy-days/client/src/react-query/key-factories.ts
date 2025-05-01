import { queryKeys } from "./constants";

export const generatedUserKey = (userId: number, userToken: string) => {
  return [queryKeys.user, userId];
};

export const generatedAppointmentsKey = (userId: number, userToken: string) => {
  return [queryKeys.appointments, queryKeys.user, userId, userToken];
};
