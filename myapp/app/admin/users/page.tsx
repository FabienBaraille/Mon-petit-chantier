import { Suspense } from "react";
import { redirect } from "next/navigation";

import { Table, TableContainer, Paper, TableBody } from "@mui/material";

import { getAuthSession } from "@/lib/auth";
import { getSortedUsers } from "@/Utils/Request/usersQuery";

import { UserTableHead } from "@/components/features/tables/users/userTableHead";
import { UserTableRow } from "@/components/features/tables/users/userTableRow";
import { CustomTablePagination } from "@/components/features/tables/customTablePagination";
import { LoadingSkeletonAdmin } from "../loadingSkeletonAdmin";

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

  // Sécuriser les search params suivant un tableau d'infos afin d'éviter les erreurs causées par la manipulation d'url par un utilisateur
  // Param page voir un calcul avec page max si supérieur -> page max
  // Param perPage 10, 25 ou 50 si autre -> 50
  // Param des colSorted colonne existante sinon vide
  // Param direction 'asc' ou 'desc' sinon ''
  // Si l'un des params ne va pas -> update l'url avec les valeurs modifiées
  
  const currentPage = Number(searchParams.page ?? 0) ?? 0;
  const rowsPerPage = Number(searchParams.per ?? 50) ?? 50;
  const colSorted: string = searchParams.sort ?? '';
  const direction = searchParams.dir ?? '';

  let order = undefined;

  if (colSorted !== '') {
    order = {[colSorted]: direction}
  }

  const result = await getSortedUsers(role, order, rowsPerPage, currentPage);
  const { usersList, totalUsers } = result || { usersList: [], totalUsers: 0 };

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