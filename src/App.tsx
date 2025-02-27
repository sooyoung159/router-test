import { useState } from 'react';
import { DataApiApp } from './approaches/data-api';
import { ComponentBasedApp } from './approaches/component-based';

function App() {
  const [approach, setApproach] = useState('data-api');

  // 실제로는 한 번에 하나의 접근 방식만 렌더링하지만
  // 여기서는 테스트를 위해 전환 버튼을 제공
  return (
    <div>
      <div className="p-4 bg-gray-100 mb-4">
        <h1 className="text-2xl font-bold mb-2">React Router 7 테스트</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setApproach('data-api')}
            className={`px-4 py-2 rounded ${
              approach === 'data-api'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            Data API 방식
          </button>
          <button
            onClick={() => setApproach('component-based')}
            className={`px-4 py-2 rounded ${
              approach === 'component-based'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            컴포넌트 기반 방식
          </button>
        </div>
      </div>

      {approach === 'data-api' ? <DataApiApp /> : <ComponentBasedApp />}
    </div>
  );
}

export default App;
