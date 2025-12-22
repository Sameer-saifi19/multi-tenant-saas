import CreateGymForm from "@/components/forms/create-workspace";
import { checkSession } from "../actions/user";

export default async function Page() {

  const session = await checkSession()
  
  return <CreateGymForm />;
}
