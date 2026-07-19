import { useState } from 'react'

const validators = {
  required(value) {
    if (!value.trim()) return 'This field is required'
    return ''
  },
  name(value) {
    if (!value.trim()) return 'Name is required'
    if (value.trim().length < 2) return 'Name must be at least 2 characters'
    return ''
  },
  email(value) {
    if (!value.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address'
    return ''
  },
  password(value) {
    if (!value) return 'Password is required'
    if (value.length < 6) return 'Password must be at least 6 characters'
    if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return 'Password must include letters and numbers'
    return ''
  },
  phone(value) {
    if (!value.trim()) return 'Phone number is required'
    if (value.replace(/\D/g, '').length < 10) return 'Enter a valid phone number'
    return ''
  },
  firstName(value) {
    return validators.required(value)
  },
  streetAddress(value) {
    return validators.required(value)
  },
  city(value) {
    return validators.required(value)
  },
}

export function useForm({ initialValues, fields, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (nextValues = values) => {
    const nextErrors = {}
    fields.forEach((field) => {
      const error = validators[field]?.(nextValues[field] || '')
      if (error) nextErrors[field] = error
    })
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    if (submitted) validate(nextValues)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    if (!validate()) return
    try {
      await onSubmit(values)
    } catch {
      // Auth/API errors are exposed by the caller hook, such as useAuth.error.
    }
  }

  return { values, errors, submitted, handleChange, handleSubmit, validate }
}
