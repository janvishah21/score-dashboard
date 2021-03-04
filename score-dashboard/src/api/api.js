import { BASE_URL } from '../env';

// get all scores
export const fetchScores = async () => {
  const res = await fetch(`${BASE_URL}/api/scores/`)
  const data = await res.json()

  return data
}

// get score
export const fetchScore = async (roll_no) => {
  const res = await fetch(`${BASE_URL}/api/scores/${roll_no}`)
  const data = await res.json()

  return data
}

// add score
export const addScore = async (score) => {
  const res = await fetch(`${BASE_URL}/api/scores/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(score),
  });

  const data = await res.json()

  return data
}

// edit score
export const editScore = async (score) => {
  const res = await fetch(`${BASE_URL}/api/scores/${score.roll_no}/`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(score),
  });

  const data = await res.json()

  return data
}

// delete score
export const deleteScore = async (roll_no) => {
  const res = await fetch(`${BASE_URL}/api/scores/${roll_no}/`, {
      method: 'DELETE'
  })

  const data = await res

  return data
}