export const login = data => {
  return this.$http({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
