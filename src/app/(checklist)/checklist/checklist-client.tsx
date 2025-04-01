'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import MissionList from './mission-list';

type ChecklistClientProps = {
  uniqueTypes: string[];
};

/** ChecklistClient:
 *  쿼리 스트링을 감지하여 동적으로 미션 리스트 페이지를 렌더링하는 컴포넌트
 *  @param {ChecklistClientProps} props - unique `type` 값을 담고 있는 `uniqueTypes` 배열
 *  @returns {JSX.Element} `mission` 쿼리 스트링이 존재하면 `MissionList` 컴포넌트를 반환
 *                          없으면 기본 체크리스트 페이지 내용을 반환
 */
export default function ChecklistClient({ uniqueTypes }: ChecklistClientProps) {
  const searchParams = useSearchParams();
  const mission = searchParams.get('mission');
  const router = useRouter();

  if (mission) {
    if (!uniqueTypes.includes(mission)) {
      router.push('/404'); // 유효하지 않은 체크리스트 접근 시 404 redirect
      return;
    }
    return <MissionList mission={mission} />;
  }

  return (
    <section>
      {uniqueTypes.map((type) => (
        <div key={type}>{type}</div>
      ))}
    </section>
  );
}
