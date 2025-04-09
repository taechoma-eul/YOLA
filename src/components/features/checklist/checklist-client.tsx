'use client';

type ChecklistClientProps = {
  uniqueTypes: string[];
};

/** ChecklistClient:
 *  동적으로 체크리스트 목록을 렌더링하는 컴포넌트
 *  @param {ChecklistClientProps} props - unique한 `type` 값을 담고 있는 `uniqueTypes` 배열 (supabase/mission_list/type의 unique value)
 *  @returns {JSX.Element} 체크리스트 목록을 반환
 */
export default function ChecklistClient({ uniqueTypes }: ChecklistClientProps) {
  return (
    <section>
      {uniqueTypes.map((type) => (
        /** 카드 컴포넌트 위치 */
        <div key={type}>{type}</div>
      ))}
    </section>
  );
}
