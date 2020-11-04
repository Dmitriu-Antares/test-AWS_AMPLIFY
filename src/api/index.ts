import api from './interceptor'
// example of using get
//export const getSmth = () => api.get('smth')
export const signUpUser = (email, pass, role) => api.post('/api/register', ({email, pass, role}))
export const logInUser = (email, pass) => api.post('/api/login', ({email, pass}))
export const setOnboarding = onboarding => api.post('/api/onboarding-set', ({onboarding}))
export const getProfile = () => api.get('/api/get-profile')

export const protectedBackTest = () => api.get('/api/protected')