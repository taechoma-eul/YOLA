'use client';

import { useSearchParams } from 'next/navigation';
import MissionList from './mission-list';

/** ChecklistClient:
 *  쿼리 스트링을 감지하여 동적으로 미션 리스트 페이지를 렌더링하는 컴포넌트
 *  @returns {JSX.Element} `mission` 쿼리 스트링이 존재하면 `MissionList` 컴포넌트를 반환
 *                          없으면 기본 체크리스트 페이지 내용을 반환
 */
export default function ChecklistClient() {
  const searchParams = useSearchParams();
  const mission = searchParams.get('mission');

  if (mission) {
    return <MissionList mission={mission} />;
  }

  return <p>체크리스트 메인 페이지 내용</p>;
}
