import Link from "next/link";
import { Button } from "ui";
import clsx from "clsx";
// import { getAssetsByGroup } from "../../api/assets";

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <>
      {" "}
      <span
        className={`absolute mix-blend-normal will-change-[filter] rounded-[100%] ${
          small ? "blur-[32px]" : "blur-[75px]"
        } ${conic ? "bg-glow-conic" : ""} ${className}`}
      />
    </>
  );
}

const url =
  "https://mainnet.helius-rpc.com/?api-key=7577dff3-a00f-4d74-a7d2-83661e19fe7c";

export const getAssetsByGroup = async ({ page, limit }) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "my-id",
      method: "getAssetsByGroup",
      params: {
        groupKey: "collection",
        groupValue: "J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w",
        page: page,
        limit: limit,
      },
    }),
  });
  const { result } = await response.json();
  return result;
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<any> {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;

  console.log(searchParams);
  const response = await getAssetsByGroup({ page, limit });
  console.log("RESPONSEE", response);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex space-x-6">
        <Button>
          <Link
            href={{
              pathname: "/",
              query: {
                page: page > 1 ? page - 1 : 1,
              },
            }}
            className={clsx(page <= 1 && "pointer-events-none opacity-50")}
          >
            Previous
          </Link>
        </Button>
        <Button>
          <Link
            href={{
              pathname: "/",
              query: {
                page: page + 1,
              },
            }}
            className={clsx(
              response.items.length < 10 && "pointer-events-none opacity-50"
            )}
          >
            Next
          </Link>
        </Button>
      </div>
      <div className="relative  place-items-center ">
        {response.items.map((item: any) => (
          <>
            <div>{item.id}</div>
            <br />
          </>
        ))}
      </div>
    </main>
  );
}
