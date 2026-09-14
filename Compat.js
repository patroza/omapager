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
// Replacement bars give widgets no service; read this plugin's own bar entry.
// Unparseable text returns null so a half-written config is never applied.
function entrySettings(text, id) {
  var config
  try { config = JSON.parse(String(text || "")) } catch (e) { return null }
  var layout = config && config.bar && config.bar.layout || {}
  var sections = ["left", "center", "right"]
  for (var s = 0; s < sections.length; s++) {
    var entries = Array.isArray(layout[sections[s]]) ? layout[sections[s]] : []
    for (var i = 0; i < entries.length; i++) if (entries[i] && entries[i].id === id) return entries[i]
  }
  return {}
}
function duration(urgency, requested) {
  var minimum = urgency === 2 ? 15000 : urgency === 0 ? 5000 : 8000
  return Math.min(30000, Math.max(minimum, Number(requested) || 0))
}
