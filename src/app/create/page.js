"use client";
// 사용자의 입출력이 발생하는 경우 client component로 사용해주는 것이 좋다.

// 13버전부터, next/navigation에서 useRouter 가져옴
import { useRouter } from "next/navigation";
// 서버 실행
//npx json-server --port 9999 --watch db.jso
export default function Create() {
  // client component에서만 사용 가능
  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "topics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        });
        const topic = resp.json();
        router.push(`/read/${topic.id}`);
        router.refresh();
      }}
    >
      <h2>Create</h2>
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
