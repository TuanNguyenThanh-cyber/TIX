export function formatMoneyVND(value) {
  return value.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}
