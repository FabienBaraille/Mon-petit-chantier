import { Suspense } from "react";
import { redirect } from "next/navigation";

import { Table, TableContainer, Paper, TableBody } from "@mui/material";

import { getAuthSession } from "@/lib/auth";
import { getSortedUsers } from "@/Utils/Request/usersQuery";

import { UserTableHead } from "@/components/features/tables/users/userTableHead";
import { UserTableRow } from "@/components/features/tables/users/userTableRow";
import { CustomTablePagination } from "@/components/features/tables/customTablePagination";
import { LoadingSkeletonAdmin } from "../loadingSkeletonAdmin";
import { paramsUserCheck } from "@/Utils/checks/searchParamsCheck";
import { prisma } from "@/lib/prisma";

export type UserData = {
  id: string,
  name: string | null,
  username: string | null,
  email: string,
  role: string,
  status: string,
}

export default async function usersPage({ searchParams } : {[key: string]: string | string[] | undefined}) {

  const session = await getAuthSession();

  const role = session?.user.role;

  const currentPage = Number(searchParams.page ?? 0) ?? 0;
  const rowsPerPage = Number(searchParams.per ?? 50) ?? 50;
  const colSorted: string = searchParams.sort ?? '';
  const direction = searchParams.dir ?? '';

  const totalUsers = await prisma.user.count({});
  const newURL = paramsUserCheck(currentPage, rowsPerPage, colSorted, direction, totalUsers, '/admin/users');

  if (newURL) {
    redirect(newURL);
  }

  let order = undefined;

  if (colSorted !== '') {
    order = {[colSorted]: direction}
  }

  const usersList: UserData[] | null = await getSortedUsers(role, order, rowsPerPage, currentPage);

  if (!usersList) {
    redirect("/error/403");
  }

  return (
    <TableContainer className="custom-table" component={Paper}>
      <Table>
        <UserTableHead />
        <Suspense fallback={<LoadingSkeletonAdmin count={rowsPerPage} />} >
          <TableBody>
            {usersList.map((user) => <UserTableRow key={user.id} {...user} />)}
          </TableBody>
        </Suspense>
      </Table>
      <CustomTablePagination
        count={totalUsers}
      />
    </TableContainer>

  )
}