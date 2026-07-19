import { useState } from 'react'

export default function Toggle({ initial = false, render }) {
  const [on, setOn] = useState(initial)
  const toggle = () => setOn((current) => !current)
  return render(on, toggle)
}
