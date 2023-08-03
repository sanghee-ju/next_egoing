// csr로 사용할 경우 아래 코드 최상단에 작성
// "use client";
// import { useEffect, useState } from "react";
import "./globals.css";
import Link from "next/link";

// 아래 코드는 서버에서만 동작
export const metadata = {
  title: "Web Tutorials",
  description: "Generated by jshe1207",
};

export default async function RootLayout({ children }) {
  /* 아래 코드는 클라이언트 컴포넌트에서만 사용 가능! */
  // 서버 컴포넌트를 이용하기 위해 async-await 사용
  // 글 목록 저장
  // const [topics, setTopics] = useState([]);
  // 서버에서 data 불러오기
  // useEffect(() => {
  // useState는 csr에서만 사용하기 때문에 아래 코드 오류 발생
  //   fetch("http://localhost:9999/topics")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setTopics(result);
  //     });
  // }, []);
  // 위 fetch 동기적으로 변환 -> 글 목록 동적으로 생성
  const resp = await fetch("http://localhost:9999/topics");
  const topics = await resp.json();
  return (
    <html>
      <body>
        <h1>
          <Link href="/">WEB</Link>
        </h1>
        <ol>
          {topics.map((topic) => {
            return (
              <li key={topic.id}>
                <Link href={`/read/${topic.id}`}>{topic.title}</Link>
              </li>
            );
          })}
        </ol>
        {children}
        <ul>
          <li>
            <Link href="/create">Create</Link>
          </li>
          <li>
            <Link href="/update/1">Update</Link>
          </li>
          <li>
            <input type="button" value="delete" />
          </li>
        </ul>
      </body>
    </html>
  );
}
