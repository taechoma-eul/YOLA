'use client';

/** MissionList:
 *  체크리스트의 단계별 미션 정보를 제공하는 상세 페이지
 * @param {{ mission: string }} props - 표시할 미션의 식별자를 포함한 속성 객체
 * @returns {JSX.Element} - queryString에 따른 미션 정보를 표시
 */
const MissionList = ({ mission }: { mission: string }) => {
  return <div>mission-list: {mission}</div>;
};

export default MissionList;
