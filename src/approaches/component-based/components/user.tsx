import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {userService} from "../../../service/userService.ts";


export function Component() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await userService.getUser(userId);
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email
        });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setSuccess(false);

      // 사용자 ID 추가
      const updatedUser = {
        ...formData,
        id: Number(userId)
      };

      // API 호출
      await userService.createUser(updatedUser);

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">에러: {error}</div>;
  if (!user) return null;

  return (
    <div>
      <h2 className="text-xl mb-4">{user.name}의 정보</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {submitting ? "저장 중..." : "저장"}
        </button>

        {success && (
          <div className="p-2 bg-green-100 text-green-800 rounded">
            정보가 성공적으로 저장되었습니다!
          </div>
        )}
      </form>
    </div>
  );
}