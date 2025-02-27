import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import {userService} from "../../../service/userService.ts";


export function Component() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await userService.getUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">컴포넌트 기반 접근 방식 (React Router 7)</h1>
      <div className="flex gap-4">
        <div className="w-1/3">
          <h2 className="text-xl mb-2">사용자 목록</h2>

          {loading ? (
            <div className="p-4 text-center">로딩 중...</div>
          ) : error ? (
            <div className="p-4 text-red-500">에러: {error}</div>
          ) : (
            <ul className="space-y-2">
              {users.map(user => (
                <li key={user.id} className="p-2 bg-gray-100 rounded">
                  <Link
                    to={`/component-based/users/${user.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {user.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <Link
            to="/data-api"
            className="mt-8 inline-block p-2 bg-purple-500 text-white rounded"
          >
            Data API 방식으로 전환
          </Link>
        </div>
        <div className="w-2/3 p-4 border rounded bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
}