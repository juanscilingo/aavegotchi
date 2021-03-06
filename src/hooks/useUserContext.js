import { UserContext } from "context/user"
import { useContext } from "react"

const useUserContext = () => useContext(UserContext);

export default useUserContext;