import client from "./client";
import follow from "./follow";

/*
 * return Promise of schema for cakes
 * */
export default function cakeSchema() {
  const host = process.env.NEXT_PUBLIC_METADATA_SERVER;
  const root = process.env.NEXT_PUBLIC_METADATA_ROOT;

  return follow(client, host + root, ["profile"]).then((response) => {
    return client({
      method: "GET",
      path: response.entity._links.cakes.href,
      headers: { Accept: "application/schema+json" },
    }).then((schema) => {
      return schema.entity;
    });
  });
}
