import CreateGymForm from "@/components/forms/create-workspace";
import { checkSession } from "../actions/user";

export default async function Page() {

  const session = await checkSession()
  if(!session) return {
    status: 403, message: "Unauthorized"
  }
  
  return <CreateGymForm />;
}
