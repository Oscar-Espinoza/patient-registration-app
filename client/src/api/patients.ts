import { API_URL } from "../constants"
import { Patient } from "../types"

export const getPatients = async () => {
  try {
    const res = await fetch(`${API_URL}/patients`)
    const data = await res.json()
    return data as Patient[]
  } catch (error) {
    console.log(error)
  }
}