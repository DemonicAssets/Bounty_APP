// HSC login accounts. Add role: "admin" to any account that should be allowed
// to open the HSC Case Terminal. Normal accounts can view bounty records but
// cannot access the administrative case terminal.
// IMPORTANT: This is still a static front-end login gate. For a public production
// website, use server/database authentication so credentials and roles are enforced
// on the server instead of being stored in browser files.
window.HSC_AUTH = {
  users: [
    { username: "officer", password: "officer", displayName: "HSC OFFICER", role: "officer" },
    { username: "admin", password: "admin", displayName: "HSC ADMIN", role: "admin" }
  ]
};
