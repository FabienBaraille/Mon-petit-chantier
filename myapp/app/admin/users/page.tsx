import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import { Table, TableContainer, Paper, TableBody } from "@mui/material";

import { getAuthSession } from "@/lib/auth";
import { getSortedUsers, getUserByMail } from "@/Utils/Request/usersQuery";
import { paramsUserCheck } from "@/Utils/checks/searchParamsCheck";

import { UserTableHead } from "@/components/features/tables/users/userTableHead";
import { UserTableRow } from "@/components/features/tables/users/userTableRow";
import { CustomTablePagination } from "@/components/features/tables/customTablePagination";
import { LoadingSkeletonAdmin } from "../loadingSkeletonAdmin";
import { availableRowsPerPage } from "@/components/features/tables/tableInfos";
import { SearchBar } from "@/components/features/tables/searchBar";

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

  const search = searchParams?.search ?? null;
  const currentPage = Number(searchParams?.page ?? 0) ?? 0;
  const rowsPerPage = Number(searchParams?.rows ?? availableRowsPerPage[availableRowsPerPage.length - 1]) ?? availableRowsPerPage[availableRowsPerPage.length - 1];
  const colSorted: string = searchParams?.sort ?? '';
  const order = searchParams?.order ?? '';

  const totalUsers = await prisma.user.count({});

  if (!search) {
    paramsUserCheck(currentPage, rowsPerPage, colSorted, order, totalUsers, '/admin/users');
  }

  let usersList: UserData[] | null = null;

  if (search) {
    usersList = await getUserByMail(role, search);
  } else {
    let sortOrder = undefined;
    if (colSorted !== '') {
      sortOrder = {[colSorted]: order}
    }
    usersList = await getSortedUsers(role, sortOrder, rowsPerPage, currentPage);
  }

  if (!usersList) {
    redirect("/error/403");
  }

  return (
    <TableContainer className="custom-table" component={Paper}>
      <SearchBar placeholder="Email" default={search} />
      <Table>
        <UserTableHead />
        <Suspense fallback={<LoadingSkeletonAdmin count={rowsPerPage} />} >
          <TableBody>
            {usersList.map((user, index) => <UserTableRow key={index} {...user} />)}
          </TableBody>
        </Suspense>
      </Table>
      <CustomTablePagination
        count={totalUsers}
      />
    </TableContainer>

  )
}