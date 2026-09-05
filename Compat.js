.pragma library
// Preserve the desktop's notification policy and argv-only click contract.
function argv(value) {
  var a
  try { a = JSON.parse(String(value || "")) } catch (e) { return null }
  if (!Array.isArray(a) || !a.length) return null
  for (var i = 0; i < a.length; i++) if (typeof a[i] !== "string") return null
  return a[0] && a[0].charAt(0) !== "-" ? a : null
}
function bypass(n) {
  return n.appName === "omarchy-action" || (n.appName === "notify-send" && n.urgency === 2)
}
function duration(urgency, requested) {
  var minimum = urgency === 2 ? 15000 : urgency === 0 ? 5000 : 8000
  return Math.min(30000, Math.max(minimum, Number(requested) || 0))
}
