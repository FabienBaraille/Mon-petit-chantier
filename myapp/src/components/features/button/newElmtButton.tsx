"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { MyAppBtn } from "@/components/Theme/Custom/MyAppBtn";

export type NewElmtButtonProps = {name: string};

export const NewElmtButton = (props: NewElmtButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const baseUrl = usePathname();

  const handleNew = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('show', 'true');
    const url = `${baseUrl}?${newSearchParams.toString()}`;
    router.push(url);
  }

  return (
    <MyAppBtn onClick={handleNew}>{`Ajouter ${props.name}`}</MyAppBtn>
  )
}