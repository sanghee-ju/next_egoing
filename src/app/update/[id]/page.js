"use client";
// 사용자의 입출력이 발생하는 경우 client component로 사용해주는 것이 좋다.

// 13버전부터, next/navigation에서 useRouter 가져옴
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// 서버 실행
//npx json-server --port 9999 --watch db.jso
export default function Update(props) {
  // client component에서만 사용 가능
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const id = props.params.id;
  async function refresh() {
    const resp = await fetch(`http://localhost:9999/topics/${id}`);
    const topic = await resp.json();
    setTitle(topic.title);
    setBody(topic.body);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const resp = await fetch(
          process.env.NEXT_PUBLIC_API_URL + `topics/${id}`,
          {
            // 수정 시, PATCH 메소드 사용
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, body }),
          }
        );
        const topic = await resp.json();
        router.push(`/read/${topic.id}`);
        router.refresh();
      }}
    >
      <h2>Update</h2>
      <p>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="title"
        />
      </p>
      <p>
        <textarea
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="body"
        ></textarea>
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
