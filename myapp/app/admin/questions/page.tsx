import { getQuestionById, getQuestionPartialTitle, getSortedQuestion } from "@/Utils/Request/questionsQuery";
import { searchParamsCheck } from "@/Utils/searchParams/searchParamsCheck";
import { MyTableContainer } from "@/components/Theme/Custom/MyTableContainer";
import { CustomTableHead } from "@/components/features/tables/common/customTableHead";
import { SearchBar } from "@/components/features/tables/common/searchBar";
import { availableRowsPerPage, questionRowsId, questionRowsName } from "@/components/features/tables/tableInfos";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Table, TableBody } from "@mui/material";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoadingSkeletonAdmin } from "../loadingSkeletonAdmin";
import { QuestionTableRow } from "@/components/features/tables/questions/questionTableRow";

export type QuestionData = {
  id: string,
  title: string,
  infos: string | null,
}

export type QuestionInfoData = {
  id: string,
  title: string,
  infos: string | null,
  items: {
    id: string,
    item: {
      id: string,
      name: string
    }
  }[],
  groups: {
    id: string,
    group: {
      id: string,
      title: string
    }
  }[],
}

export default async function QuestionPage({
  searchParams
} : {
  searchParams : {[key: string]: string | undefined}
}) {

  const session = await getAuthSession();

  const role = session?.user.role;

  const search = searchParams.search ?? null;
  const currentPage = Number(searchParams?.page ?? 0) ?? 0;
  const rowsPerPage = Number(searchParams?.rows ?? availableRowsPerPage[availableRowsPerPage.length - 1]) ?? availableRowsPerPage[availableRowsPerPage.length - 1];
  const colSorted = searchParams?.sort ?? '';
  const order = searchParams?.order ?? '';
  const show = searchParams?.show ? true : false;
  const questionId = searchParams?.questionid ?? null;

  let totalQuestions = await prisma.question.count();

  if (!search) {
    searchParamsCheck(currentPage, rowsPerPage, colSorted, order, totalQuestions, questionRowsId, '/admin/questions')
  }

  let questionsList: QuestionData[] | null = null;

  if (search) {
    questionsList = await getQuestionPartialTitle(role, search);
    totalQuestions = questionsList ? questionsList.length : 0;
  } else {
    let sortOrder = undefined;
    if (colSorted !== '') {
      sortOrder = {[colSorted]: order}
    }
    questionsList = await getSortedQuestion(role, sortOrder, rowsPerPage, currentPage);
  }

  let questionInfo: QuestionInfoData | null = null;

  if (questionId) {
    questionInfo = await getQuestionById(role, questionId);
  }

  if (!questionsList) {
    redirect("/error/403");
  }

  return (
    <>
      <MyTableContainer className="custom-table">
        <SearchBar placeholder="Nom" default={search} />
        <Table>
          <CustomTableHead rowsId={questionRowsId} rowsName={questionRowsName} />
          <Suspense fallback={<LoadingSkeletonAdmin count={rowsPerPage} />}>
            <TableBody>
              {totalQuestions === 0 ?
                <tr className="m-2">
                  <td>Aucune</td>
                  <td>question existante</td>
                </tr> :
                questionsList.map((question, index) => <QuestionTableRow key={`q${index}`} {...question} />)
              }
            </TableBody>
          </Suspense>
        </Table>
      </MyTableContainer>
    </>
  )
}