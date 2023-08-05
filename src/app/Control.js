"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// 버튼 부분을 컴포넌트화하여, 이 부분에만 client component 지정을 해 화면에 따라 버튼이 달라지도록 해줌
export function Control() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {id ? (
        <>
          <li>
            <Link href={`/update/${id}`}>Update</Link>
          </li>
          <li>
            <input
              type="button"
              value="delete"
              onClick={async () => {
                const res = await fetch(
                  process.env.NEXT_PUBLIC_API_URL + `topics/${id}`,
                  {
                    method: "DELETE",
                  }
                );
                await res.json();
                router.push("/");
                router.refresh();
              }}
            />
          </li>
        </>
      ) : null}
    </ul>
  );
}
