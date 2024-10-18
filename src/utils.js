
export function formatContactsList(contactsList) {
  return contactsList
    .map(
      ({ id, firstName, lastName, isFavorite, mobilePhone }) =>
        `#${id} (${isFavorite ? "*" : "-"}) ${firstName} ${lastName} (${
          mobilePhone || "None"
        })`
    )
    .join("\n");
}
