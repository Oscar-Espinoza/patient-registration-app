import { APP_URL } from "../constants"
import { Patient } from "../types"

export const getPatients = async () => {
  try {
    const res = await fetch(`${APP_URL}/api/patients`)
    const data = await res.json()
    return data as Patient[]
  } catch (error) {
    console.log(error)
  }
}