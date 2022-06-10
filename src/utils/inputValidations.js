export const isValidEmail = (email) => {
  const [user, domain] = email.split('@')

  if (user && domain) {
    const [org, comp] = domain.split('.')
    
    return org && comp
            
  }

  return false
}

export const isValidPassword = (password) => {
  return password.length >= 6
}