import { searchParamsCheck } from "@/Utils/searchParams/searchParamsCheck";
import { availableRowsPerPage, groupRowsId } from "@/components/features/tables/tableInfos";
import { prisma } from "@/lib/prisma";

export type GroupData = {
  id: string,
  title: string,
  infos: string | null,
  rank: number
}

export default async function GroupPage({
  searchParams
}: {
  searchParams : {[key: string]: string | undefined}
}) {

  const search = searchParams.search ?? null;
  const currentPage = Number(searchParams?.page ?? 0) ?? 0;
  const rowsPerPage = Number(searchParams?.rows ?? availableRowsPerPage[availableRowsPerPage.length - 1]) ?? availableRowsPerPage[availableRowsPerPage.length - 1];
  const colSorted = searchParams?.sort ?? '';
  const order = searchParams?.order ?? '';
  const show = searchParams?.show ? true : false;
  const groupId = searchParams?.id ?? null;

  let totalGroups = await prisma.group.count();

  if (!search) {
    searchParamsCheck(currentPage, rowsPerPage, colSorted, order, totalGroups, groupRowsId, "/admin/groups");
  }

  let groupsList: GroupData[] | null = null;
  

  return (
    <div></div>
  )
}