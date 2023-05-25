import client from "./client";
import follow from "./follow";
import { Cake } from "../types";

/*
 * return Promise of schema for cakes
 * */
export default function updateCake(newCake: Cake) {
  const host = process.env.NEXT_PUBLIC_METADATA_SERVER;
  const root = process.env.NEXT_PUBLIC_METADATA_ROOT;

  console.log("newCake: ", newCake);

  return follow(client, host + root, ["cakes"]).then((response) => {
    let href = response.entity._links.self.href;
    return client({
      method: "POST",
      path: href,
      entity: newCake,
      headers: { "Content-Type": "application/json" },
    });
  });
}
