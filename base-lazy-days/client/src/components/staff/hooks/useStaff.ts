import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { Staff } from "@shared/types";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/staff");
  return data;
}

export function useStaff() {
  // for filtering staff by treatment
  const [filter, setFilter] = useState("all");
  const fallback: Staff[] = [];

  const selectFn = (staff: Staff[], filter: string) => {
    console.log(filter);

    console.log(staff);

    if (filter !== "all")
      return staff.filter((x) =>
        x.treatmentNames.includes(filter.toLocaleLowerCase())
      );

    return staff;
  };

  // get data from server via useQuery
  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: (staff) => selectFn(staff, filter),
  });

  return { staff, filter, setFilter };
}
