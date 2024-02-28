"use client";

import { IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export type SearchBarProps = {
  placeholder: string,
  default: string | null
};

export const SearchBar = (props: SearchBarProps) => {

  const router = useRouter();
  const baseUrl = usePathname();

  const [searchValue, setSearchValue] = useState<string>(props.default ?? '');

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('search', searchValue);
    const url = `${baseUrl}?${searchParams.toString()}`;
    router.push(url);
  }

  return (
    <div className="m-2 flex w-full" style={{justifyContent: "flex-end", paddingRight: "0.5rem"}}>
      <OutlinedInput 
        id="search"
        inputProps={{
          style: {
            padding: "0.5rem",
            width: "8rem"
          }
        }}
        sx={{
          margin: "0.5rem",
        }}
        placeholder={props.placeholder}
        type="text"
        value={searchValue}
        endAdornment= {
          <InputAdornment position="end">
            <IconButton 
              className="classic-button"
              onClick={handleSearch}
              edge="end"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </div>
  )
}