export function logoutAdmin(req, res) {
  res.clearCookie("adminAccessCookie", { path: "/", secure: true, sameSite: "Strict" });
  res.clearCookie("adminRefreshCookie", { path: "/", secure: true, sameSite: "Strict" });
  res.status(200).send("Logged out successfully");
}

export function logoutEmployee(req, res) {
  res.clearCookie("employeeAccessCookie", { path: "/", secure: true, sameSite: "Strict" });
  res.clearCookie("employeeRefreshCookie", { path: "/", secure: true, sameSite: "Strict" });
  res.status(200).send("Logged out successfully");
}
