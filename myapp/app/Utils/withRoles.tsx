import { getAuthSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

export async function withRoles(Component: any, requiredPermissions: string) {
  return async function WithRolesWrapper(props: any) {
    const session = await getAuthSession();
    const user = session?.user;
    const router = useRouter()
    const hasPermission = requiredPermissions === user?.role;
    if (hasPermission) {
      return <Component {...props} />
    } else {
      router.replace('/')
      return null
    }
  }
}