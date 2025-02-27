import { useLoaderData, Form, useNavigation, useActionData } from "react-router-dom";
import {userService} from "../../../service/userService.ts";


export async function loader({ params }) {
  const user = await userService.getUser(params.userId);
  return JSON.stringify({ user });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  // 사용자 ID 추가
  updates.id = Number(params.userId);

  // API 호출 (실제로는 업데이트 호출이겠지만 여기서는 단순화)
  const result = await userService.createUser(updates);

  return JSON.stringify({ success: true, user: result });
}

export function Component() {
  const { user } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const isSuccess = actionData?.success;

  return (
    <div>
      <h2 className="text-xl mb-4">{user.name}의 정보</h2>

      <Form method="post" className="space-y-4">
        <div>
          <label className="block mb-1">이름</label>
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">이메일</label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {isSubmitting ? "저장 중..." : "저장"}
        </button>

        {isSuccess && (
          <div className="p-2 bg-green-100 text-green-800 rounded">
            정보가 성공적으로 저장되었습니다!
          </div>
        )}
      </Form>
    </div>
  );
}