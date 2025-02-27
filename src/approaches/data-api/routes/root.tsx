import { Outlet, Link, useLoaderData } from "react-router-dom";
import {userService} from "../../../service/userService.ts";


export async function loader() {
  try {
    const users = await userService.getUsers();
    return JSON.stringify({ users }); // 객체 형태로 반환하는지 확인
  } catch (error) {
    console.error("Error loading users:", error);
    return JSON.stringify({ users: [] }); // 에러 발생 시 빈 배열 반환
  }
}

export function Component() {
  const { users } = useLoaderData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data API 접근 방식 (React Router 7)</h1>
      <div className="flex gap-4">
        <div className="w-1/3">
          <h2 className="text-xl mb-2">사용자 목록</h2>
          <ul className="space-y-2">
            {users?.map(user => (
              <li key={user.id} className="p-2 bg-gray-100 rounded">
                <Link
                  to={`/data-api/users/${user.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {user.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/component-based"
            className="mt-8 inline-block p-2 bg-purple-500 text-white rounded"
          >
            컴포넌트 기반 방식으로 전환
          </Link>
        </div>
        <div className="w-2/3 p-4 border rounded bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
}