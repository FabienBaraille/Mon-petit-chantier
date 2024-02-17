import { Skeleton } from "@mui/material"

type LoadingSkeletonAdminProps = {
  count: number
}

export const LoadingSkeletonAdmin = (props: LoadingSkeletonAdminProps) => {
  const skeleton = [];
  for (let index = 0; index < props.count; index++) {
    skeleton.push(<Skeleton variant="rectangular" width="100%" height={50} />)
  }
  <Skeleton variant="rectangular" width="100%" height={50} />

  return (
    <>
      {skeleton}
    </>
  )
}