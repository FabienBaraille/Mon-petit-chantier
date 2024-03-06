import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

import { Table, TableBody } from "@mui/material";

import { getSortedUsers, getUserByMail } from "@/Utils/Request/usersQuery";
import { searchParamsCheck } from "@/Utils/searchParams/searchParamsCheck";

import { UserTableRow } from "@/components/features/tables/users/userTableRow";
import { CustomTablePagination } from "@/components/features/tables/common/customTablePagination";
import { LoadingSkeletonAdmin } from "../loadingSkeletonAdmin";
import { availableRowsPerPage, userRowsId, userRowsName } from "@/components/features/tables/tableInfos";
import { SearchBar } from "@/components/features/tables/common/searchBar";
import { CustomTableHead } from "@/components/features/tables/common/customTableHead";
import { MyTableContainer } from "@/components/Theme/Custom/MyTableContainer";

export type UserData = {
  id: string,
  name: string | null,
  username: string | null,
  email: string,
  role: string,
  status: string,
}

export default async function usersPage({ searchParams } :{searchParams: {[key: string]: string | undefined}}) {

  const session = await getAuthSession();

  const role = session?.user.role;

  const search = searchParams?.search ?? null;
  const currentPage = Number(searchParams?.page ?? 0) ?? 0;
  const rowsPerPage = Number(searchParams?.rows ?? availableRowsPerPage[availableRowsPerPage.length - 1]) ?? availableRowsPerPage[availableRowsPerPage.length - 1];
  const colSorted = searchParams?.sort ?? '';
  const order = searchParams?.order ?? '';

  let totalUsers = await prisma.user.count({});

  if (!search) {
    searchParamsCheck(currentPage, rowsPerPage, colSorted, order, totalUsers, userRowsId, '/admin/users');
  }

  let usersList: UserData[] | null = null;

  if (search) {
    usersList = await getUserByMail(role, search);
    totalUsers = usersList ? usersList.length : 0;
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
    <MyTableContainer className="custom-table">
      <SearchBar placeholder="Email" default={search} />
      <Table>
        <CustomTableHead rowsId={userRowsId} rowsName={userRowsName} />
        <Suspense fallback={<LoadingSkeletonAdmin count={rowsPerPage} />} >
          <TableBody>
            {usersList.map((user, index) => <UserTableRow key={index} {...user} />)}
          </TableBody>
        </Suspense>
      </Table>
      <CustomTablePagination
        count={totalUsers}
      />
    </MyTableContainer>

  )
}