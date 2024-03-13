"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export type SearchBarProps = {
  placeholder: string,
  default: string | null
};

export const SearchBar = (props: SearchBarProps) => {

  const router = useRouter();
  const baseUrl = usePathname();

  const [searchValue, setSearchValue] = useState<string>(props.default ?? '');

  const changeParams = (search: string) => {
    setTimeout(() => {
      const searchParams = new URLSearchParams();
      searchParams.set('search', search);
      const url = `${baseUrl}?${searchParams.toString()}`;
      router.push(url);
    }, 500)
  }

  const debounce = (func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    }
  }

  const handleSearch = useCallback(debounce((inputVal: string) => changeParams(inputVal), 500), []);

  const handleClean = () => {
    setSearchValue("");
    router.push(`${baseUrl}`);
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
            {!searchValue ?
              // <IconButton 
              //   className="classic-button"
              //   onClick={handleSearch}
              //   edge="end"
              // >
                <SearchIcon />
              // </IconButton>
              :
              <IconButton 
                className="classic-button"
                onClick={handleClean}
                edge="end"
              >
                <CloseIcon />
              </IconButton>
            }
          </InputAdornment>
        }
        onChange={(event) => {
          setSearchValue(event.target.value);
          handleSearch(event.target.value);
        }}
      />
    </div>
  )
}