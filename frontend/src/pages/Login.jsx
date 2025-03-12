import { useAuthStore } from "../store/useAuthStore"

const login = () => {

 const {authUser} = useAuthStore();

  return (
    <div>login</div>
  )
}

export default login